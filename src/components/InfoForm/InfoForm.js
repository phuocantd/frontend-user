import React, { Component } from 'react';
import {
  Input,
  Form,
  Tooltip,
  Icon,
  Button,
  message,
  Row,
  Col,
  Upload
} from 'antd';
import { connect } from 'react-redux';
import config from '../../api/config';
import services from '../../api/services';
import { updateUserInfo } from '../../actions/user';

class InfoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    };
  }

  handleSubmit = e => {
    const { form, token, updateUserInf } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.setState({ isLoading: true });
        services.user
          .updateUser(values.name, values.address, values.password, token)
          .then(response => {
            this.setState({ isLoading: false });
            if (response.success) {
              message.success('Infomation changed successfully');
              updateUserInf(response.data);
            } else {
              message.error(response.error);
            }
          })
          .catch(error => {
            this.setState({ isLoading: false });
            if (error.response) {
              message.error(error.response.data.error);
            } else {
              message.error(error.message);
            }
          });
      }
    });
  };

  beforeUpload = file => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 4;
    if (!isLt2M) {
      message.error('Image must smaller than 4MB!');
    }
    return isJpgOrPng && isLt2M;
  };

  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ isLoading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      this.setState({ isLoading: false });
      if (info.file.response) {
        const { response } = info.file;
        const { updateUserInf } = this.props;
        if (response.error >= 0 && response.data.user) {
          updateUserInf(response.data.user);
          message.success('Avatar changed');
        } else {
          message.error(response.data.message);
        }
      }
    }
  };

  render() {
    const { form, token, user } = this.props;
    const { isLoading } = this.state;
    const { getFieldDecorator } = form;
    const uploadUrl = config.url.get_upload_avatar_url();
    const uploadButton = (
      <div>
        <Icon type={isLoading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const header = {
      Authorization: `Bearer ${token}`
    };
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
      <>
        <Row type="flex" justify="center" align="middle">
          <Col>
            <Upload
              name="file"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action={uploadUrl}
              headers={header}
              beforeUpload={this.beforeUpload}
              onChange={this.handleChange}
            >
              {user.userInfo.avatar ? (
                <img
                  src={user.userInfo.avatar}
                  alt="avatar"
                  style={{ width: '100%' }}
                />
              ) : (
                uploadButton
              )}
            </Upload>
          </Col>
        </Row>
        <Row type="flex" justify="center">
          <Col>
            <Form
              labelCol={formItemLayout.labelCol}
              wrapperCol={formItemLayout.wrapperCol}
              onSubmit={this.handleSubmit}
              style={{ width: '450px' }}
            >
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
                  initialValue: user.userInfo.email
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
                      message: 'Please input your name!',
                      whitespace: true
                    }
                  ],
                  initialValue: user.userInfo.name || ''
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
                  initialValue: user.userInfo.address || ''
                })(<Input />)}
              </Form.Item>
              <Form.Item label="Password" hasFeedback>
                {getFieldDecorator('password', {
                  rules: [
                    {
                      required: true,
                      message: 'Please input your password!'
                    }
                  ]
                })(<Input.Password />)}
              </Form.Item>
              <Form.Item wrapperCol={tailFormItemLayout.wrapperCol}>
                <Button type="primary" htmlType="submit" loading={isLoading}>
                  Update
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </>
    );
  }
}

const mapDispatchtoProps = dispatch => {
  return {
    updateUserInf: item => {
      dispatch(updateUserInfo(item));
    }
  };
};

export default connect(
  null,
  mapDispatchtoProps
)(Form.create({ name: 'info_form' })(InfoForm));
