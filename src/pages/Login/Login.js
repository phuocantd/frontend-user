import React, { PureComponent } from 'react';
import { Layout, PageHeader, Button, Card } from 'antd';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import LoginForm from '../../components/LoginForm/LoginForm';
import './Login.css';

const { Content } = Layout;
class Login extends PureComponent {
  render() {
    const { isLoggedIn } = this.props;
    if (isLoggedIn) {
      return <Redirect to={{ pathname: '/' }} />;
    }
    return (
      <Layout>
        <PageHeader
          className="loginHeader"
          title="Sign In"
          extra={[
            <Link to="/register" key="signUpBtn">
              <Button type="primary">
                <b>SIGN UP</b>
              </Button>
            </Link>
          ]}
        />
        <Content className="loginContent">
          <Card style={{ width: 350 }} hoverable>
            <LoginForm />
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

export default connect(mapStateToProps)(Login);
