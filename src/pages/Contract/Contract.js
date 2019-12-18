import React, { Component } from 'react';
import { Layout, Tag, Typography, Statistic, Table } from 'antd';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import services from '../../api/services';
import './Contract.css';

const { Paragraph } = Typography;
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
    render: desc => (
      <Paragraph ellipsis style={{ width: 200 }}>
        {desc}
      </Paragraph>
    )
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
        <Link to="/dashboard/complaint/create">Complaint</Link>
      </span>
    )
  }
];
class Contract extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contracts: []
    };
  }

  componentDidMount() {
    const { token } = this.props;
    services.contract.getContracts(token).then(response => {
      if (response.success) {
        this.setState({ contracts: response.data.results });
      }
    });
  }

  render() {
    const { contracts } = this.state;
    return (
      <Layout className="contractLayout">
        <Table
          columns={columns}
          dataSource={contracts}
          rowKey="_id"
          className="contractTable"
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
