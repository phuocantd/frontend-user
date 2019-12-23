import React, { Component } from 'react';
import { Form, Button, Input, Icon, message } from 'antd';
import services from '../../api/services';

class ForgotForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRequest: false
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    const { form } = this.props;
    form.validateFields((error, values) => {
      if (!error) {
        this.setState({ isRequest: true });
        services.user
          .forgotPassword(values.email)
          .then(response => {
            this.setState({ isRequest: false });
            if (response.success) {
              message.success(response.data.message);
            }
          })
          .catch(err => {
            this.setState({ isRequest: false });
            if (err.response) {
              message.error(err.response.data.error);
            } else {
              message.error(err.message);
            }
          });
      }
    });
  };

  render() {
    const { form } = this.props;
    const { isRequest } = this.state;
    const { getFieldDecorator } = form;
    return (
      <Form onSubmit={this.handleSubmit} className="forgot-form">
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
          <Button
            type="default"
            htmlType="submit"
            className="forgot-form-button"
            loading={isRequest}
          >
            Send Email
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create({ name: 'forgot_form' })(ForgotForm);
