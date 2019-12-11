import React, { Component } from 'react';
import { message, Layout, Icon, Upload, Row, Col, Card } from 'antd';
import { connect } from 'react-redux';
import config from '../../api/config';
import { updateUser } from '../../actions/user';
import UpdateForm from './UpdateForm';

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    };
  }

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
    const { isLoading } = this.state;
    const { user, token } = this.props;
    const { avatar } = user;
    const uploadUrl = config.url.upload_avatar();
    const uploadButton = (
      <div>
        <Icon type={isLoading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const header = {
      Authorization: `Bearer ${token}`
    };
    return (
      <Layout
        style={{
          height: '100vh',
          backgroundColor: '#fff',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Card style={{ width: 500 }} hoverable>
          <Row type="flex" justify="center">
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
              <UpdateForm />
            </Col>
          </Row>
        </Card>
      </Layout>
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

export default connect(mapStateToProps, mapDispatchToProps)(User);
