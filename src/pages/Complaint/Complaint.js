import React, { Component } from 'react';
import { Layout, Tag, Typography, Table } from 'antd';
import { connect } from 'react-redux';
import services from '../../api/services';
import './Complaint.css';

const { Paragraph } = Typography;
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
    render: desc => (
      <Paragraph ellipsis style={{ width: 200 }}>
        {desc}
      </Paragraph>
    )
  }
];
class Complaint extends Component {
  constructor(props) {
    super(props);
    this.state = {
      complaints: []
    };
  }

  componentDidMount() {
    const { token } = this.props;
    services.complaint.getComplaints(token).then(response => {
      if (response.success) {
        this.setState({ complaints: response.data.results });
      }
    });
  }

  render() {
    const { complaints } = this.state;
    return (
      <Layout className="complaintLayout">
        <Table
          columns={columns}
          dataSource={complaints}
          rowKey="_id"
          className="complaintTable"
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
