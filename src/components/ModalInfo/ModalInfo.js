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
  Rate,
  List
} from 'antd';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import Meta from 'antd/lib/card/Meta';

const { Paragraph, Title } = Typography;
class ModalInfo extends PureComponent {
  handleHire = () => {
    const { history, data } = this.props;
    history.push(`/dashboard/contract/create/${data._id}`);
  };

  render() {
    const { visible, handleCancel, data } = this.props;
    const { userInfo, histories } = data;
    return (
      <Modal
        visible={visible}
        closable
        onCancel={handleCancel}
        okText="Hire"
        onOk={() => this.handleHire()}
      >
        <Meta
          avatar={<Avatar size={64} src={userInfo.avatar} />}
          title={userInfo.name}
          description={data.specialization.name}
        />
        <Row type="flex" gutter={16} align="middle" justify="center">
          <Col span={12}>
            <Statistic value={data.paymentPerHour} suffix="/hr" />
          </Col>
          <Col span={12}>
            {(userInfo.address && userInfo.address.split(', ').pop()) ||
              'Unknown'}
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
        {histories ? (
          <List
            itemLayout="vertical"
            style={{ height: 200, overflow: 'scroll' }}
            dataSource={histories.filter(item => {
              return (
                item.status === 'Completed' &&
                item.review &&
                typeof item.rating !== 'undefined'
              );
            })}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src={item.student.userInfo.avatar} />}
                  title={
                    <div>
                      {item.student.userInfo.name}
                      <Rate
                        value={item.rating}
                        disabled
                        style={{ float: 'right', marginRight: 10 }}
                      />
                    </div>
                  }
                  description={item.review}
                />
              </List.Item>
            )}
          />
        ) : null}
      </Modal>
    );
  }
}

export default withRouter(ModalInfo);
