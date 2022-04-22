import React from 'react';
import {CardElement} from '@stripe/react-stripe-js';
import {Row,Col} from 'react-bootstrap';
import '../index.css';
//import './index.css';
const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};
function CardSection() {
  return (
      <div>
      <Row>
     
         <label>
      Card details
      <Col>
      <CardElement  options={CARD_ELEMENT_OPTIONS} />
    </Col>
    </label>

      </Row>
      </div>
 
  );
};
export default CardSection;