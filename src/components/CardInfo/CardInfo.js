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
  Popover,
  message
} from 'antd';
import _ from 'lodash';
import ModalInfo from '../ModalInfo/ModalInfo';
import services from '../../api/services';

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

  handleCreateRoom = (event, id) => {
    event.stopPropagation();
    const { token } = this.props;
    // this.setState({
    //   isLoading: true
    // });
    services.chat
      .createRoom(token, { tutor: id })
      .then(response => {
        // this.setState({
        //   isLoading: false
        // });
        if (response.success) {
          message.success(
            'Create room success, now you can chat with this tutor'
          );
        } else {
          message.error(response.error);
        }
      })
      .catch(error => {
        // this.setState({
        //   isLoading: false
        // });
        if (error.response) {
          message.error(error.response.data.error);
        } else {
          message.error(error.message);
        }
      });
  };

  getAddress = address => {
    let res = 'Unknown';
    if (address) {
      const arrAddress = address.split(', ');
      if (arrAddress.length > 1) {
        res = arrAddress.pop();
      } else {
        res = `${address.substring(0, 10)}...`;
      }
    }
    return res;
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
            title={userInfo.name}
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
            <Col span={12}>{this.getAddress(userInfo.address)}</Col>
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
              <Button
                type="primary"
                size="small"
                onClick={e => this.handleCreateRoom(e, data._id)}
              >
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
