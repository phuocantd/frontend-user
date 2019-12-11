import React, { PureComponent } from 'react';
import { Layout, PageHeader, Card } from 'antd';
import { Redirect, Link } from 'react-router-dom';
import RegisterForm from '../../components/RegisterForm/RegisterForm';
import './Register.css';

const { Content } = Layout;

class Register extends PureComponent {
  render() {
    const { isLoggedIn } = this.props;
    if (isLoggedIn) {
      return <Redirect to={{ pathname: '/' }} />;
    }
    return (
      <Layout>
        <PageHeader
          className="registerHeader"
          title="Sign Up"
          extra={[
            <h4 key="loginBtn" style={{ verticalAlign: 'middle' }}>
              Already have an account? <Link to="/login">Login</Link>
            </h4>
          ]}
        />
        <Content className="registerContent">
          <Card style={{ width: 500 }} hoverable>
            <RegisterForm />
          </Card>
        </Content>
      </Layout>
    );
  }
}

export default Register;
