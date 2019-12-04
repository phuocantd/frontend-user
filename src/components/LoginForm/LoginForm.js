import React, { Component } from 'react';
import { Form, Button, Input, Icon, message, Spin, Checkbox } from 'antd';
import { connect } from 'react-redux';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import GoogleLogin from 'react-google-login';
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
    const { form, isRequest } = this.props;
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
          <Spin spinning={isRequest} indicator={antIcon} />
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
            appId="585874832148477"
            callback={() => this.responseFacebook.bind(this)}
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
            clientId="405007263881-p8drbte3o6vrccl4tl79d3a6srughku1.apps.googleusercontent.com"
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
            onSuccess={() => this.responseGoogle.bind(this)}
            onFailure={() => this.responseGoogle.bind(this)}
            cookiePolicy="single_host_origin"
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
