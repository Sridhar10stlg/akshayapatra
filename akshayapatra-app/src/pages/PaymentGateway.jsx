import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './PaymentForm';
import { useLocation } from "react-router-dom";

const stripePromise = loadStripe('pk_test_51PENcOSAjKvAtMTufHkfRNNLQXhv8ktf79uiKmRo1UpHpQxs689VUY4XADC06o7cimBjqHsybdhgHBMB5ph6qJnf00S3vP50ns');

const PaymentGateway = () => {

  const location = useLocation();
  const { selectedItemsDetails, totalAmount  } = location.state || {};
  console.log(selectedItemsDetails);
  console.log(totalAmount);

  return (
    <div>
      <Elements stripe={stripePromise}>
        <PaymentForm totalAmount={totalAmount} selectedItemsDetails={selectedItemsDetails} />
      </Elements>
    </div>
  );
};

export default PaymentGateway;