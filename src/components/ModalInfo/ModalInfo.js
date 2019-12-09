import React, { PureComponent } from 'react';
import {
  Modal,
  Avatar,
  Row,
  Col,
  Statistic,
  Divider,
  Tag,
  Typography
} from 'antd';
import { Link } from 'react-router-dom';
import Meta from 'antd/lib/card/Meta';

const { Paragraph, Title } = Typography;
export default class ModalInfo extends PureComponent {
  render() {
    const { visible, handleCancel, data } = this.props;
    return (
      <Modal visible={visible} closable footer={null} onCancel={handleCancel}>
        <Meta
          avatar={<Avatar size={64} src={data.Avatar} />}
          title={<Link to="/profile">{data.Name}</Link>}
          description={data.Specialization}
        />
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
        <Title level={4}>Overview</Title>
        <Paragraph ellipsis={{ rows: 3, expandable: true }}>
          {data.SelfIntroduction}
        </Paragraph>
        <Row>
          {data.Tags.map(tag => (
            <Tag>{tag}</Tag>
          ))}
        </Row>
        <Title level={4}>Work History & Feedback</Title>
      </Modal>
    );
  }
}
