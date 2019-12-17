import React, { PureComponent } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link, Route } from 'react-router-dom';
import './Dashboard.css';
import Contract from '../Contract/Contract';

const { Sider, Content } = Layout;
export default class Dashboard extends PureComponent {
  render() {
    const { match, location } = this.props;
    const { path, url } = match;
    return (
      <Layout className="dashboardLayout">
        <Sider width={200} className="dashboardSider">
          <Menu
            mode="inline"
            defaultSelectedKeys={['dashboard']}
            selectedKeys={[location.pathname]}
          >
            <Menu.Item key={`${url}`}>
              <Link to={`${url}`}>
                <Icon type="dashboard" />
                <span>Dashboard</span>
              </Link>
            </Menu.Item>
            <Menu.Item key={`${url}/contract`}>
              <Link to={`${url}/contract`}>
                <Icon type="container" />
                <span>Contracts</span>
              </Link>
            </Menu.Item>
            <Menu.Item key={`${url}/complaint`}>
              <Link to={`${url}/complaint`}>
                <Icon type="diff" />
                <span>Complaints</span>
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Content className="dashboardContent">
          <Route path={`${path}/contract`} exact>
            <Contract />
          </Route>
        </Content>
      </Layout>
    );
  }
}
