import React, { PureComponent } from 'react';
import { Layout, Carousel, Row, Select, Col, Input, message } from 'antd';
import { connect } from 'react-redux';
import _ from 'lodash';
import './Home.css';
import CardInfo from '../../components/CardInfo/CardInfo';
import {
  getTutorsNoCondition,
  getTagsList,
  getSpecializationsList
} from '../../actions/tutor';

const { Content } = Layout;
const { Option } = Select;
const image1 = require('../../assets/images/image1.jpg');
const image2 = require('../../assets/images/image2.jpg');
const image3 = require('../../assets/images/image3.jpg');
const image4 = require('../../assets/images/image4.jpg');

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

class Home extends PureComponent {
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
      <Layout className="homeLayout">
        <Carousel autoplay draggable>
          <div className="carouselItem">
            <img src={image1} alt="studying" />
          </div>
          <div className="carouselItem">
            <img src={image2} alt="studying" />
          </div>
          <div className="carouselItem">
            <img src={image3} alt="studying" />
          </div>
          <div className="carouselItem">
            <img src={image4} alt="studying" />
          </div>
        </Carousel>
        <Content className="homeContent">
          <Row gutter={16} style={{ margin: '10px 0' }}>
            <strong>Filters: </strong>
            &emsp;
            <Input placeholder="Type location" style={{ width: 200 }} />
            &emsp;
            <Select
              style={{ width: 200 }}
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
            &emsp;
            <Select
              mode="multiple"
              style={{ width: 200 }}
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
            &emsp;
            <Select
              mode="multiple"
              style={{ width: 200 }}
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
          </Row>
          {_.chunk(dataTutor, 4).map(chunk => (
            <Row gutter={[16, 16]} key={_.uniqueId('row_')} type="flex">
              {chunk.map(data => (
                <Col key={_.uniqueId('col_')} span={6}>
                  <CardInfo data={data} loading={isRequest} />
                </Col>
              ))}
            </Row>
          ))}
        </Content>
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
