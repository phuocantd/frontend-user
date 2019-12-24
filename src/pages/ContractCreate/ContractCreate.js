import React, { PureComponent } from 'react';
import { Layout, Steps, Icon, Row, Statistic } from 'antd';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import ContractForm from '../../components/ContractForm/ContractForm';

const { Step } = Steps;
const steps = [
  {
    title: 'Create contracts',
    icon: 'form'
  },
  {
    title: 'Requesting',
    icon: 'loading-3-quarters'
  },
  {
    title: 'Happening',
    icon: 'schedule'
  },
  {
    title: 'Completed',
    icon: 'smile-o'
  }
];

class ContractCreate extends PureComponent {
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
        <Statistic
          title={
            <span style={{ color: 'rgba(0, 0, 0, 0.45)' }}>
              Account Balance
            </span>
          }
          value={user.balance}
          prefix="$"
        />
        <Row type="flex" justify="space-around">
          <ContractForm id={params.id} />
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

export default connect(mapStateToProps)(ContractCreate);
