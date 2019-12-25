import React, { Component } from 'react';
import {
  Layout,
  Row,
  Input,
  Select,
  Col,
  message,
  Pagination,
  Drawer,
  Button,
  Form
} from 'antd';
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
      page: 1,
      paymentsort: 'paymenPerHour',
      successsort: '-successRate',
      averagesort: '-averageRating'
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

  handleChangePaymentSort = paymentsort => {
    this.setState({ paymentsort }, () => this.findTutorConditional());
  };

  handleChangeSuccessSort = successsort => {
    this.setState({ successsort }, () => this.findTutorConditional());
  };

  handleChangeAverageSort = averagesort => {
    this.setState({ averagesort }, () => this.findTutorConditional());
  };

  findTutorConditional = () => {
    const { fetchTutorCondition } = this.props;
    const {
      address,
      paymentPerHour,
      specialization,
      tag,
      paymentsort,
      successsort,
      averagesort,
      page
    } = this.state;
    fetchTutorCondition({
      address,
      paymentPerHour,
      specialization,
      tag,
      page,
      sort: `${paymentsort},${successsort},${averagesort}`,
      message
    });
  };

  render() {
    const { page, visible } = this.state;
    const {
      isRequest,
      tutors,
      tags,
      specializations,
      count,
      token
    } = this.props;
    let dataTutor = tutors;
    if (isRequest) {
      dataTutor = Array.from(Array(8), () => sample);
    }
    for (let i = 0; i < dataTutor.length; i += 1) {
      dataTutor[i].selfIntro = Parser(`${dataTutor[i].selfIntro}`);
    }

    return (
      <Layout className="tutorFormLayout">
        <Drawer
          title="Filter Option"
          placement="right"
          closable={false}
          onClose={() => this.setState({ visible: false })}
          visible={visible}
        >
          <Row gutter={[16, 16]} style={{ margin: '10px 0' }}>
            <Col span={24}>
              <strong>Filters: </strong>
            </Col>
            <Col span={24}>
              <Input
                placeholder="Type location"
                style={{ width: '100%' }}
                onChange={e => this.handleAddressChange(e.target.value)}
              />
            </Col>
            <Col span={24}>
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
            <Col span={24}>
              <Select
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
                  <Option
                    value={specialization._id}
                    key={_.uniqueId('option_')}
                  >
                    {specialization.name}
                  </Option>
                ))}
              </Select>
            </Col>
            <Col span={24}>
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
            <Col span={24}>
              <strong>Sort: </strong>
            </Col>
            <Col span={24}>
              <Form.Item label="Payment per hours">
                <Select
                  style={{ width: '100%' }}
                  placeholder="Select sort by"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                  onChange={val => this.handleChangePaymentSort(val)}
                >
                  <Option value="paymentPerHour" key={_.uniqueId('option_')}>
                    Ascending
                  </Option>
                  <Option value="-paymentPerHour" key={_.uniqueId('option_')}>
                    Descending
                  </Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Success Rate">
                <Select
                  style={{ width: '100%' }}
                  placeholder="Select sort by"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                  onChange={val => this.handleChangeSuccessSort(val)}
                >
                  <Option value="successRate" key={_.uniqueId('option_')}>
                    Ascending
                  </Option>
                  <Option value="-successRate" key={_.uniqueId('option_')}>
                    Descending
                  </Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Average Rating">
                <Select
                  style={{ width: '100%' }}
                  placeholder="Select sort by"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                  onChange={val => this.handleChangeAverageSort(val)}
                >
                  <Option value="averageRating" key={_.uniqueId('option_')}>
                    Ascending
                  </Option>
                  <Option value="-averageRating" key={_.uniqueId('option_')}>
                    Descending
                  </Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Drawer>
        <Button
          type="primary"
          style={{ margin: 15 }}
          onClick={() => this.setState({ visible: true })}
        >
          Filter
        </Button>
        {/* {_.chunk(dataTutor, 4).map(chunk => (
          <Row gutter={[16, 16]} key={_.uniqueId('row_')}>
            {chunk.map(data => (
              <Col key={_.uniqueId('col_')} span={6}>
                <CardInfo data={data} loading={isRequest} />
              </Col>
            ))}
          </Row>
        ))} */}
        <Row gutter={[16, 16]} key={_.uniqueId('row_')}>
          {dataTutor.map(data => (
            <Col key={_.uniqueId('col_')} span={6}>
              <CardInfo data={data} loading={isRequest} token={token} />
            </Col>
          ))}
        </Row>
        <Pagination
          defaultCurrent={1}
          current={page}
          total={count}
          pageSize={8}
          style={{ float: 'right', margin: '10px 20px' }}
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
    count: state.tutor.pagination.count,
    token: state.user.token
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
