import React, { Component } from 'react';
import { Form, Input, Button, message } from 'antd';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './ComplaintForm.css';
import services from '../../api/services';

const { TextArea } = Input;
class ComplaintForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submmiting: false
    };
  }

  handleSubmit = e => {
    const { form, token, history } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.setState({ submmiting: true });
        services.complaint
          .createComplaint(token, values)
          .then(response => {
            this.setState({ submmiting: false });
            if (response.success) {
              message.success('Create complaint successfully');
              message.info('Waiting for response from admin');
              history.push(`/dashboard/complaint`);
            } else {
              message.error(response.error);
            }
          })
          .catch(error => {
            this.setState({ submmiting: false });
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
    const {
      form,
      match: { params }
    } = this.props;
    const { submmiting } = this.state;
    const { getFieldDecorator } = form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 }
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
        className="complaintForm"
      >
        <Form.Item label="Title">
          {getFieldDecorator('title', {
            rules: [
              {
                required: true,
                message: 'Please input your title of complaint'
              }
            ]
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Contract">
          {getFieldDecorator('contract', {
            rules: [
              {
                required: true,
                message: 'Please input your title of complaint'
              }
            ],
            initialValue: params.id
          })(<Input readOnly />)}
        </Form.Item>
        <Form.Item label="Desciption" hasFeedback>
          {getFieldDecorator('description', {
            rules: [
              {
                required: true,
                message: 'Please input your description'
              }
            ]
          })(<TextArea rows={4} />)}
        </Form.Item>
        <Form.Item wrapperCol={tailFormItemLayout.wrapperCol}>
          <Button type="primary" htmlType="submit" loading={submmiting}>
            Send to admin
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.user.token
  };
};

export default withRouter(
  connect(mapStateToProps)(
    Form.create({ name: 'complaint_form' })(ComplaintForm)
  )
);
