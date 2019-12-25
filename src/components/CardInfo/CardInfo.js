import React, { Component } from 'react';
import {
  Card,
  Avatar,
  Tag,
  Statistic,
  Col,
  Row,
  Divider,
  Button,
  Popover
} from 'antd';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import ModalInfo from '../ModalInfo/ModalInfo';

const { Meta } = Card;
export default class CardInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }

  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleOpen = () => {
    this.setState({ visible: true });
  };

  render() {
    const { data, loading } = this.props;
    const { userInfo } = data;
    const { visible } = this.state;
    return (
      <>
        <Card
          hoverable
          style={{ width: 300 }}
          onClick={() => this.handleOpen()}
          loading={loading}
        >
          <Meta
            avatar={<Avatar size={64} src={userInfo.avatar} />}
            title={<Link to="/profile">{userInfo.name}</Link>}
            description={data.specialization.name}
          />
          <Row>
            <Popover
              content="The percentage of this freelancer's jobs that resulted in a great client experience."
              title="JOB SUCCESS SCORE"
              overlayStyle={{ maxWidth: 200 }}
            >
              <b>{Math.round(data.successRate * 100)}% SUCCESS</b>
            </Popover>
          </Row>
          <Row type="flex" gutter={16} align="middle" justify="center">
            <Col span={12}>
              <Statistic value={data.paymentPerHour} suffix="/hr" />
            </Col>
            <Col span={12}>
              {(userInfo.address &&
                (userInfo.address.split(', ').pop() || userInfo.address)) ||
                'Unknown'}
            </Col>
          </Row>
          <Divider style={{ marginTop: 10, marginBottom: 10 }} />
          <Row>
            {data.tags
              .filter(tag => tag.isActive)
              .map(tag => (
                <Tag key={_.uniqueId('tag_')} className="marginVertical">
                  {tag.name}
                </Tag>
              ))}
          </Row>
          <Row style={{ marginTop: 10, marginBottom: 10 }} gutter={[16, 16]}>
            <Col span={10}>
              <Button
                type="primary"
                size="small"
                onClick={() => this.handleOpen()}
              >
                <b>View Profile</b>
              </Button>
            </Col>
            <Col span={10}>
              <Button type="primary" size="small">
                <b>Chat</b>
              </Button>
            </Col>
          </Row>
        </Card>
        <ModalInfo
          data={data}
          visible={visible}
          handleCancel={() => this.handleCancel()}
        />
      </>
    );
  }
}
