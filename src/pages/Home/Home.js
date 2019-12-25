import React, { Component } from 'react';
import {
  Layout,
  Icon,
  Button,
  message,
  Row,
  Col,
  Card,
  Avatar,
  Typography,
  Popover
} from 'antd';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Hero,
  Flex,
  MacWindow,
  Box,
  ScrollDownIndicator,
  Feature,
  Heading,
  Subhead,
  Section,
  Checklist,
  Contributor
} from 'react-landing-page';
import _ from 'lodash';
import './Home.css';
import services from '../../api/services';

const { Content } = Layout;
const { Text } = Typography;
const image1 = require('../../assets/images/image1.jpg');
const user2 = require('../../assets/images/user2.png');

const sample = {
  _id: 0,
  tags: [],
  userInfo: {
    _id: 0,
    avatar: '',
    isActive: true,
    email: '',
    name: 'Unknown',
    role: 'tutor',
    address: 'Unknown'
  },
  averageRating: 0,
  paymentPerHour: 0,
  selfIntro: '',
  specialization: {
    _id: 0,
    isActive: true,
    name: ''
  },
  successRate: 0
};
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tutors: [],
      isRequest: false
    };
  }

  componentDidMount() {
    this.setState({ isRequest: true });
    services.tutor
      .getTopTutor()
      .then(response => {
        this.setState({ isRequest: false });
        if (response.success) {
          this.setState({ tutors: response.data.results });
        }
      })
      .catch(err => {
        this.setState({ isRequest: false });
        if (err.response) {
          message.error(err.response.data.error);
        } else {
          message.error(err.message);
        }
      });
  }

  render() {
    const { isLoggedIn } = this.props;
    const { tutors, isRequest } = this.state;
    const listCheck = [
      'Thoundsands of tutor',
      'From every where',
      'A lot of experiences'
    ];
    let dataTutor = tutors;
    if (isRequest) {
      dataTutor = Array.from(Array(8), () => sample);
    }
    if (isLoggedIn) {
      return <Redirect to="/dashboard" />;
    }
    return (
      <Layout className="homeLayout">
        <Content className="homeContent">
          <Hero bg="white" bgOpacity={0.5}>
            <Flex flexWrap="wrap" alignItems="center">
              <Flex alignItems="flex-start" width={[1, 1, 1 / 2]} p={3}>
                <MacWindow
                  style={{ transform: 'translate(32px, 0px)' }}
                  src={image1}
                />
              </Flex>
              <Box width={[1, 1, 1 / 2]} p={3}>
                <Heading textAlign="center">WELCOME</Heading>
                <Subhead textAlign="center">Connect student with tutor</Subhead>
                <Flex mt={3} flexWrap="wrap" justifyContent="center">
                  <Link to="/login">
                    <Button type="primary">
                      <b>GETTING STARTED</b>
                    </Button>
                  </Link>
                </Flex>
              </Box>
            </Flex>
            <ScrollDownIndicator />
          </Hero>
          <Flex flexWrap="wrap" justifyContent="center">
            <Feature
              icon={<Icon type="user" />}
              description="Thoundsand of tutors"
            >
              Find Tutor
            </Feature>
            <Feature
              icon={<Icon type="wechat" />}
              description="Chat with our tutors"
            >
              Chatting
            </Feature>
            <Feature
              icon={<Icon type="form" />}
              description="Make contracts with tutors"
            >
              Contract
            </Feature>
          </Flex>
          <Section
            heading="Let's see our best tutors"
            subhead="Give them a try"
          >
            <Row gutter={[16, 16]}>
              {dataTutor
                .filter(tutor => tutor.userInfo)
                .map(tutor => (
                  <Col span={6} key={_.uniqueId('col_')}>
                    <Card hoverable style={{ width: 300 }} loading={isRequest}>
                      <Card.Meta
                        avatar={
                          <Avatar size={64} src={tutor.userInfo.avatar} />
                        }
                        title={tutor.userInfo.name}
                        description={
                          <Text ellipsis>{tutor.specialization.name}</Text>
                        }
                      />
                      <Row>
                        <Popover
                          content="The percentage of this freelancer's jobs that resulted in a great client experience."
                          title="JOB SUCCESS SCORE"
                          overlayStyle={{ maxWidth: 200 }}
                        >
                          <b>{Math.round(tutor.successRate * 100)}% SUCCESS</b>
                        </Popover>
                      </Row>
                    </Card>
                  </Col>
                ))}
            </Row>
          </Section>
          <Section heading="Why choose us" subhead="Maybe this will help">
            <Checklist>{listCheck}</Checklist>
          </Section>
          <Section heading="Made by" subhead="from HCMUS">
            <Flex justifyContent="space-around">
              <Contributor
                fullName="Nguyễn Phước An"
                title="Web Developer"
                avatar={user2}
              >
                <Flex />
              </Contributor>
              <Contributor
                fullName="Nguyễn Duy Thảo"
                title="Web Developer"
                avatar="https://cdn.discordapp.com/avatars/619780700664758282/761ea1fc34b85b775e41e00a167537ac.png?size=256"
              >
                <Flex />
              </Contributor>
              <Contributor
                fullName="Trần Duy Tiên"
                title="Web Developer"
                avatar="https://cdn.discordapp.com/avatars/644512247988748298/c5412fb6636dffc985735c52c449ac99.png?size=256"
              >
                <Flex />
              </Contributor>
            </Flex>
          </Section>
        </Content>
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.user.isLoggedIn
  };
};

export default connect(mapStateToProps)(Home);
