import React, { Component } from 'react';
import { InputNumber, Form, Row, Col } from 'antd';
import StripeCheckoutButton from '../StripeCheckoutButton/StripeCheckoutButton';

class RechargeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recharMoney: 1000
    };
  }

  handleChange(value) {
    this.setState({
      recharMoney: parseInt(value, 10)
    });
  }

  render() {
    const { form, token, user } = this.props;
    const { recharMoney } = this.state;
    const { getFieldDecorator } = form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };
    return (
      <>
        <Row type="flex" justify="center">
          <Col>
            <Form
              labelCol={formItemLayout.labelCol}
              wrapperCol={formItemLayout.wrapperCol}
              onSubmit={this.handleSubmit}
              style={{
                width: '450px'
              }}
            >
              <Form.Item label="Your Balance">
                <InputNumber
                  style={{ width: '100%' }}
                  defaultValue={`${user.balance}`}
                  formatter={value =>
                    `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                  }
                  parser={value => value.replace(/\$\s?|(,*)/g, '')}
                  readOnly
                />
              </Form.Item>
              <Form.Item label="Recharge Money">
                {getFieldDecorator('rechargeMoney', {
                  rules: [
                    {
                      required: true,
                      message: 'Please input money you want to recharge'
                    }
                  ],
                  initialValue: recharMoney
                })(
                  <InputNumber
                    style={{ width: '100%' }}
                    min={100}
                    max={10000}
                    formatter={value =>
                      `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                    }
                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                    onChange={value => this.handleChange(value)}
                  />
                )}
              </Form.Item>
              <Form.Item wrapperCol={tailFormItemLayout.wrapperCol}>
                <StripeCheckoutButton
                  price={recharMoney}
                  token={token}
                  user={user}
                />
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </>
    );
  }
}

export default Form.create({ name: 'info_form' })(RechargeForm);
