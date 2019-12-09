import React, { PureComponent } from 'react';
import { Layout, Button, Carousel, Row, Select, Col } from 'antd';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import './Home.css';
import CardInfo from '../../components/CardInfo/CardInfo';

const { Header, Content, Footer } = Layout;
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
  }
];
class Home extends PureComponent {
  render() {
    return (
      <Layout className="homeLayout">
        <Header className="homeHeader">
          <div className="rightHeader">
            <Link className="headerItem" to="/login">
              <b>LOGIN</b>
            </Link>
            <Link className="headerItem" to="/register">
              <b>SIGN UP</b>
            </Link>
            <Link className="headerItem" to="/register">
              <Button type="primary">
                <b>FIND TUTOR</b>
              </Button>
            </Link>
          </div>
        </Header>
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
          <Row gutter={16} style={{ marginTop: 10, marginBottom: 10 }}>
            <strong>Filters: </strong>
            &emsp;
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder="Select country"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              <Option value="jack">Viet Nam</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="tom">Tom</Option>
            </Select>
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
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="tom">Tom</Option>
            </Select>
          </Row>
          {_.chunk(sampleData, 4).map(chunk => (
            <Row gutter={[16, 16]}>
              {chunk.map(data => (
                <Col span={6}>
                  <CardInfo data={data} />
                </Col>
              ))}
            </Row>
          ))}
        </Content>
        <Footer className="homeFooter">
          Ant Design ©2019 Created by tdtien
        </Footer>
      </Layout>
    );
  }
}

export default Home;
