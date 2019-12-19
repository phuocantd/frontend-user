import React, { PureComponent } from 'react';
import { Layout, Button, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import '../Header.css';
import { logout } from '../../../actions/user';

const { Header } = Layout;
class PrivateHeader extends PureComponent {
  render() {
    const { avatar, name, logoutUser } = this.props;
    return (
      <Header className="mainHeader">
        <div className="leftHeader">
          <Link to="/" className="logo">
            Uber for Tutor
          </Link>
        </div>
        <div className="rightHeader">
          <Avatar src={avatar} />
          <Link to="/user" className="headerItem">
            <b>{name}</b>
          </Link>
          <Button type="primary" onClick={() => logoutUser()}>
            <b>Logout</b>
          </Button>
        </div>
      </Header>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logoutUser: () => {
      dispatch(logout());
    }
  };
};

export default connect(null, mapDispatchToProps)(PrivateHeader);
