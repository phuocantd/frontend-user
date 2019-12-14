import React, { Component } from 'react';
import { Layout, Card } from 'antd';
import { connect } from 'react-redux';
import InfoForm from '../../components/InfoForm/InfoForm';
import IntroForm from '../../components/IntroForm/IntroForm';
import SecurForm from '../../components/SecurForm/SecurForm';
import './User.css';

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
const tabListStudent = [
  {
    key: 'info',
    tab: 'Infomation'
  },
  {
    key: 'secur',
    tab: 'Security'
  }
];
class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentKey: 'info'
    };
  }

  handleChangeTab = key => {
    this.setState({ currentKey: key });
  };

  render() {
    const { user, token } = this.props;
    const { currentKey } = this.state;
    let currentTab = null;
    let currentTabList = tabList;
    if (user.role === 'student') {
      currentTabList = tabListStudent;
    }
    if (currentKey === 'info') {
      currentTab = <InfoForm user={user} token={token} />;
    }
    if (currentKey === 'intro') {
      currentTab = <IntroForm user={user} token={token} />;
    }
    if (currentKey === 'secur') {
      currentTab = <SecurForm user={user} token={token} />;
    }
    return (
      <Layout className="userLayout">
        <Card
          className="userContainer"
          hoverable
          tabList={currentTabList}
          activeTabKey={currentKey}
          onTabChange={key => this.handleChangeTab(key)}
        >
          {currentTab}
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

export default connect(mapStateToProps)(User);
