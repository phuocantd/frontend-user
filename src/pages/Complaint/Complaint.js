import React, { Component } from 'react';
import { Layout, Tag, Table } from 'antd';
import { connect } from 'react-redux';
import services from '../../api/services';
import './Complaint.css';

const columns = [
  {
    title: 'Contract',
    dataIndex: 'contract',
    key: 'contract'
  },
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
  }
];
class Complaint extends Component {
  constructor(props) {
    super(props);
    this.state = {
      complaints: [],
      isLoading: true
    };
  }

  componentDidMount() {
    const { token } = this.props;
    this.setState({ isLoading: true });
    services.complaint
      .getComplaints(token)
      .then(response => {
        this.setState({ isLoading: false });
        if (response.success) {
          this.setState({ complaints: response.data.results });
        }
      })
      .catch(() => {
        this.setState({ isLoading: false });
      });
  }

  render() {
    const { complaints, isLoading } = this.state;
    return (
      <Layout className="complaintLayout">
        <Table
          columns={columns}
          dataSource={complaints}
          rowKey="_id"
          className="complaintTable"
          loading={isLoading}
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

export default connect(mapStateToProps)(Complaint);
