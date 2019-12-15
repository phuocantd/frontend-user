import React, { PureComponent } from 'react';
import {
  Modal,
  Avatar,
  Row,
  Col,
  Statistic,
  Divider,
  Tag,
  Typography,
  Rate
} from 'antd';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import Meta from 'antd/lib/card/Meta';

const { Paragraph, Title } = Typography;
export default class ModalInfo extends PureComponent {
  render() {
    const { visible, handleCancel, data } = this.props;
    const { userInfo } = data;
    return (
      <Modal visible={visible} closable footer={null} onCancel={handleCancel}>
        <Meta
          avatar={<Avatar size={64} src={userInfo.avatar} />}
          title={<Link to="/profile">{userInfo.name}</Link>}
          description={data.specialization.name}
        />
        <Row type="flex" gutter={16} align="middle" justify="center">
          <Col span={12}>
            <Statistic value={data.paymentPerHour} suffix="/hr" />
          </Col>
          <Col span={12}>
            <span role="img" aria-label="China">
              🇨🇳
            </span>
            China
          </Col>
        </Row>
        <Divider style={{ marginTop: 10, marginBottom: 10 }} />
        <Title level={4}>Overview</Title>
        <Paragraph ellipsis={{ rows: 3, expandable: true }}>
          {data.selfIntro}
        </Paragraph>
        <Row>
          {data.tags
            .filter(tag => tag.isActive)
            .map(tag => (
              <Tag key={_.uniqueId('tag_')}>{tag.name}</Tag>
            ))}
        </Row>
        <Title level={4}>Work history & feedback</Title>
        <Rate allowHalf defaultValue={data.averageRating} disabled />
      </Modal>
    );
  }
}
