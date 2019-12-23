import React, { PureComponent } from 'react';
import { Layout, message } from 'antd';
import { connect } from 'react-redux';
import _ from 'lodash';
import './Main.css';
import PublicHeader from '../../components/Header/PublicHeader/PublicHeader';
import { handleGetUser } from '../../actions/user';
import PrivateHeader from '../../components/Header/PrivateHeader/PrivateHeader';

const { Content, Footer } = Layout;
class Main extends PureComponent {
  componentDidMount() {
    const { isLoggedIn, token, getUser } = this.props;
    if (isLoggedIn) {
      getUser({ token, message });
    }
  }

  render() {
    const { children, user } = this.props;
    let header = <PublicHeader />;
    if (!_.isEmpty(user)) {
      header = (
        <PrivateHeader
          avatar={user.userInfo.avatar}
          name={user.userInfo.name}
        />
      );
    }
    return (
      <Layout className="mainLayout">
        {header}
        <Content className="mainContent">{children}</Content>
        <Footer className="mainFooter">
          Ant Design ©2019 Created by ZTeam
        </Footer>
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    user: state.user.user,
    token: state.user.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUser: item => {
      dispatch(handleGetUser(item));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
