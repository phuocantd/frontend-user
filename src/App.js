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

function App() {
  return (
    <Layout style={{ height: '100vh' }}>
      <Switch>
        <RouteWithLayout layout={Main} path="/" exact component={Home} />
        <RouteWithLayout
          layout={Main}
          path="/dashboard"
          component={Dashboard}
        />
        <RouteWithLayout layout={Main} path="/user" component={User} authed />
        <RouteWithLayout layout={Empty} path="/login" component={Login} />
        <RouteWithLayout layout={Empty} path="/register" component={Register} />
      </Switch>
    </Layout>
  );
}

export default App;
