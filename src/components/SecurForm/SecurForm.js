import React, { PureComponent } from 'react';
import { Form, Input, Button, Row } from 'antd';

class SecurForm extends PureComponent {
  render() {
    const { form } = this.props;
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
            {getFieldDecorator('Password', {
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
            <Button type="primary" htmlType="submit">
              Update
            </Button>
          </Form.Item>
        </Form>
      </Row>
    );
  }
}

export default Form.create({ name: 'secur_form' })(SecurForm);
