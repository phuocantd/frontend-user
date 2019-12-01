import React, { PureComponent } from 'react';
import { Layout, PageHeader, Card, Tabs } from 'antd';
import { Redirect, Link } from 'react-router-dom';
import StudentsRegisterForm from './StudentsRegisterForm';
import TutorsRegisterForm from './TutorsRegisterForm';

const { Content } = Layout;
const { TabPane } = Tabs;

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
            <h4>
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
            <Tabs defaultActiveKey="student">
              <TabPane tab="Students" key="student">
                <StudentsRegisterForm />
              </TabPane>
              <TabPane tab="Tutors" key="tutor">
                <TutorsRegisterForm />
              </TabPane>
            </Tabs>
          </Card>
        </Content>
      </Layout>
    );
  }
}

export default Register;
