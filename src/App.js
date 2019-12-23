import React from 'react';
import { Switch } from 'react-router-dom';
import { Layout } from 'antd';
import './App.css';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Main from './layouts/Main/Main';
import Home from './pages/Home/Home';
import User from './pages/User/User';
import Empty from './layouts/Empty/Empty';
import RouteWithLayout from './routes/RouteWithLayout';
import Dashboard from './pages/Dashboard/Dashboard';
import NotFound from './pages/Error/NotFound';
import NotAuth from './pages/Error/NotAuth';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import UpdateForgotPassword from './pages/UpdateForgotPassword/UpdateForgotPassword';

function App() {
  return (
    <Layout style={{ height: '100vh' }}>
      <Switch>
        <RouteWithLayout layout={Main} path="/" exact component={Home} />
        <RouteWithLayout
          layout={Main}
          path="/dashboard"
          component={Dashboard}
          authed
        />
        <RouteWithLayout layout={Main} path="/user" component={User} authed />
        <RouteWithLayout layout={Empty} path="/login" component={Login} />
        <RouteWithLayout layout={Empty} path="/register" component={Register} />
        <RouteWithLayout
          layout={Empty}
          path="/forgotPassword"
          component={ForgotPassword}
        />
        <RouteWithLayout
          layout={Empty}
          path="/updatepassword/:token"
          component={UpdateForgotPassword}
        />
        <RouteWithLayout layout={Empty} path="/403" component={NotAuth} />
        <RouteWithLayout layout={Empty} component={NotFound} />
      </Switch>
    </Layout>
  );
}

export default App;
