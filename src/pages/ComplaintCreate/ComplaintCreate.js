import React, { PureComponent } from 'react';
import { Layout, Steps, Icon, Row } from 'antd';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import ComplaintForm from '../../components/ComplaintForm/ComplaintForm';

const { Step } = Steps;
const steps = [
  {
    title: 'Create contracts',
    icon: 'form'
  },
  {
    title: 'Processing',
    icon: 'loading-3-quarters'
  },
  {
    title: 'Completed',
    icon: 'smile-o'
  }
];

class ComplaintCreate extends PureComponent {
  render() {
    const {
      user,
      match: { params }
    } = this.props;
    if (user.role !== 'student') {
      return <Redirect to="/dashboard" />;
    }
    return (
      <Layout className="contractDetailLayout">
        <Steps current={0} className="contractDetailStep">
          {steps.map(item => {
            return (
              <Step
                key={item.title}
                title={item.title}
                icon={<Icon type={item.icon} />}
              />
            );
          })}
        </Steps>
        <Row type="flex" justify="space-around">
          <ComplaintForm id={params.id} />
        </Row>
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.user.token,
    user: state.user.user
  };
};

export default connect(mapStateToProps)(ComplaintCreate);
