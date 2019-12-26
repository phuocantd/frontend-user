import React, { PureComponent } from 'react';
import { Layout } from 'antd';
import TutorForm from '../../components/TutorForm/TutorForm';

export default class FindTutor extends PureComponent {
  render() {
    return (
      <Layout className="dashboardLayout" style={{ padding: '64px 30px' }}>
        <TutorForm />
      </Layout>
    );
  }
}
