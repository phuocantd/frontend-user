import React, { PureComponent } from 'react';
import { Layout, PageHeader, Button, Card } from 'antd';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import './ForgotPassword.css';
import ForgotForm from '../../components/ForgotForm/ForgotForm';

const { Content } = Layout;
class ForgotPassword extends PureComponent {
  render() {
    const { isLoggedIn, history } = this.props;
    if (isLoggedIn) {
      return <Redirect to="/dashboard" />;
    }
    return (
      <Layout>
        <PageHeader
          className="forgotHeader"
          title="Forgot Password"
          onBack={() => history.push('/login')}
          extra={[
            <Link to="/register" key="signUpBtn">
              <Button type="primary">
                <b>SIGN UP</b>
              </Button>
            </Link>
          ]}
        />
        <Content className="forgotContent">
          <Card style={{ width: 350 }} hoverable>
            <ForgotForm />
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

export default connect(mapStateToProps)(ForgotPassword);
