import React, { PureComponent } from 'react';
import { Layout, PageHeader, Card } from 'antd';
import { Redirect, Link } from 'react-router-dom';
import RegisterForm from '../../components/RegisterForm/RegisterForm';

const { Content } = Layout;

class Register extends PureComponent {
  render() {
    const { isLoggedIn } = this.props;
    if (isLoggedIn) {
      return <Redirect to={{ pathname: '/home' }} />;
    }
    return (
      <Layout style={{ height: '100vh' }}>
        <PageHeader
          style={{
            border: '1px solid rgb(235, 237, 240)',
            backgroundColor: 'white'
          }}
          title="Sign Up"
          extra={[
            <h4 key="loginBtn">
              Already have an account? <Link to="/login">Login</Link>
            </h4>
          ]}
        />
        <Content
          style={{
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Card style={{ width: 500 }} hoverable>
            <RegisterForm />
          </Card>
        </Content>
      </Layout>
    );
  }
}

export default Register;
