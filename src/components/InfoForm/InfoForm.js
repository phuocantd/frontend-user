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
import config from '../../api/config';

class InfoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    };
  }

  handleSubmit = e => {
    // const { form } = this.props;
    e.preventDefault();
    // form.validateFieldsAndScroll((err, values) => {});
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
        const { updateUserInfo } = this.props;
        if (response.error >= 0 && response.data.user) {
          updateUserInfo(response.data.user);
          message.success('Avatar changed');
        } else {
          message.error(response.data.message);
        }
      }
    }
  };

  render() {
    const { form, token } = this.props;
    const { isLoading } = this.state;
    const { getFieldDecorator } = form;
    const uploadUrl = config.url.upload_avatar();
    const avatar =
      'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png';
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
              {avatar ? (
                <img src={avatar} alt="avatar" style={{ width: '100%' }} />
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
                  ]
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
                  ]
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
                  ]
                })(<Input />)}
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

export default Form.create({ name: 'info_form' })(InfoForm);
