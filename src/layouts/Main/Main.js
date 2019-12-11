import React, { PureComponent } from 'react';
import { Layout } from 'antd';
import './Main.css';
import PublicHeader from '../../components/Header/PublicHeader/PublicHeader';

const { Content, Footer } = Layout;
class Main extends PureComponent {
  render() {
    const { children } = this.props;
    return (
      <Layout className="mainLayout">
        <PublicHeader />
        <Content className="mainContent">{children}</Content>
        <Footer className="mainFooter">
          Ant Design ©2019 Created by ZTeam
        </Footer>
      </Layout>
    );
  }
}

export default Main;
