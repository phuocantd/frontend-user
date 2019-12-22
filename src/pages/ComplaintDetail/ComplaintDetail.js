import React, { Component } from 'react';
import {
  Layout,
  Steps,
  message,
  Descriptions,
  Badge,
  Icon,
  Button,
  Spin,
  Popconfirm,
  Typography
} from 'antd';
import _ from 'lodash';
import { connect } from 'react-redux';
import moment from 'moment';
import services from '../../api/services';
import './ComplaintDetail.css';

const { Step } = Steps;
const { Paragraph } = Typography;
const steps = [
  {
    title: 'Create complaint',
    icon: 'form'
  },
  {
    title: 'Processing',
    icon: 'loading'
  },
  {
    title: 'Completed',
    icon: 'smile-o'
  }
];

class ComplaintDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 1,
      data: {},
      confirming: false,
      isLoading: false
    };
  }

  componentDidMount() {
    const {
      match: { params }
    } = this.props;
    this.fetchDetailComplaint(params.id);
  }

  fetchDetailComplaint = id => {
    const { token, history } = this.props;
    this.setState({ isLoading: true });
    services.complaint
      .getDetailComplaint(token, id)
      .then(response => {
        this.setState({ isLoading: false });
        if (response.success) {
          if (response.data.status === 'Processing') {
            steps[1] = {
              title: 'Processing',
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
              title: 'Processing',
              icon: 'loading'
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

  handleConfirm = status => {
    const { token } = this.props;
    const { data } = this.state;
    const dataUpdate = {
      status
    };
    if (data._id) {
      this.setState({ confirming: true });
      services.complaint
        .updateComplaint(token, data._id, dataUpdate)
        .then(response => {
          this.setState({ confirming: false });
          if (response.success) {
            const changeData = _.clone(data);
            changeData.status = status;
            if (response.data.status === 'Canceled') {
              steps[1] = {
                title: 'Canceled',
                icon: 'close-circle'
              };
              this.setState({ current: 1 });
            }
            if (response.data.status === 'Completed') {
              steps[1] = {
                title: 'Processing',
                icon: 'loading'
              };
              this.setState({ current: 3 });
            }
            this.setState({ data: changeData });
          }
        })
        .catch(err => {
          this.setState({ confirming: false });
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
    const { current, data, isLoading, confirming } = this.state;
    const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
    let status = 'default';
    switch (data.status) {
      case 'Canceled':
        status = 'error';
        break;
      case 'Completed':
        status = 'success';
        break;
      case 'Processing':
        status = 'processing';
        break;
      default:
        status = 'default';
    }
    const confirmForm = (
      <Descriptions.Item label="Confirm" span={2}>
        <Popconfirm
          title="Are you sure cancel this complaint?"
          onConfirm={() => this.handleConfirm('Canceled')}
        >
          <Button type="danger" loading={confirming}>
            Cancel
          </Button>
        </Popconfirm>
      </Descriptions.Item>
    );
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
          <Descriptions title="Contract Info" bordered>
            <Descriptions.Item label="Id">{data._id}</Descriptions.Item>
            <Descriptions.Item label="Title" span={2}>
              {data.title}
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
                data.status === 'Processing' && user.role === 'student' ? 1 : 3
              }
            >
              <Badge status={status} text={data.status} />
            </Descriptions.Item>
            {data.status === 'Processing' && user.role === 'student'
              ? confirmForm
              : null}
            <Descriptions.Item label="Description" span={3}>
              {data.description &&
                data.description
                  .split('\n')
                  .map(desc => <Paragraph>{desc}</Paragraph>)}
            </Descriptions.Item>
          </Descriptions>
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

export default connect(mapStateToProps)(ComplaintDetail);
