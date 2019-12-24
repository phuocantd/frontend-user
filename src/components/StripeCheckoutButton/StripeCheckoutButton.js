import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { message } from 'antd';
import { connect } from 'react-redux';
import services from '../../api/services';
import { updateUser } from '../../actions/user';

const StripeCheckoutButton = ({ price, token, user, updateUserInfo }) => {
  let { balance } = user;
  const publishableKey = 'pk_test_l91gEMBL5Pv0QMKv2MMHGIpG00GDV5uA8Q';

  const priceForStripe = price * 100;

  const onToken = async stripeToken => {
    try {
      const response = await services.user.updateBalance(
        stripeToken,
        price,
        token
      );
      if (response.success) {
        message.success(response.message);
        balance += price;
        updateUserInfo({ ...user, balance });
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <StripeCheckout
      label="Recharge"
      name="Advanced Web."
      image="https://my-final-project-ptudwnc.s3.amazonaws.com/default-image/41ea2374-59c9-409e-a8ad-21a8020e0b2a.jpg"
      description={`Your total recharge is $${price}`}
      amount={priceForStripe}
      panelLabel="Recharge"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

const mapDispatchtoProps = dispatch => {
  return {
    updateUserInfo: item => {
      dispatch(updateUser(item));
    }
  };
};
export default connect(null, mapDispatchtoProps)(StripeCheckoutButton);
