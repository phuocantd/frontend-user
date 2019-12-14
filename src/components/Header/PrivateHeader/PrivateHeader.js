import React, { PureComponent } from 'react';
import { Layout, Button, Typography, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import '../Header.css';

const { Header } = Layout;
const { Title } = Typography;
export default class PrivateHeader extends PureComponent {
  render() {
    const { avatar, name } = this.props;
    return (
      <Header className="mainHeader">
        <div className="leftHeader">
          <Link to="/">
            <Title level={2} className="logo">
              Uber for Tutor
            </Title>
          </Link>
        </div>
        <div className="rightHeader">
          <Avatar src={avatar} />
          <Link to="/user" className="headerItem">
            <b>{name}</b>
          </Link>
          <Button type="primary">
            <b>Logout</b>
          </Button>
        </div>
      </Header>
    );
  }
}
