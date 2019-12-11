import React, { PureComponent } from 'react';
import { Layout } from 'antd';
import './Empty.css';

const { Content } = Layout;
export default class Empty extends PureComponent {
  render() {
    const { children } = this.props;
    return (
      <Layout className="emptyLayout">
        <Content className="emptyContent">{children}</Content>
      </Layout>
    );
  }
}
