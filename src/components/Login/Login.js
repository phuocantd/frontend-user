import React, { PureComponent } from 'react';
import { Layout, PageHeader, Button, Card } from 'antd';
import { Redirect, Link } from 'react-router-dom';
import LoginForm from './LoginForm';

const { Content } = Layout;
class Login extends PureComponent {
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
          title="Sign In"
          extra={[
            <Link to="/register">
              <Button type="primary">Sign Up</Button>
            </Link>
          ]}
        />
        <Content
          style={{
            height: '100vh',
            display: 'flex',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Card style={{ width: 350 }} hoverable>
            <LoginForm />
          </Card>
        </Content>
      </Layout>
    );
  }
}

export default Login;
