import React, { Component } from 'react';
import { Form, Input, Button, message, Spin, Tooltip, Icon, Tag } from 'antd';
import { connect } from 'react-redux';
import { updateUser } from '../../actions/user';
import services from '../../api/services';

class UpdateForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmDirty: false,
      isLoading: false,
      tags: ['HTML5', 'CSS3', 'Graphics Design'],
      inputVisible: false,
      inputValue: ''
    };
  }

  handleClose = removedTag => {
    const { tags } = this.state;
    const filterTags = tags.filter(tag => tag !== removedTag);
    this.setState({ tags: filterTags });
  };

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  };

  handleInputChange = e => {
    this.setState({ inputValue: e.target.value });
  };

  handleInputConfirm = () => {
    const { inputValue } = this.state;
    let { tags } = this.state;
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
    }
    this.setState({
      tags,
      inputVisible: false,
      inputValue: ''
    });
  };

  saveInputRef = input => {
    this.input = input;
  };

  handleSubmit = e => {
    const { form, updateUserInfo, token } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      this.setState({ isLoading: true });
      if (!err) {
        const {
          email,
          oldPassword,
          newPassword,
          passwordConfirm,
          name
        } = values;
        services.user
          .updateUser(
            email,
            oldPassword,
            newPassword,
            passwordConfirm,
            name,
            token
          )
          .then(response => {
            this.setState({ isLoading: false });
            if (response.error < 0) {
              message.error(response.data.message);
            } else {
              updateUserInfo(response.data.user);
              message.success('Update successful');
            }
          });
      }
      this.setState({ isLoading: false });
    });
  };

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

  render() {
    const { form, user } = this.props;
    const { isLoading, tags, inputVisible, inputValue } = this.state;
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
      <Form
        labelCol={formItemLayout.labelCol}
        wrapperCol={formItemLayout.wrapperCol}
        onSubmit={this.handleSubmit}
        style={{
          width: '450px'
        }}
      >
        <Spin
          spinning={isLoading}
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
            ],
            initialValue: user.email
          })(<Input readOnly />)}
        </Form.Item>
        <Form.Item
          label={
            <span>
              Full name&nbsp;
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
            ],
            initialValue: user.name
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Address">
          {getFieldDecorator('address', {
            rules: [
              {
                required: true,
                message: 'Please input your address!',
                whitespace: true
              }
            ],
            initialValue: user.address
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Skill">
          {getFieldDecorator('tags', {
            rules: [
              {
                required: true,
                message: 'Please input your address!'
              }
            ]
          })(
            <div>
              {tags.map(tag => {
                const isLongTag = tag.length > 20;
                const tagElem = (
                  <Tag key={tag} onClose={() => this.handleClose(tag)} closable>
                    {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                  </Tag>
                );
                return isLongTag ? (
                  <Tooltip title={tag} key={tag}>
                    {tagElem}
                  </Tooltip>
                ) : (
                  tagElem
                );
              })}
              {inputVisible && (
                <Input
                  ref={this.saveInputRef}
                  type="text"
                  size="small"
                  style={{ width: 78 }}
                  value={inputValue}
                  onChange={this.handleInputChange}
                  onBlur={this.handleInputConfirm}
                  onPressEnter={this.handleInputConfirm}
                />
              )}
              {!inputVisible && (
                <Tag
                  onClick={this.showInput}
                  style={{ background: '#fff', borderStyle: 'dashed' }}
                >
                  <Icon type="plus" /> New Tag
                </Tag>
              )}
            </div>
          )}
        </Form.Item>
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
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.user,
    token: state.user.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateUserInfo: item => {
      dispatch(updateUser(item));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create({ name: 'update_form' })(UpdateForm));
