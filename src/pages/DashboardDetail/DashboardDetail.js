import React, { Component } from 'react';
import { Layout, Row, Col, Card, Statistic, message, Icon } from 'antd';
import { connect } from 'react-redux';
import { Chart, Axis, Legend, Tooltip, Geom } from 'bizcharts';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import services from '../../api/services';
import './DashboardDetail.css';
import TutorForm from '../../components/TutorForm/TutorForm';

const cols = {
  totalAmount: {
    alias: 'Total Amount',
    formatter(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
  },
  _id: { alias: 'Contracts' }
};
const typeContracts = [
  'Requesting',
  'Canceled',
  'Happening',
  'Completed',
  'Complaining'
];
class DashboardDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isRequest: false
    };
  }

  componentDidMount() {
    const { role } = this.props;
    if (role !== 'student') {
      this.fetchStatistic();
    }
  }

  componentDidUpdate(prevProps) {
    const { role } = this.props;
    if (prevProps.role !== role) {
      this.fetchStatistic();
    }
  }

  fetchStatistic = () => {
    const { token, role } = this.props;
    if (role !== 'student') {
      this.setState({ isRequest: true });
      services.statistic
        .getStatistics(token)
        .then(response => {
          this.setState({ isRequest: false });
          if (response.success) {
            const { data } = response;
            typeContracts.forEach((type, ix) => {
              const idx = data.findIndex(elem => elem._id === type);
              if (idx < 0) {
                data.splice(ix, 0, {
                  _id: type,
                  totalAmount: 0,
                  numberOfContracts: 0
                });
              }
            });
            this.setState({ data });
          } else {
            message.error(response.error);
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
  };

  getClassNameCard = contract => {
    switch (contract._id) {
      case 'Happening':
        return 'bg-warning';
      case 'Canceled':
        return 'bg-danger';
      case 'Completed':
        return 'bg-success';
      case 'Requesting':
        return 'bg-info';
      case 'Complaining':
        return 'bg-gradient';
      default:
        return '';
    }
  };

  getIconCard = contract => {
    switch (contract._id) {
      case 'Happening':
        return 'schedule';
      case 'Canceled':
        return 'close-circle';
      case 'Completed':
        return 'smile-o';
      case 'Requesting':
        return 'loading';
      case 'Complaining':
        return 'exclamation-circle';
      default:
        return 'question-circle';
    }
  };

  render() {
    const { role } = this.props;
    const { data, isRequest } = this.state;
    let dataContract = data;
    if (isRequest) {
      dataContract = Array.from(Array(6), () => ({
        _id: 'Unknown',
        numberOfContracts: 0,
        totalAmount: 0
      }));
    }
    if (typeof role === 'undefined') {
      return null;
    }
    return (
      <Layout className="dashboardDetailLayout">
        {role !== 'student' ? (
          <Row gutter={[16, 16]}>
            {dataContract.map(contract => (
              <Col span={4} key={_.uniqueId('row_')}>
                <Link to="/dashboard/contract">
                  <Card
                    loading={isRequest}
                    hoverable
                    className={this.getClassNameCard(contract)}
                  >
                    <Icon
                      className="cardIcon"
                      type={this.getIconCard(contract)}
                      theme="outlined"
                    />
                    <Statistic
                      title={contract._id}
                      value={contract.numberOfContracts}
                      valueStyle={{ color: '#fff', fontWeight: 'bold' }}
                    />
                  </Card>
                </Link>
              </Col>
            ))}
            <Col span={24}>
              <Card>
                <Chart height={400} data={data} scale={cols} forceFit>
                  <Axis name="_id" title />
                  <Axis name="totalAmount" title />
                  <Legend position="top" dy={-20} />
                  <Tooltip />
                  <Geom
                    type="interval"
                    position="_id*totalAmount"
                    color={[
                      '_id',
                      ['#39f', '#e55353', '#f9b115', '#2eb85c', '#321fdb']
                    ]}
                  />
                </Chart>
              </Card>
            </Col>
          </Row>
        ) : (
          <TutorForm />
        )}
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.user.token,
    role: state.user.user.role
  };
};

export default connect(mapStateToProps)(DashboardDetail);
