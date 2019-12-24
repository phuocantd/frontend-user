import React, { PureComponent } from 'react';
import { Layout, PageHeader, Card } from 'antd';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './UpdateForgotPassword.css';
import SecurForm from '../../components/SecurForm/SecurForm';

const { Content } = Layout;
class UpdateForgotPassword extends PureComponent {
  render() {
    const {
      isLoggedIn,
      match: { params }
    } = this.props;
    if (isLoggedIn) {
      return <Redirect to="/dashboard" />;
    }
    return (
      <Layout>
        <PageHeader
          className="updateForgotHeader"
          title="Update New Password"
        />
        <Content className="updateForgotContent">
          <Card style={{ width: 450 }} hoverable>
            <SecurForm forgot token={params.token} />
          </Card>
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

export default connect(mapStateToProps)(UpdateForgotPassword);
