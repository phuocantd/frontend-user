import React, { Component } from 'react';
import { Form, Button, Input, Icon, message } from 'antd';
import { connect } from 'react-redux';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import GoogleLogin from 'react-google-login';
import { Link } from 'react-router-dom';
import './LoginForm.css';
import { handleAuthen } from '../../actions/user';

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
    if (resp) {
      requestAuthen({
        accessToken: resp.accessToken,
        type: 'facebook',
        message
      });
    }
  };

  responseGoogle = resp => {
    const { requestAuthen } = this.props;
    if (resp) {
      requestAuthen({
        accessToken: resp.accessToken,
        type: 'google',
        message
      });
    }
  };

  render() {
    const { form, isRequest } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Form
        onSubmit={this.handleSubmit}
        className="login-form"
        style={{ width: 450 }}
      >
        <Form.Item>
          {getFieldDecorator('email', {
            rules: [
              {
                type: 'email',
                message: 'The input is not valid E-mail!'
              },
              { required: true, message: 'Please input your email!' }
            ]
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
          <Link className="login-form-forgot" to="/forgotPassword">
            Forgot password
          </Link>
          <Button
            type="default"
            htmlType="submit"
            className="login-form-button"
            loading={isRequest}
          >
            Log in
          </Button>
          <FacebookLogin
            appId="585874832148477"
            callback={resp => this.responseFacebook(resp)}
            render={renderProps => (
              <Button
                type="primary"
                className="login-form-button"
                onClick={renderProps.onClick}
                disabled={isRequest}
              >
                <Icon type="facebook" theme="filled" />
                Log in with Facebook
              </Button>
            )}
          />
          <GoogleLogin
            clientId="405007263881-p8drbte3o6vrccl4tl79d3a6srughku1.apps.googleusercontent.com"
            render={renderProps => (
              <Button
                type="danger"
                className="login-form-button"
                onClick={renderProps.onClick}
                disabled={isRequest}
              >
                <Icon type="google" />
                Log in with Google
              </Button>
            )}
            onSuccess={resp => this.responseGoogle(resp)}
            onFailure={() => {}}
            cookiePolicy="single_host_origin"
            autoLoad={false}
          />
        </Form.Item>
      </Form>
    );
  }
}

const mapStateToProps = state => {
  return {
    isRequest: state.user.isRequest
  };
};

const mapDispatchToProps = dispatch => {
  return {
    requestAuthen: item => {
      dispatch(handleAuthen(item));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create({ name: 'login_form' })(LoginForm));
