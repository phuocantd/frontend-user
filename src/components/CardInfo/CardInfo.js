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
    const { data } = this.props;
    const { visible } = this.state;
    return (
      <>
        <Card
          hoverable
          style={{ width: 300 }}
          onClick={() => this.handleOpen()}
        >
          <Meta
            avatar={<Avatar size={64} src={data.Avatar} />}
            title={<Link to="/profile">{data.Name}</Link>}
            description={data.Specialization}
          />
          <Row>
            <Popover
              content="The percentage of this freelancer's jobs that resulted in a great client experience."
              title="JOB SUCCESS SCORE"
              overlayStyle={{ maxWidth: 200 }}
            >
              <b>{data.SuccessRating}% SUCCESS</b>
            </Popover>
          </Row>
          <Row type="flex" gutter={16} align="middle" justify="center">
            <Col span={12}>
              <Statistic value={data.PaymentPerHour} suffix="/hr" />
            </Col>
            <Col span={12}>
              <span role="img" aria-label="China">
                🇨🇳
              </span>
              China
            </Col>
          </Row>
          <Divider style={{ marginTop: 10, marginBottom: 10 }} />
          <Row>
            {data.Tags.map(tag => (
              <Tag key={_.uniqueId('tag_')} className="marginVertical">
                {tag}
              </Tag>
            ))}
          </Row>
          <Row style={{ marginTop: 10, marginBottom: 10 }}>
            <Button
              type="primary"
              size="small"
              onClick={() => this.handleOpen()}
            >
              <b>View Profile</b>
            </Button>
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
