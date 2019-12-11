import React, { Component } from 'react';
import { Layout, Carousel, Row, Select, Col, Input } from 'antd';
import _ from 'lodash';
import './Home.css';
import CardInfo from '../../components/CardInfo/CardInfo';

const { Content } = Layout;
const { Option } = Select;
const image1 = require('../../assets/images/image1.jpg');
const image2 = require('../../assets/images/image2.jpg');
const image3 = require('../../assets/images/image3.jpg');
const image4 = require('../../assets/images/image4.jpg');

const sampleData = [
  {
    idUser: 0,
    Name: 'Tientd',
    Email: 'tdtien.it@gmail.com',
    Avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    PaymentPerHour: 15,
    SuccessRating: 100,
    Specialization: 'Backend Software Engineer',
    SelfIntroduction: 'Hello everybody, Im very happy to meet all of you',
    Tags: [
      'WordPress',
      'HTML5',
      'Web Design',
      'Graphic Design',
      'CSS3',
      'Mobile UI Design'
    ]
  },
  {
    idUser: 1,
    Name: 'Tientd',
    Email: 'tdtien.it@gmail.com',
    Avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    PaymentPerHour: 15,
    SuccessRating: 100,
    Specialization: 'Backend Software Engineer',
    SelfIntroduction: 'Hello everybody, Im very happy to meet all of you',
    Tags: [
      'WordPress',
      'HTML5',
      'Web Design',
      'Graphic Design',
      'CSS3',
      'Mobile UI Design'
    ]
  },
  {
    idUser: 2,
    Name: 'Tientd',
    Email: 'tdtien.it@gmail.com',
    Avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    PaymentPerHour: 15,
    SuccessRating: 100,
    Specialization: 'Backend Software Engineer',
    SelfIntroduction: 'Hello everybody, Im very happy to meet all of you',
    Tags: [
      'WordPress',
      'HTML5',
      'Web Design',
      'Graphic Design',
      'CSS3',
      'Mobile UI Design'
    ]
  },
  {
    idUser: 3,
    Name: 'Tientd',
    Email: 'tdtien.it@gmail.com',
    Avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    PaymentPerHour: 15,
    SuccessRating: 100,
    Specialization: 'Backend Software Engineer',
    SelfIntroduction: 'Hello everybody, Im very happy to meet all of you',
    Tags: [
      'WordPress',
      'HTML5',
      'Web Design',
      'Graphic Design',
      'CSS3',
      'Mobile UI Design'
    ]
  },
  {
    idUser: 4,
    Name: 'Tientd',
    Email: 'tdtien.it@gmail.com',
    Avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    PaymentPerHour: 15,
    SuccessRating: 100,
    Specialization: 'Backend Software Engineer',
    SelfIntroduction: 'Hello everybody, Im very happy to meet all of you',
    Tags: [
      'WordPress',
      'HTML5',
      'Web Design',
      'Graphic Design',
      'CSS3',
      'Mobile UI Design'
    ]
  },
  {
    idUser: 5,
    Name: 'Tientd',
    Email: 'tdtien.it@gmail.com',
    Avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    PaymentPerHour: 15,
    SuccessRating: 100,
    Specialization: 'Backend Software Engineer',
    SelfIntroduction: 'Hello everybody, Im very happy to meet all of you',
    Tags: [
      'WordPress',
      'HTML5',
      'Web Design',
      'Graphic Design',
      'CSS3',
      'Mobile UI Design'
    ]
  },
  {
    idUser: 6,
    Name: 'Tientd',
    Email: 'tdtien.it@gmail.com',
    Avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    PaymentPerHour: 15,
    SuccessRating: 100,
    Specialization: 'Backend Software Engineer',
    SelfIntroduction: 'Hello everybody, Im very happy to meet all of you',
    Tags: [
      'WordPress',
      'HTML5',
      'Web Design',
      'Graphic Design',
      'CSS3',
      'Mobile UI Design'
    ]
  },
  {
    idUser: 7,
    Name: 'Tientd',
    Email: 'tdtien.it@gmail.com',
    Avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    PaymentPerHour: 15,
    SuccessRating: 100,
    Specialization: 'Backend Software Engineer',
    SelfIntroduction: 'Hello everybody, Im very happy to meet all of you',
    Tags: [
      'WordPress',
      'HTML5',
      'Web Design',
      'Graphic Design',
      'CSS3',
      'Mobile UI Design'
    ]
  },
  {
    idUser: 8,
    Name: 'Tientd',
    Email: 'tdtien.it@gmail.com',
    Avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    PaymentPerHour: 15,
    SuccessRating: 100,
    Specialization: 'Backend Software Engineer',
    SelfIntroduction: 'Hello everybody, Im very happy to meet all of you',
    Tags: [
      'WordPress',
      'HTML5',
      'Web Design',
      'Graphic Design',
      'CSS3',
      'Mobile UI Design'
    ]
  },
  {
    idUser: 9,
    Name: 'Tientd',
    Email: 'tdtien.it@gmail.com',
    Avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    PaymentPerHour: 15,
    SuccessRating: 100,
    Specialization: 'Backend Software Engineer',
    SelfIntroduction: 'Hello everybody, Im very happy to meet all of you',
    Tags: [
      'WordPress',
      'HTML5',
      'Web Design',
      'Graphic Design',
      'CSS3',
      'Mobile UI Design'
    ]
  }
];
class Home extends Component {
  constructor(props) {
    super(props);
    this.findTutor = React.createRef();
  }

  gotoFindTutor = () => {
    document
      .getElementsByClassName('homeContent')[0]
      .scrollIntoView({ behavior: 'smooth' });
  };

  render() {
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
        <Content className="homeContent" ref={this.findTutor}>
          <Row gutter={16} style={{ marginTop: 10, marginBottom: 10 }}>
            <strong>Filters: </strong>
            &emsp;
            <Input placeholder="Type location" style={{ width: 200 }} />
            &emsp;
            <Select
              style={{ width: 200 }}
              placeholder="Select salary"
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
          </Row>
          {_.chunk(sampleData, 4).map(chunk => (
            <Row gutter={[16, 16]} key={_.uniqueId('row_')} type="flex">
              {chunk.map(data => (
                <Col key={_.uniqueId('col_')} span={6}>
                  <CardInfo data={data} />
                </Col>
              ))}
            </Row>
          ))}
        </Content>
      </Layout>
    );
  }
}

export default Home;
