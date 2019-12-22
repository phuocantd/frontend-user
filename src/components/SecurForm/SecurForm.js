import React, { Component } from 'react';
import { Form, Input, Button, Row, message } from 'antd';
import services from '../../api/services';

class SecurForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submiting: false,
      confirmDirty: false
    };
  }

  handleConfirmBlur = e => {
    const { value } = e.target;
    const { confirmDirty } = this.state;
    this.setState({ confirmDirty: confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('newPassword')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    const { confirmDirty } = this.state;
    if (value && confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  handleSubmit = e => {
    const { form, token } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.setState({ submiting: true });
        services.user
          .updatePassword(values.currentPassword, values.newPassword, token)
          .then(response => {
            this.setState({ submiting: false });
            if (response.success) {
              message.success('Password changed successfully');
            } else {
              message.error(response.error);
            }
          })
          .catch(error => {
            this.setState({ submiting: false });
            if (error.response) {
              message.error(error.response.data.error);
            } else {
              message.error(error.message);
            }
          });
      }
    });
  };

  render() {
    const { form } = this.props;
    const { submiting } = this.state;
    const { getFieldDecorator } = form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };
    return (
      <Row type="flex" justify="center">
        <Form
          labelCol={formItemLayout.labelCol}
          wrapperCol={formItemLayout.wrapperCol}
          onSubmit={this.handleSubmit}
          style={{
            width: '450px'
          }}
        >
          <Form.Item label="Password" hasFeedback>
            {getFieldDecorator('currentPassword', {
              rules: [
                {
                  required: true,
                  message: 'Please input your password!'
                }
              ]
            })(<Input.Password />)}
          </Form.Item>
          <Form.Item label="New Password" hasFeedback>
            {getFieldDecorator('newPassword', {
              rules: [
                {
                  message: 'Please input your new password!'
                },
                {
                  validator: this.validateToNextPassword
                }
              ]
            })(<Input.Password />)}
          </Form.Item>
          <Form.Item label="Confirm Password" hasFeedback>
            {getFieldDecorator('passwordConfirm', {
              rules: [
                {
                  message: 'Please confirm your password!'
                },
                {
                  validator: this.compareToFirstPassword
                }
              ]
            })(<Input.Password onBlur={this.handleConfirmBlur} />)}
          </Form.Item>
          <Form.Item wrapperCol={tailFormItemLayout.wrapperCol}>
            <Button type="primary" htmlType="submit" loading={submiting}>
              Update
            </Button>
          </Form.Item>
        </Form>
      </Row>
    );
  }
}

export default Form.create({ name: 'secur_form' })(SecurForm);
