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
  Input,
  Popconfirm,
  Typography
} from 'antd';
import _ from 'lodash';
import { connect } from 'react-redux';
import moment from 'moment';
import services from '../../api/services';
import './ContractDetail.css';

const { TextArea } = Input;
const { Step } = Steps;
const { Paragraph } = Typography;
const ButtonGroup = Button.Group;
const steps = [
  {
    title: 'Create contracts',
    icon: 'form'
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
      current: 1,
      data: {},
      submitting: false,
      confirming: false,
      review: '',
      rating: 0,
      isLoading: false
    };
  }

  componentDidMount() {
    const {
      match: { params }
    } = this.props;
    this.fetchDetailContract(params.id);
  }

  fetchDetailContract = id => {
    const { token, history } = this.props;
    this.setState({ isLoading: true });
    services.contract
      .getDetailContract(token, id)
      .then(response => {
        this.setState({ isLoading: false });
        if (response.success) {
          if (response.data.status === 'Happening') {
            steps[1] = {
              title: 'Accepted',
              icon: 'check-circle'
            };
            this.setState({ current: 2 });
          }
          if (response.data.status === 'Complaining') {
            steps[1] = {
              title: 'Accepted',
              icon: 'check-circle'
            };
            steps[2] = {
              title: 'Complaining',
              icon: 'exclamation-circle'
            };
            this.setState({ current: 2 });
          }
          if (response.data.status === 'Requesting') {
            steps[1] = {
              title: 'Requesting',
              icon: 'loading'
            };
            this.setState({ current: 1 });
          }
          if (response.data.status === 'Canceled') {
            steps[1] = {
              title: 'Canceled',
              icon: 'close-circle'
            };
            this.setState({ current: 1 });
          }
          if (response.data.status === 'Completed') {
            steps[1] = {
              title: 'Requesting',
              icon: 'loading'
            };
            steps[2] = {
              title: 'Happening',
              icon: 'schedule'
            };
            this.setState({ current: 3 });
          }
          this.setState({ data: response.data });
        } else {
          message.error(response.error);
          history.push('/dashboard/contract');
        }
      })
      .catch(err => {
        this.setState({ isLoading: false });
        if (err.response) {
          message.error(err.response.data.error);
        } else {
          message.error(err.message);
        }
        history.push('/dashboard/contract');
      });
  };

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

  handleConfirm = status => {
    this.setState({ confirming: true });
    const { token } = this.props;
    const { data } = this.state;
    const dataUpdate = {
      status
    };
    if (data._id) {
      services.contract
        .updateContract(token, data._id, dataUpdate)
        .then(response => {
          this.setState({ submitting: false });
          if (response.success) {
            const changeData = _.clone(data);
            changeData.status = status;
            if (response.data.status === 'Happening') {
              steps[1] = {
                title: 'Accepted',
                icon: 'check-circle'
              };
              this.setState({ current: 2 });
            }
            if (response.data.status === 'Canceled') {
              steps[1] = {
                title: 'Canceled',
                icon: 'close-circle'
              };
              this.setState({ current: 1 });
            }
            if (response.data.status === 'Completed') {
              steps[1] = {
                title: 'Requesting',
                icon: 'loading'
              };
              steps[2] = {
                title: 'Happening',
                icon: 'schedule'
              };
              this.setState({ current: 3 });
            }
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
    }
  };

  render() {
    const { user } = this.props;
    const {
      current,
      data,
      submitting,
      review,
      rating,
      isLoading,
      confirming
    } = this.state;
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
    let confirmForm;
    if (data.status === 'Requesting') {
      confirmForm = (
        <Descriptions.Item label="Confirm" span={2}>
          <ButtonGroup>
            {user.role !== 'student' ? (
              <Popconfirm
                title="Are you sure accept this contract?"
                onConfirm={() => this.handleConfirm('Happening')}
              >
                <Button type="primary" loading={confirming}>
                  Accept
                </Button>
              </Popconfirm>
            ) : null}
            <Popconfirm
              title="Are you sure cancel this contract?"
              onConfirm={() => this.handleConfirm('Canceled')}
            >
              <Button type="danger" loading={confirming}>
                Cancel
              </Button>
            </Popconfirm>
          </ButtonGroup>
        </Descriptions.Item>
      );
    } else if (user.role === 'student' && data.status === 'Happening') {
      confirmForm = (
        <Descriptions.Item label="Confirm" span={2}>
          <Popconfirm
            title="Are you sure complete this contract?"
            onConfirm={() => this.handleConfirm('Completed')}
          >
            <Button type="primary" loading={confirming}>
              Make Completed
            </Button>
          </Popconfirm>
        </Descriptions.Item>
      );
    } else {
      confirmForm = null;
    }
    if (data && data.status === 'Completed') {
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
            {data.description &&
              data.description
                .split('\n')
                .map(desc => <Paragraph>{desc}</Paragraph>)}
          </Descriptions.Item>
          <Descriptions.Item label="Rating" span={3}>
            <Rate
              allowHalf
              onChange={val => this.setState({ rating: val })}
              value={data.rating || rating}
              disabled={
                typeof data.rating !== 'undefined' || user.role !== 'student'
              }
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
                _.isEmpty(data.review) && user.role === 'student' ? (
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
          <Descriptions.Item
            label="Status"
            span={
              data.status === 'Requesting' ||
              (user.role === 'student' && data.status === 'Happening')
                ? 1
                : 3
            }
          >
            <Badge status={status} text={data.status} />
          </Descriptions.Item>
          {confirmForm}
          <Descriptions.Item label="Rent hours">
            {data.rentHours}
          </Descriptions.Item>
          <Descriptions.Item label="Amount" span={2}>
            <Statistic value={data.contractAmount} />
          </Descriptions.Item>
          <Descriptions.Item label="Description" span={3}>
            {data.description &&
              data.description
                .split('\n')
                .map(desc => <Paragraph>{desc}</Paragraph>)}
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
