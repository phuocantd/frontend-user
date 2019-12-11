import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Layout } from 'antd';
import './App.css';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Main from './layouts/Main/Main';

function App() {
  return (
    <Layout style={{ height: '100vh' }}>
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Switch>
    </Layout>
  );
}

export default App;
