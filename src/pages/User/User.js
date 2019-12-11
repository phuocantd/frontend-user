import React, { Component } from 'react';
import { Layout, Card } from 'antd';
import { connect } from 'react-redux';
import { updateUser } from '../../actions/user';
import InfoForm from '../../components/InfoForm/InfoForm';

const tabList = [
  {
    key: 'info',
    tab: 'Infomation'
  },
  {
    key: 'intro',
    tab: 'Introduction'
  },
  {
    key: 'secur',
    tab: 'Security'
  }
];
const contentList = {
  info: <InfoForm />
};
class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: 'info'
    };
  }

  handleChangeTab = key => {
    this.setState({ currentTab: key });
  };

  render() {
    const { currentTab } = this.state;
    return (
      <Layout
        style={{
          height: '100vh',
          backgroundColor: '#fff',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Card
          style={{ width: 500 }}
          hoverable
          tabList={tabList}
          activeTabKey={currentTab}
          onTabChange={() => this.handleChangeTab()}
        >
          {contentList[currentTab]}
        </Card>
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.user,
    token: state.user.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateUserInfo: item => {
      dispatch(updateUser(item));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
