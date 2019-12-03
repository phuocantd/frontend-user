import React, { Component } from 'react';
import {
  Form,
  Input,
  Button,
  message,
  Spin,
  Tooltip,
  Icon,
  Select
} from 'antd';
import { connect } from 'react-redux';
import './RegisterForm.css';
import { handleRegister } from '../../actions/user';

const { Option } = Select;

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmDirty: false
    };
  }

  handleSubmit = e => {
    const { form, register } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        register({ ...values, message });
      }
    });
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    const { confirmDirty } = this.state;
    this.setState({ confirmDirty: confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
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

  render() {
    const { form, isRequest } = this.props;
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
    const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
    return (
      <Form
        labelCol={formItemLayout.labelCol}
        wrapperCol={formItemLayout.wrapperCol}
        onSubmit={this.handleSubmit}
        style={{
          width: '450px'
        }}
      >
        <Spin
          spinning={isRequest}
          indicator={antIcon}
          style={{
            display: 'flex',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            paddingBottom: 20
          }}
        />
        <Form.Item label="E-mail">
          {getFieldDecorator('email', {
            rules: [
              {
                type: 'email',
                message: 'The input is not valid E-mail!'
              },
              {
                required: true,
                message: 'Please input your E-mail!'
              }
            ]
          })(<Input />)}
        </Form.Item>
        <Form.Item
          label={
            <span>
              Fullname&nbsp;
              <Tooltip title="What do you want others to call you?">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          }
        >
          {getFieldDecorator('name', {
            rules: [
              {
                required: true,
                message: 'Please input your nickname!',
                whitespace: true
              }
            ]
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Password" hasFeedback>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: 'Please input your password!'
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
                required: true,
                message: 'Please confirm your password!'
              },
              {
                validator: this.compareToFirstPassword
              }
            ]
          })(<Input.Password onBlur={this.handleConfirmBlur} />)}
        </Form.Item>
        <Form.Item label="Purpose">
          {getFieldDecorator('role', {
            rules: [{ required: true, message: 'Please select your purpose!' }]
          })(
            <Select placeholder="Select a purpose">
              <Option value="student">Im looking for tutor</Option>
              <Option value="tutor">I want to become a tutor</Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item wrapperCol={tailFormItemLayout.wrapperCol}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
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
    register: item => {
      dispatch(handleRegister(item));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create({ name: 'register_form' })(RegisterForm));
