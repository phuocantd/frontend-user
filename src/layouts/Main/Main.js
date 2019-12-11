import React, { Component } from 'react';
import { Layout, Button } from 'antd';
import { Link, Route, Switch } from 'react-router-dom';
import User from '../../pages/User/User';
import Home from '../../pages/Home/Home';

const { Header, Content, Footer } = Layout;
class Main extends Component {
  constructor(props) {
    super(props);
    this.findTutor = React.createRef();
  }

  gotoFindTutor = () => {
    document
      .getElementsByClassName('homeContent')[0]
      .scrollIntoView({ behavior: 'smooth' });
  };

  render() {
    return (
      <Layout className="homeLayout">
        <Header className="homeHeader">
          <div className="rightHeader">
            <Link className="headerItem" to="/login">
              <b>LOGIN</b>
            </Link>
            <Link className="headerItem" to="/register">
              <b>SIGN UP</b>
            </Link>
            <Button type="primary" onClick={() => this.gotoFindTutor()}>
              <b>FIND TUTOR</b>
            </Button>
          </div>
        </Header>
        <Content className="homeContent" ref={this.findTutor}>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/user">
              <User />
            </Route>
          </Switch>
        </Content>
        <Footer className="homeFooter">
          Ant Design ©2019 Created by ZTeam
        </Footer>
      </Layout>
    );
  }
}

export default Main;
