import React, { Component } from 'react';
import { Form, Button, Input, Icon, message, Spin, Checkbox } from 'antd';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import GoogleLogin from 'react-google-login';
import './Login.css';

class LoginForm extends Component {
  handleSubmit = e => {
    e.preventDefault();
    const { form, requestAuthen } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        requestAuthen({ ...values, message, type: 'normal' });
      }
    });
  };

  responseFacebook = resp => {
    const { requestAuthen } = this.props;
    requestAuthen({
      accessToken: resp.accessToken,
      type: 'facebook',
      message
    });
  };

  responseGoogle = resp => {
    const { requestAuthen } = this.props;
    requestAuthen({
      accessToken: resp.accessToken,
      type: 'google',
      message
    });
  };

  render() {
    const { form, requesting } = this.props;
    const { getFieldDecorator } = form;
    const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
    return (
      <Form
        onSubmit={this.handleSubmit}
        className="login-form"
        style={{ width: 450 }}
      >
        <Form.Item
          style={{
            display: 'flex',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Spin spinning={requesting} indicator={antIcon} />
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('email', {
            rules: [{ required: true, message: 'Please input your email!' }]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Email"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('tutor', {
            valuePropName: 'checked',
            initialValue: false
          })(<Checkbox>I am tutor</Checkbox>)}
          <Button
            type="default"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
          <FacebookLogin
            appId="2369352233173069"
            callback={this.responseFacebook}
            render={renderProps => (
              <Button
                type="primary"
                className="login-form-button"
                onClick={renderProps.onClick}
              >
                <Icon type="facebook" theme="filled" />
                Log in with Facebook
              </Button>
            )}
          />
          <GoogleLogin
            clientId="997385405136-fnmk9qjfcm2aoia7o9jdb4d2tuui7b4n.apps.googleusercontent.com"
            render={renderProps => (
              <Button
                type="danger"
                className="login-form-button"
                onClick={renderProps.onClick}
              >
                <Icon type="google" />
                Log in with Google
              </Button>
            )}
            onSuccess={this.responseGoogle}
            onFailure={this.responseGoogle}
            cookiePolicy="single_host_origin"
          />
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create({ name: 'login_form' })(LoginForm);
