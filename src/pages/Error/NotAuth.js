import React, { PureComponent } from 'react';
import { Layout, Result, Button } from 'antd';
import { Link } from 'react-router-dom';

export default class NotAuth extends PureComponent {
  render() {
    return (
      <Layout>
        <Result
          status="403"
          title="403"
          subTitle="Sorry, you are not authorized to access this page."
          extra={
            <Link to="/">
              <Button type="primary">Back Home</Button>
            </Link>
          }
        />
      </Layout>
    );
  }
}
