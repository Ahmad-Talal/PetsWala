import React from 'react';
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';

import CardSection from './CardSection';
import axios from 'axios'

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  async function stripeTokenHandler(token) {
    const paymentData = {token: token.id};
  
    // Use fetch to send the token ID and any other payment data to your server.
    // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
    const configuration = {
        headers : {
            'Content-type':'application/json',
        }
    }
    const {data} = await axios.post('/api/stripe/charge/',
       JSON.stringify(paymentData),
      configuration
    );
    console.log("acche khaaase      ,",data)
  
    // Return and display the result of the charge.
  }
  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make  sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const card = elements.getElement(CardElement);
    const result = await stripe.createToken(card);

    if (result.error) {
      // Show error to your customer.
      console.log(result.error.message);
    } else {
      // Send the token to your server.
      // This function does not exist yet; we will define it in the next step.
    stripeTokenHandler(result.token);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardSection />
      <button disabled={!stripe}>Confirm order</button>
    </form>
  );
}