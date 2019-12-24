import React, { Component } from 'react';
import axios from 'axios';
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
import { updateUser } from '../../actions/user';

class InfoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      // signedUrl: '',
      imageUrl: '',
      fileType: ''
    };
  }

  handleSubmit = e => {
    const { form, token, updateUserInfo } = this.props;
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
              updateUserInfo(response.data);
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

  beforeUpload = async file => {
    const { token, updateUserInfo } = this.props;
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 4;
    if (!isLt2M) {
      message.error('Image must smaller than 4MB!');
    }

    if (isJpgOrPng && isLt2M) {
      const fileParts = file.name.split('.');
      const fileName = fileParts[0];
      const fileType = fileParts[1];
      const response = await axios.post(
        config.url.get_upload_avatar_url(),
        {
          fileName,
          fileType
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const { returnUrl } = response.data.data;
      this.setState({
        // signedUrl: returnUrl.signedUrl,
        imageUrl: returnUrl.imageUrl,
        fileType,
        isLoading: true
      });

      await axios.put(returnUrl.signedUrl, file, {
        headers: {
          'Content-Type': fileType
        }
      });

      const { imageUrl } = this.state;
      const res = await services.user.updateAvatar(imageUrl, token);
      this.setState({
        isLoading: false
      });

      if (res && res.success) {
        updateUserInfo(res.data);
        message.success('Avatar changed');
      } else {
        message.error(res.error);
      }
    }
    return isJpgOrPng && isLt2M;
  };
  // handleChange = info => {
  //   if (info.file.status === 'uploading') {
  //     this.setState({ isLoading: true });
  //     return;
  //   }
  //   if (info.file.status === 'done') {
  //     this.setState({ isLoading: false });
  //     const {user, updateUserInfo} = this.props;
  //     const {imageUrl} = this.state;
  //     updateUserInfo({
  //       ...user,
  //       avatar: imageUrl
  //     });
  //     message.success('Avatar changed');
  //   }
  // };

  render() {
    const { form, user } = this.props;
    // const { signedUrl } = this.state;
    const { isLoading, fileType } = this.state;
    const { getFieldDecorator } = form;
    const uploadButton = (
      <div>
        <Icon type={isLoading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const header = {
      'Content-Type': fileType
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
              name="abc"
              listType="picture"
              className="avatar-uploader"
              showUploadList={false}
              headers={header}
              // method="put"
              // action={signedUrl}
              beforeUpload={this.beforeUpload}
              // onChange={this.handleChange}
            >
              {user.avatar ? (
                <img src={user.avatar} alt="avatar" style={{ width: '100%' }} />
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
              style={{
                width: '450px'
              }}
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
                      message: 'Please input your name!',
                      whitespace: true
                    }
                  ],
                  initialValue: user.name || ''
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
                  initialValue: user.address || ''
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
    updateUserInfo: item => {
      dispatch(updateUser(item));
    }
  };
};

export default connect(
  null,
  mapDispatchtoProps
)(Form.create({ name: 'info_form' })(InfoForm));
