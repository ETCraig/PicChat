import React, { Component } from 'react';

import {
    injectStripe,
    CardNumberElement,
    CardExpiryElement,
    CardCVCElement,
    PostalCodeElement
} from 'react-stripe-elements';
import { createPaymentMethod } from '../services/Stripe.Services';
import styled from 'styled-components';

const handleBlur = () => { };
const handleChange = change => { };
const handleClick = () => { };
const handleFocus = () => { };
const handleReady = () => { };

const Label = styled.div`
  color: #262626;
  padding: 10px;
`;

const Form = styled.form.attrs({
  className: props => props.className || "Form"
})`
  background-color: white;
  padding: 2rem;
  border: 1px solid #efefef;
  border-radius: 2px;
  width: 100%;
`;

class AddPaymentMethod extends Component {
    handleSubmit = e => {
        e.preventDefault();
        if (this.props.stripe) {
            this.props.stripe.createToken().then(payload =>
                createPaymentMethod(payload.token)
                    .then(res => {
                        if (res.status === 200) {
                            console.log('ADDED', res);
                            this.props.updatePaymentMethods();
                        }
                    })
                    .catch(err => {
                        console.log('ERROR', err.response.data);
                    })
            )
        } else {
            console.log('Stripe.js has not loaded.');
        }
    }
    render() {
        return (
            <div>
                <Form onSubmit={this.handleSubscribe}>
                    <Label>Card Number</Label>
                    <CardNumberElement
                        onBlur={handleBlur}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onReady={handleReady}
                    />
                    <Label>Expiration Date</Label>
                    <CardExpiryElement
                        onBlur={handleBlur}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onReady={handleReady}
                    />
                    <Label>CVC</Label>
                    <CardCVCElement
                        onBlur={handleBlur}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onReady={handleReady}
                    />
                    <Label>Postal Code</Label>
                    <PostalCodeElement
                        onBlur={handleBlur}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onReady={handleReady}
                    />
                    <Label>Coupon Code</Label>
                    <Input type='text' name='promo_code' onChange={this.handlePromoCode} />
                    <button style={{ marginTop: '2rem', background: '#3897f0', marginLeft: '5px' }}>Subscribe</button>
                </Form>
            </div>
        );
    }
}

export default injectStripe(AddPaymentMethod);