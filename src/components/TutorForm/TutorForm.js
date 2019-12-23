import React, { Component } from 'react';
import { Layout, Row, Input, Select, Col, message, Pagination } from 'antd';
import { connect } from 'react-redux';
import Parser from 'html-react-parser';
import _ from 'lodash';
import CardInfo from '../CardInfo/CardInfo';
import './TutorForm.css';
import {
  getTutorsNoCondition,
  getTagsList,
  getSpecializationsList,
  getTutorsCondition
} from '../../actions/tutor';

const { Option } = Select;
const sample = {
  _id: 0,
  tags: [],
  userInfo: {
    _id: 0,
    avatar: '',
    isActive: true,
    email: '',
    name: 'Unknown',
    role: 'tutor',
    address: 'Unknown'
  },
  averageRating: 0,
  paymentPerHour: 0,
  selfIntro: '',
  specialization: {
    _id: 0,
    isActive: true,
    name: ''
  },
  successRate: 0
};
class TutorForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      paymentPerHour: {},
      specialization: '',
      tag: '',
      page: 1
    };
  }

  componentDidMount() {
    const { fetchSpecializations, fetchTags, fetchTutor } = this.props;
    fetchSpecializations({ message });
    fetchTags({ message });
    fetchTutor({ message });
  }

  handleAddressChange = val => {
    this.setState({ address: val, page: 1 }, () => this.findTutorConditional());
  };

  handleChangePaymentPerHour = val => {
    const { paymentPerHour } = this.state;
    const valArr = val.split('-');
    if (val === '50') {
      paymentPerHour.gte = 0;
      paymentPerHour.lte = 50;
    } else if (val === '5000') {
      paymentPerHour.gte = 5000;
      paymentPerHour.lte = 10000;
    } else {
      paymentPerHour.gte = parseInt(valArr[0], 10);
      paymentPerHour.lte = parseInt(valArr[1], 10);
    }
    this.setState({ paymentPerHour, page: 1 }, () =>
      this.findTutorConditional()
    );
  };

  handleChangeSpecialization = val => {
    this.setState({ specialization: val.toString(), page: 1 }, () =>
      this.findTutorConditional()
    );
  };

  handleChangeTag = val => {
    this.setState({ tag: val.toString(), page: 1 }, () =>
      this.findTutorConditional()
    );
  };

  handleChangePage = page => {
    this.setState({ page }, () => this.findTutorConditional());
  };

  findTutorConditional = () => {
    const { fetchTutorCondition } = this.props;
    const { address, paymentPerHour, specialization, tag, page } = this.state;
    fetchTutorCondition({
      address,
      paymentPerHour,
      specialization,
      tag,
      page,
      message
    });
  };

  render() {
    const { page } = this.state;
    const { isRequest, tutors, tags, specializations, count } = this.props;
    let dataTutor = tutors;
    if (isRequest) {
      dataTutor = Array.from(Array(8), () => sample);
    }
    for (let i = 0; i < dataTutor.length; i += 1) {
      dataTutor[i].selfIntro = Parser(`${dataTutor[i].selfIntro}`);
    }

    return (
      <Layout className="tutorFormLayout">
        <Row gutter={[16, 16]} style={{ margin: '10px 0' }}>
          <Col span={1}>
            <strong>Filters: </strong>
          </Col>
          <Col span={4}>
            <Input
              placeholder="Type location"
              style={{ width: '100%' }}
              onChange={e => this.handleAddressChange(e.target.value)}
            />
          </Col>
          <Col span={4}>
            <Select
              style={{ width: '100%' }}
              placeholder="Select salary per hour"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
              onChange={val => this.handleChangePaymentPerHour(val)}
            >
              <Option value="50">Lower than 50</Option>
              <Option value="50-100">From 50 to 100</Option>
              <Option value="100-500">From 100 to 500</Option>
              <Option value="500-1000">From 500 to 1000</Option>
              <Option value="1000-5000">From 1000 to 5000</Option>
              <Option value="5000">Above 5000</Option>
            </Select>
          </Col>
          <Col span={4}>
            <Select
              mode="multiple"
              style={{ width: '100%' }}
              placeholder="Select specializations"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
              onChange={val => this.handleChangeSpecialization(val)}
            >
              {specializations.map(specialization => (
                <Option value={specialization._id} key={_.uniqueId('option_')}>
                  {specialization.name}
                </Option>
              ))}
            </Select>
          </Col>
          <Col span={4}>
            <Select
              mode="multiple"
              style={{ width: '100%' }}
              placeholder="Select tags"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
              onChange={val => this.handleChangeTag(val)}
            >
              {tags.map(tag => (
                <Option value={tag._id} key={_.uniqueId('option_')}>
                  {tag.name}
                </Option>
              ))}
            </Select>
          </Col>
        </Row>
        {_.chunk(dataTutor, 4).map(chunk => (
          <Row gutter={[16, 16]} key={_.uniqueId('row_')}>
            {chunk.map(data => (
              <Col key={_.uniqueId('col_')} span={6}>
                <CardInfo data={data} loading={isRequest} />
              </Col>
            ))}
          </Row>
        ))}
        <Pagination
          defaultCurrent={1}
          current={page}
          total={count}
          pageSize={8}
          style={{ float: 'right' }}
          hideOnSinglePage
          onChange={nextpage => this.handleChangePage(nextpage)}
        />
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    isRequest: state.tutor.isRequest,
    tutors: state.tutor.tutors,
    tags: state.tutor.tags,
    specializations: state.tutor.specializations,
    count: state.tutor.pagination.count
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchTutor: item => {
      dispatch(getTutorsNoCondition(item));
    },
    fetchTutorCondition: item => {
      dispatch(getTutorsCondition(item));
    },
    fetchTags: item => {
      dispatch(getTagsList(item));
    },
    fetchSpecializations: item => {
      dispatch(getSpecializationsList(item));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TutorForm);
