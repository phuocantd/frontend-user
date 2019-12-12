import React, { Component } from 'react';
import { Layout, Card } from 'antd';
import { connect } from 'react-redux';
import { updateUser } from '../../actions/user';
import InfoForm from '../../components/InfoForm/InfoForm';
import IntroForm from '../../components/IntroForm/IntroForm';
import SecurForm from '../../components/SecurForm/SecurForm';

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
  info: <InfoForm />,
  intro: <IntroForm />,
  secur: <SecurForm />
};
class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: 'intro'
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
          style={{ minWidth: 1000, minHeight: 600 }}
          hoverable
          tabList={tabList}
          activeTabKey={currentTab}
          onTabChange={key => this.handleChangeTab(key)}
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
