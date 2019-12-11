import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Button, Typography } from 'antd';
import '../Header.css';

const { Header } = Layout;
const { Title } = Typography;
export default class PublicHeader extends PureComponent {
  render() {
    return (
      <Header className="mainHeader">
        <div className="leftHeader">
          <Title level={2} className="logo">
            Uber for Tutor
          </Title>
        </div>
        <div className="rightHeader">
          <Link className="headerItem" to="/login">
            <b>LOGIN</b>
          </Link>
          <Link className="headerItem" to="/register">
            <b>SIGN UP</b>
          </Link>
          <Button type="primary">
            <b>FIND TUTOR</b>
          </Button>
        </div>
      </Header>
    );
  }
}
