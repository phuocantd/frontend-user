import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Layout } from 'antd';
import './App.css';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Main from './layouts/Main/Main';
import Home from './pages/Home/Home';
import User from './pages/User/User';
import Empty from './layouts/Empty/Empty';

function RouteWithLayout({ layout, component, ...rest }) {
  const { path, exact } = rest;
  return (
    <Route
      path={path}
      exact={exact}
      render={props =>
        React.createElement(
          layout,
          props,
          React.createElement(component, props)
        )
      }
    />
  );
}

function App() {
  return (
    <Layout style={{ height: '100vh' }}>
      <Switch>
        <RouteWithLayout layout={Main} path="/" exact component={Home} />
        <RouteWithLayout layout={Main} path="/user" exact component={User} />
        <RouteWithLayout layout={Empty} path="/login" component={Login} />
        <RouteWithLayout layout={Empty} path="/register" component={Register} />
      </Switch>
    </Layout>
  );
}

export default App;
