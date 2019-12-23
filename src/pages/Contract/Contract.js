import React, { Component } from 'react';
import { Layout, Tag, Statistic, Table, message } from 'antd';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import services from '../../api/services';
import './Contract.css';

const columns = [
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title'
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: tag => {
      let color = 'geekblue';
      if (tag === 'Completed') {
        color = 'green';
      }
      if (tag === 'Canceled') {
        color = 'volcano';
      }
      if (tag === 'Happening') {
        color = 'gold';
      }
      return (
        <span>
          <Tag color={color} key={tag}>
            {tag.toUpperCase()}
          </Tag>
        </span>
      );
    }
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
    ellipsis: true
  },
  {
    title: 'Tutor',
    dataIndex: 'tutor.userInfo.name',
    key: 'tutor'
  },
  {
    title: 'Student',
    dataIndex: 'student.userInfo.name',
    key: 'student'
  },
  {
    title: 'Rent Hours',
    dataIndex: 'rentHours',
    key: 'rentHours'
  },
  {
    title: 'Contract Amount',
    dataIndex: 'contractAmount',
    key: 'contractAmount',
    render: amount => <Statistic value={amount} />
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) =>
      record.status === 'Happening' ? (
        <span>
          <Link
            to={`/dashboard/complaint/create/${record._id}`}
            onClick={e => e.stopPropagation()}
          >
            Complaint
          </Link>
        </span>
      ) : null
  }
];
const columnsTutor = [
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title'
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: tag => {
      let color = 'geekblue';
      if (tag === 'Completed') {
        color = 'green';
      }
      if (tag === 'Canceled') {
        color = 'volcano';
      }
      if (tag === 'Happening') {
        color = 'gold';
      }
      return (
        <span>
          <Tag color={color} key={tag}>
            {tag.toUpperCase()}
          </Tag>
        </span>
      );
    }
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
    ellipsis: true
  },
  {
    title: 'Tutor',
    dataIndex: 'tutor.userInfo.name',
    key: 'tutor'
  },
  {
    title: 'Student',
    dataIndex: 'student.userInfo.name',
    key: 'student'
  },
  {
    title: 'Rent Hours',
    dataIndex: 'rentHours',
    key: 'rentHours'
  },
  {
    title: 'Contract Amount',
    dataIndex: 'contractAmount',
    key: 'contractAmount',
    render: amount => <Statistic value={amount} />
  }
];
class Contract extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contracts: [],
      isLoading: true
    };
  }

  componentDidMount() {
    const { token } = this.props;
    this.setState({ isLoading: true });
    services.contract
      .getContracts(token)
      .then(response => {
        this.setState({ isLoading: false });
        if (response.success) {
          this.setState({ contracts: response.data.results });
        } else {
          message.error(response.error);
        }
      })
      .catch(err => {
        this.setState({ isLoading: false });
        if (err.response) {
          message.error(err.response.data.error);
        } else {
          message.error(err.message);
        }
      });
  }

  render() {
    const { history, match, role } = this.props;
    const { path } = match;
    const { contracts, isLoading } = this.state;
    let currentColumn;
    if (role !== 'student') {
      currentColumn = columnsTutor;
    } else {
      currentColumn = columns;
    }
    return (
      <Layout className="contractLayout">
        <Table
          columns={currentColumn}
          dataSource={contracts}
          rowKey="_id"
          className="contractTable"
          loading={isLoading}
          onRow={record => {
            return {
              onClick: () => {
                history.push(`${path}/${record._id}`);
              }
            };
          }}
        />
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.user.token,
    role: state.user.user.role
  };
};

export default connect(mapStateToProps)(Contract);
