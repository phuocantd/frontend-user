import React, { PureComponent } from 'react';
import { Layout, Carousel } from 'antd';
import './Home.css';
import TutorForm from '../../components/TutorForm/TutorForm';

const { Content } = Layout;
const image1 = require('../../assets/images/image1.jpg');
const image2 = require('../../assets/images/image2.jpg');
const image3 = require('../../assets/images/image3.jpg');
const image4 = require('../../assets/images/image4.jpg');

class Home extends PureComponent {
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
        <Content className="homeContent">
          <TutorForm />
        </Content>
      </Layout>
    );
  }
}

export default Home;
