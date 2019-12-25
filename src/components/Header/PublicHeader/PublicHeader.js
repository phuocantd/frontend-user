import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from 'antd';
import '../Header.css';

const { Header } = Layout;
export default class PublicHeader extends PureComponent {
  render() {
    return (
      <Header className="mainHeader">
        <div className="leftHeader">
          <Link to="/" className="logo">
            Uber for Tutor
          </Link>
        </div>
        <div className="rightHeader">
          <Link className="headerItem" to="/login">
            <b>LOGIN</b>
          </Link>
          <Link className="headerItem" to="/register">
            <b>SIGN UP</b>
          </Link>
        </div>
      </Header>
    );
  }
}
