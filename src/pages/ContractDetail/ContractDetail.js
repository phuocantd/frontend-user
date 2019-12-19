import React, { Component } from 'react';
import {
  Layout,
  Steps,
  message,
  Descriptions,
  Badge,
  Icon,
  Statistic,
  Comment,
  Avatar,
  Form,
  Button,
  Rate,
  Spin,
  Input
} from 'antd';
import _ from 'lodash';
import { connect } from 'react-redux';
import moment from 'moment';
import services from '../../api/services';
import './ContractDetail.css';

const { TextArea } = Input;
const { Step } = Steps;
const steps = [
  {
    title: 'Create contracts',
    icon: 'form'
  },
  {
    title: 'Checkout',
    icon: 'transaction'
  },
  {
    title: 'Requesting',
    icon: 'loading'
  },
  {
    title: 'Happening',
    icon: 'schedule'
  },
  {
    title: 'Completed',
    icon: 'smile-o'
  }
];

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <div>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button
        htmlType="submit"
        loading={submitting}
        onClick={onSubmit}
        type="primary"
      >
        Add Review
      </Button>
    </Form.Item>
  </div>
);

class ContractDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 2,
      data: {},
      submitting: false,
      review: '',
      rating: 0,
      isLoading: true
    };
  }

  componentDidMount() {
    const {
      token,
      match: { params }
    } = this.props;
    this.setState({ isLoading: true });
    services.contract
      .getDetailContract(token, params.id)
      .then(response => {
        this.setState({ isLoading: false });
        if (response.success) {
          if (response.data.status === 'Happening') {
            steps[2] = {
              title: 'Accepted',
              icon: 'check-circle'
            };
            this.setState({ current: 3 });
          }
          if (response.data.status === 'Requesting') {
            steps[2] = {
              title: 'Requesting',
              icon: 'loading'
            };
            this.setState({ current: 2 });
          }
          if (response.data.status === 'Canceled') {
            steps[2].title = 'Canceled';
            steps[2].icon = 'close-circle';
            this.setState({ current: 2 });
          }
          if (response.data.status === 'Completed') {
            this.setState({ current: 4 });
          }
          this.setState({ data: response.data });
        } else {
          message.error(response.error);
        }
      })
      .catch(() => {
        this.setState({ isLoading: false });
      });
  }

  handleChange = e => {
    this.setState({
      review: e.target.value
    });
  };

  handleSubmit = () => {
    const { token } = this.props;
    const { review, data } = this.state;
    let { rating } = this.state;
    if (typeof data.rating !== 'undefined') {
      rating = data.rating;
    }
    if (rating <= 0) {
      message.error('Please rate your tutor greater than 1 star');
      return;
    }
    if (_.isEmpty(review)) {
      message.error('Please write your review before submitting');
      return;
    }
    this.setState({ submitting: true });
    const dataUpdate = {
      status: 'Completed',
      isSuccess: true,
      rating: `${rating}`,
      review
    };
    services.contract
      .updateContract(token, data._id, dataUpdate)
      .then(response => {
        this.setState({ submitting: false });
        if (response.success) {
          const changeData = _.clone(data);
          changeData.rating = dataUpdate.rating;
          changeData.review = dataUpdate.review;
          this.setState({ data: changeData });
        }
      })
      .catch(err => {
        this.setState({ submitting: false });
        if (err.response) {
          message.error(err.response.data.error);
        } else {
          message.error(err.message);
        }
      });
  };

  render() {
    const { current, data, submitting, review, rating, isLoading } = this.state;
    const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
    let status = 'default';
    switch (data.status) {
      case 'Canceled':
        status = 'error';
        break;
      case 'Completed':
        status = 'success';
        break;
      case 'Happening':
      case 'Requesting':
        status = 'processing';
        break;
      default:
        status = 'default';
    }
    let detailForm;
    if (data.status === 'Completed') {
      detailForm = (
        <Descriptions title="Contract Info" bordered>
          <Descriptions.Item label="Id">{data._id}</Descriptions.Item>
          <Descriptions.Item label="Title" span={2}>
            {data.title}
          </Descriptions.Item>
          <Descriptions.Item label="Tutor">
            {(data.tutor && data.tutor.userInfo.name) || 'Unknown'}
          </Descriptions.Item>
          <Descriptions.Item label="Email" span={2}>
            {(data.tutor && data.tutor.userInfo.email) || 'Unknown'}
          </Descriptions.Item>
          <Descriptions.Item label="Student">
            {(data.student && data.student.userInfo.name) || 'Unknown'}
          </Descriptions.Item>
          <Descriptions.Item label="Email" span={2}>
            {(data.student && data.student.userInfo.email) || 'Unknown'}
          </Descriptions.Item>
          <Descriptions.Item label="Created at">
            {moment(data.createdAt).format('YYYY-MM-DD HH:mm:ss')}
          </Descriptions.Item>
          <Descriptions.Item label="Updated at" span={2}>
            {moment(data.updatedAt).format('YYYY-MM-DD HH:mm:ss')}
          </Descriptions.Item>
          <Descriptions.Item label="Status" span={3}>
            <Badge status={status} text={data.status} />
          </Descriptions.Item>
          <Descriptions.Item label="Rent hours">
            {data.rentHours}
          </Descriptions.Item>
          <Descriptions.Item label="Amount" span={2}>
            <Statistic value={data.contractAmount} />
          </Descriptions.Item>
          <Descriptions.Item label="Description" span={3}>
            {data.description}
          </Descriptions.Item>
          <Descriptions.Item label="Rating" span={3}>
            <Rate
              allowHalf
              onChange={val => this.setState({ rating: val })}
              value={data.rating || rating}
              disabled={typeof data.rating !== 'undefined'}
            />
          </Descriptions.Item>
          <Descriptions.Item label="Review" span={3}>
            <Comment
              avatar={
                <Avatar
                  src={
                    (data.student && data.student.userInfo.avatar) || 'Unknown'
                  }
                />
              }
              author={(data.student && data.student.userInfo.name) || 'Unknown'}
              content={
                _.isEmpty(data.review) ? (
                  <Editor
                    onChange={this.handleChange}
                    onSubmit={this.handleSubmit}
                    submitting={submitting}
                    value={review}
                  />
                ) : (
                  data.review
                )
              }
            />
          </Descriptions.Item>
        </Descriptions>
      );
    } else {
      detailForm = (
        <Descriptions title="Contract Info" bordered>
          <Descriptions.Item label="Id">{data._id}</Descriptions.Item>
          <Descriptions.Item label="Title" span={2}>
            {data.title}
          </Descriptions.Item>
          <Descriptions.Item label="Tutor">
            {(data.tutor && data.tutor.userInfo.name) || 'Unknown'}
          </Descriptions.Item>
          <Descriptions.Item label="Email" span={2}>
            {(data.tutor && data.tutor.userInfo.email) || 'Unknown'}
          </Descriptions.Item>
          <Descriptions.Item label="Student">
            {(data.student && data.student.userInfo.name) || 'Unknown'}
          </Descriptions.Item>
          <Descriptions.Item label="Email" span={2}>
            {(data.student && data.student.userInfo.email) || 'Unknown'}
          </Descriptions.Item>
          <Descriptions.Item label="Created at">
            {moment(data.createdAt).format('YYYY-MM-DD HH:mm:ss')}
          </Descriptions.Item>
          <Descriptions.Item label="Updated at" span={2}>
            {moment(data.updatedAt).format('YYYY-MM-DD HH:mm:ss')}
          </Descriptions.Item>
          <Descriptions.Item label="Status" span={3}>
            <Badge status={status} text={data.status} />
          </Descriptions.Item>
          <Descriptions.Item label="Rent hours">
            {data.rentHours}
          </Descriptions.Item>
          <Descriptions.Item label="Amount" span={2}>
            <Statistic value={data.contractAmount} />
          </Descriptions.Item>
          <Descriptions.Item label="Description" span={3}>
            {data.description}
          </Descriptions.Item>
        </Descriptions>
      );
    }
    return (
      <Layout className="contractDetailLayout">
        <Steps
          current={current}
          className="contractDetailStep"
          status={data.status === 'Canceled' ? 'error' : 'process'}
        >
          {steps.map((item, idx) => {
            if (idx >= current) {
              return (
                <Step
                  key={item.title}
                  title={item.title}
                  icon={<Icon type={item.icon} />}
                />
              );
            }
            return <Step key={item.title} title={item.title} />;
          })}
        </Steps>
        <Spin spinning={isLoading} indicator={antIcon}>
          {detailForm}
        </Spin>
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.user.token,
    user: state.user.user
  };
};

export default connect(mapStateToProps)(ContractDetail);
