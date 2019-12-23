import React, { PureComponent } from 'react';
import { Layout, Carousel } from 'antd';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './Home.css';
import TutorForm from '../../components/TutorForm/TutorForm';

const { Content } = Layout;
const image1 = require('../../assets/images/image1.jpg');
const image2 = require('../../assets/images/image2.jpg');
const image3 = require('../../assets/images/image3.jpg');
const image4 = require('../../assets/images/image4.jpg');

class Home extends PureComponent {
  render() {
    const { isLoggedIn } = this.props;
    if (isLoggedIn) {
      return <Redirect to="/dashboard" />;
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
          <TutorForm />
        </Content>
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.user.isLoggedIn
  };
};

export default connect(mapStateToProps)(Home);
