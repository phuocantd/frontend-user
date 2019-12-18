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
  Rate
} from 'antd';
import { connect } from 'react-redux';
import moment from 'moment';
import TextArea from 'antd/lib/input/TextArea';
import services from '../../api/services';
import './ContractDetail.css';

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
      value: ''
    };
  }

  componentDidMount() {
    const {
      token,
      match: { params }
    } = this.props;
    services.contract.getDetailContract(token, params.id).then(response => {
      if (response.success) {
        if (response.data.status === 'Happening') {
          steps[2].title = 'Accepted';
          steps[2].icon = 'check-circle';
          this.setState({ current: 3 });
        }
        if (
          response.data.status === 'Requesting' ||
          response.data.status === 'Canceled'
        ) {
          this.setState({ current: 2 });
        }
        if (response.data.status === 'Completed') {
          this.setState({ current: 4 });
        }
        this.setState({ data: response.data });
      } else {
        message.error(response.error);
      }
    });
  }

  render() {
    const { user } = this.props;
    const { current, data, submitting, value } = this.state;
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
            <Badge status="processing" text={data.status} />
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
        <Rate allowHalf defaultValue={2.5} />
        <Comment
          avatar={<Avatar src={user.avatar} alt={user.name} />}
          content={
            <Editor
              onChange={this.handleChange}
              onSubmit={this.handleSubmit}
              submitting={submitting}
              value={value}
            />
          }
        />
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
