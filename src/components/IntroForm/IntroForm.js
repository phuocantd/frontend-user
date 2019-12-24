import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Button, Select, InputNumber, message } from 'antd';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import _ from 'lodash';
import services from '../../api/services';
import { updateTutorInfo } from '../../actions/user';

const { Option } = Select;
class IntroForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      selfIntro: ''
    };
  }

  handleSubmit = e => {
    const { form, token, updateTutorInformation } = this.props;
    const { selfIntro } = this.state;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.setState({ isLoading: true });
        services.user
          .updateTutorInfo(
            values.price,
            values.specialization,
            values.tags,
            selfIntro,
            token
          )
          .then(response => {
            this.setState({ isLoading: false });
            if (response.success) {
              message.success('Infomation changed successfully');
              const tutorInfo = {
                tags: response.data.tags,
                paymentPerHour: response.data.paymentPerHour,
                selfIntro: response.data.selfIntro,
                specialization: response.data.specialization
              };
              updateTutorInformation(tutorInfo);
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

  render() {
    const { form, tutorInfo, tags, specializations } = this.props;
    const { isLoading } = this.state;
    const { getFieldDecorator } = form;
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
      <Form onSubmit={this.handleSubmit}>
        <Form.Item label="Price" style={{ width: 350 }}>
          {getFieldDecorator('price', {
            rules: [
              {
                required: true,
                message: 'Please input your price per hours'
              }
            ],
            initialValue: tutorInfo.paymentPerHour
          })(
            <InputNumber
              style={{ width: '100%' }}
              min={20}
              max={10000}
              formatter={value =>
                `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              }
              parser={value => value.replace(/\$\s?|(,*)/g, '')}
            />
          )}
        </Form.Item>
        <Form.Item label="Specialization" style={{ width: 350 }}>
          {getFieldDecorator('specialization', {
            rules: [
              {
                required: true,
                message: 'Please choose your specialization'
              }
            ],
            initialValue: tutorInfo.specialization._id
          })(
            <Select
              style={{ width: '100%' }}
              placeholder="Select specialization"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              {specializations.map(specialization => (
                <Option value={specialization._id} key={_.uniqueId('option_')}>
                  {specialization.name}
                </Option>
              ))}
            </Select>
          )}
        </Form.Item>
        <Form.Item label="Skill">
          {getFieldDecorator('tags', {
            rules: [
              {
                required: true,
                message: 'Please choose your skills'
              }
            ],
            initialValue: tutorInfo.tags.map(tag => tag._id) || []
          })(
            <Select
              mode="multiple"
              style={{ width: '100%' }}
              placeholder="Select tags"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              {tags.map(tag => (
                <Option value={tag._id} key={_.uniqueId('option_')}>
                  {tag.name}
                </Option>
              ))}
            </Select>
          )}
        </Form.Item>
        <Form.Item label="Introduction">
          {getFieldDecorator('selfIntro', {
            rules: [
              {
                required: true,
                message: 'Please write some text intro about you'
              }
            ]
          })(
            <CKEditor
              editor={ClassicEditor}
              config={{
                toolbar: [
                  'heading',
                  '|',
                  'bold',
                  'italic',
                  'link',
                  'bulletedList',
                  'numberedList',
                  '|',
                  'blockQuote',
                  'undo',
                  'redo'
                ]
              }}
              data={tutorInfo.selfIntro}
              onChange={(event, editor) => {
                const data = editor.getData();
                this.setState({ selfIntro: data });
              }}
            />
          )}
        </Form.Item>
        <Form.Item wrapperCol={tailFormItemLayout.wrapperCol}>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Update
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const mapDispatchtoProps = dispatch => {
  return {
    updateTutorInformation: item => {
      dispatch(updateTutorInfo(item));
    }
  };
};

export default connect(
  null,
  mapDispatchtoProps
)(Form.create({ name: 'intro_form' })(IntroForm));
