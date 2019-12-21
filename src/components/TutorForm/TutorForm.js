import React, { PureComponent } from 'react';
import { Layout, Row, Input, Select, Col, message } from 'antd';
import { connect } from 'react-redux';
import _ from 'lodash';
import CardInfo from '../CardInfo/CardInfo';
import './TutorForm.css';
import {
  getTutorsNoCondition,
  getTagsList,
  getSpecializationsList
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
class TutorForm extends PureComponent {
  componentDidMount() {
    const { fetchSpecializations, fetchTags, fetchTutor } = this.props;
    fetchSpecializations({ message });
    fetchTags({ message });
    fetchTutor({ message });
  }

  render() {
    const { isRequest, tutors, tags, specializations } = this.props;
    let dataTutor = tutors;
    if (isRequest) {
      dataTutor = Array.from(Array(8), () => sample);
    }
    return (
      <Layout className="tutorFormLayout">
        <Row gutter={[16, 16]} style={{ margin: '10px 0' }}>
          <Col span={1}>
            <strong>Filters: </strong>
          </Col>
          <Col span={4}>
            <Input placeholder="Type location" style={{ width: '100%' }} />
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
            >
              <Option value="50">Lower than 50</Option>
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
            >
              {specializations.map(specialization => (
                <Option value={specialization.name} key={_.uniqueId('option_')}>
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
            >
              {tags.map(tag => (
                <Option value={tag.name} key={_.uniqueId('option_')}>
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
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    isRequest: state.tutor.isRequest,
    tutors: state.tutor.tutors,
    tags: state.tutor.tags,
    specializations: state.tutor.specializations
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchTutor: item => {
      dispatch(getTutorsNoCondition(item));
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
