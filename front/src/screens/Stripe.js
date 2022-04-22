import React from 'react';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

import CheckoutForm from '../components/CheckoutForm';

// Make sure to call `loadStripe` outside of a component's render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_live_51KNQCkBlfnKUxUReqxgT4Wo2ZEebNxCBktQw6He3XcHVb27TWnToMGW9l07uqQalDsDLQQ0WlyKjXFHmT9Vts2GQ00UAJxpmb5');

function Stripe() {
  return (

          <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>

    
  );
};

export default Stripe;