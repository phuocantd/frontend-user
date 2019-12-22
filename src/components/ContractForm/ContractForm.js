import React, { Component } from 'react';
import {
  Form,
  Input,
  Button,
  Avatar,
  message,
  Statistic,
  List,
  DatePicker,
  Select,
  TimePicker,
  Skeleton
} from 'antd';
import moment from 'moment';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import './ContractForm.css';
import services from '../../api/services';

const { TextArea } = Input;
const { RangePicker } = DatePicker;
const { Option } = Select;
class ContractForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submmiting: false,
      rentHours: 0,
      weeks: 0,
      dayRate: 0,
      fromTime: {},
      toTime: {},
      dayStart: '',
      dayEnd: '',
      schedule: '',
      timeStart: '',
      timeEnd: '',
      tutor: {},
      isLoading: false
    };
  }

  componentDidMount() {
    const { id, history } = this.props;
    this.setState({ isLoading: true });
    services.tutor
      .getTutor(id)
      .then(response => {
        this.setState({ isLoading: false });
        if (response.success) {
          this.setState({ tutor: response.data });
        } else {
          history.push(`/dashboard/contract`);
        }
      })
      .catch(err => {
        this.setState({ isLoading: false });
        if (err.response) {
          message.error(err.response.data.error);
        } else {
          message.error(err.message);
        }
        history.push(`/dashboard/contract`);
      });
  }

  handleSubmit = e => {
    const { form, token, history } = this.props;
    const {
      tutor,
      dayStart,
      dayEnd,
      schedule,
      timeStart,
      timeEnd,
      rentHours
    } = this.state;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const data = {
          title: values.title,
          tutor: tutor._id,
          rentHours,
          description: `Time Interval: ${dayStart} - ${dayEnd}\n
          Schedule: ${schedule}\n
          Time: ${timeStart} - ${timeEnd}\n
          ${values.description}`
        };
        this.setState({ submmiting: true });
        services.contract
          .createContract(token, data)
          .then(response => {
            this.setState({ submmiting: false });
            if (response.success) {
              message.success('Create contract successfully');
              message.info('Waiting for response from tutor');
              history.push(`/dashboard/contract`);
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

  handleChangeTimeInterval = (dates, text) => {
    const duration = moment.duration(dates[1].diff(dates[0]));
    const weeks = Math.round(duration.asWeeks());
    this.setState({ weeks, dayStart: text[0], dayEnd: text[1] }, () =>
      this.calculateRentHours()
    );
  };

  handleChangeSchedule = value => {
    let dayRate = value;
    if (
      value === 'Monday, Wednesday, Friday' ||
      value === 'Tuesday, Thirstday, Saturday'
    ) {
      dayRate = 3;
    } else if (value === 'From Monday to Friday') {
      dayRate = 5;
    } else if (value === 'Saturday and Sunday') {
      dayRate = 2;
    } else {
      dayRate = 7;
    }
    this.setState({ dayRate, schedule: value }, () =>
      this.calculateRentHours()
    );
  };

  handleChangeFromTime = (times, text) => {
    this.setState({ fromTime: times, timeStart: text }, () =>
      this.calculateRentHours()
    );
  };

  handleChangeToTime = (times, text) => {
    this.setState({ toTime: times, timeEnd: text }, () =>
      this.calculateRentHours()
    );
  };

  calculateRentHours = () => {
    const { fromTime, toTime, weeks, dayRate } = this.state;
    if (!_.isEmpty(fromTime) && !_.isEmpty(toTime)) {
      const duration = moment.duration(toTime.diff(fromTime));
      const numHour = Math.round(duration.asHours());
      this.setState({ rentHours: weeks * dayRate * numHour });
    }
  };

  disabledDate = current => {
    // Can not select days before today and today
    return current && current < moment().endOf('day');
  };

  validateTimeInterval = (rule, value, callback) => {
    const duration = moment.duration(value[1].diff(value[0]));
    const numweek = Math.round(duration.asWeeks());
    if (value && numweek < 1) {
      callback('Time interval must be greater than or equal one week');
    } else {
      callback();
    }
  };

  validateFromTime = (rule, value, callback) => {
    const { form } = this.props;
    const toTime = form.getFieldValue('toTime');
    if (toTime && value.isAfter(toTime)) {
      callback('Time start must before time end');
    } else {
      callback();
    }
  };

  validateToTime = (rule, value, callback) => {
    const { form } = this.props;
    const fromTime = form.getFieldValue('fromTime');
    if (fromTime && value.isBefore(fromTime)) {
      callback('Time end must after time start');
    } else {
      callback();
    }
  };

  render() {
    const { form } = this.props;
    const { submmiting, tutor, rentHours, isLoading } = this.state;
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
    const rangeConfig = {
      rules: [
        { type: 'array', required: true, message: 'Please select time!' },
        { validator: this.validateTimeInterval }
      ]
    };
    return (
      <Form
        labelCol={formItemLayout.labelCol}
        wrapperCol={formItemLayout.wrapperCol}
        onSubmit={this.handleSubmit}
        className="contractForm"
      >
        <Form.Item label="Title">
          {getFieldDecorator('title', {
            rules: [
              {
                required: true,
                message: 'Please input your title of contract'
              }
            ]
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Tutor">
          <List.Item key={tutor._id}>
            <Skeleton avatar title={false} loading={isLoading} active>
              <List.Item.Meta
                avatar={
                  <Avatar
                    src={(tutor.userInfo && tutor.userInfo.avatar) || ''}
                  />
                }
                title={(tutor.userInfo && tutor.userInfo.name) || 'Unknown'}
                description={
                  (tutor.specialization && tutor.specialization.name) ||
                  'Unknown'
                }
              />
              <Statistic value={tutor.paymentPerHour} suffix="/hr" />
            </Skeleton>
          </List.Item>
        </Form.Item>
        <Form.Item label="Time Interval" hasFeedback>
          {getFieldDecorator(
            'timeInterval',
            rangeConfig
          )(
            <RangePicker
              onChange={(dates, text) =>
                this.handleChangeTimeInterval(dates, text)
              }
              disabledDate={current => this.disabledDate(current)}
            />
          )}
        </Form.Item>
        <Form.Item label="Schedule" hasFeedback>
          {getFieldDecorator('schedule', {
            rules: [{ required: true, message: 'Please select your schedule!' }]
          })(
            <Select
              placeholder="Select a schedule"
              onChange={val => this.handleChangeSchedule(val)}
            >
              <Option value="Monday, Wednesday, Friday">
                Monday, Wednesday, Friday
              </Option>
              <Option value="Tuesday, Thirstday, Saturday">
                Tuesday, Thirstday, Saturday
              </Option>
              <Option value="From Monday to Friday">
                From Monday to Friday
              </Option>
              <Option value="Saturday and Sunday">Saturday and Sunday</Option>
              <Option value="All day in week">All day in week</Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item label="From time" hasFeedback>
          {getFieldDecorator('fromTime', {
            rules: [
              {
                type: 'object',
                required: true,
                message: 'Please select time!'
              },
              { validator: this.validateFromTime }
            ]
          })(
            <TimePicker
              onChange={(times, text) => this.handleChangeFromTime(times, text)}
              format="HH:mm"
            />
          )}
        </Form.Item>
        <Form.Item label="To time" hasFeedback>
          {getFieldDecorator('toTime', {
            rules: [
              {
                type: 'object',
                required: true,
                message: 'Please select time!'
              },
              { validator: this.validateToTime }
            ]
          })(
            <TimePicker
              onChange={(times, text) => this.handleChangeToTime(times, text)}
              format="HH:mm"
            />
          )}
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
        <Form.Item label="Total Amount" hasFeedback>
          <Statistic value={rentHours * tutor.paymentPerHour} />
        </Form.Item>
        <Form.Item wrapperCol={tailFormItemLayout.wrapperCol}>
          <Button type="primary" htmlType="submit" loading={submmiting}>
            Checkout
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
  connect(mapStateToProps)(Form.create({ name: 'contract_form' })(ContractForm))
);
