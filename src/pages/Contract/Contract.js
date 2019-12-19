import React, { Component } from 'react';
import { Layout, Tag, Statistic, Table } from 'antd';
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
    render: () => (
      <span>
        <Link
          to="/dashboard/complaint/create"
          onClick={e => e.stopPropagation()}
        >
          Complaint
        </Link>
      </span>
    )
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
        }
      })
      .catch(() => {
        this.setState({ isLoading: false });
      });
  }

  render() {
    const { history, match } = this.props;
    const { path } = match;
    const { contracts, isLoading } = this.state;
    return (
      <Layout className="contractLayout">
        <Table
          columns={columns}
          dataSource={contracts}
          rowKey="_id"
          className="contractTable"
          loading={isLoading}
          onRow={record => {
            return {
              onClick: () => {
                history.push(`${path}/${record._id}`);
              } // click row
            };
          }}
        />
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.user.token
  };
};

export default connect(mapStateToProps)(Contract);
