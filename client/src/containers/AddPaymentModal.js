import React, { Component } from 'react';

import { Modal } from 'reactstrap';
import { createPaymentMethod } from '../services/Stripe.Services';
import {
    injectStripe,
    CardNumberElement,
    CardExpiryElement,
    CardCVCElement,
    PostalCodeElement
} from 'react-stripe-elements';
import '../styles/EditPayments.css';
import styled from 'styled-components';

const handleBlur = () => { };
const handleChange = change => { };
const handleFocus = () => { };
const handleReady = () => { };

const Label = styled.label`
  color: #fff;
  font-size: 0.9rem;
  line-height: 2rem;
  font-weight: 500;
`;
const ElementGroup = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const SubElementGroup = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-right: 10px;
`;

const Form = styled.form.attrs({
    className: props => props.className || "Form"
})`
  display: flex;
  flex-direction: column;
  font-family: roboto;
  width: 100%;
  .numberStyle {
    background-color: #555;
  }
  .StripeElement {
    box-sizing: border-box;

    /* height: 40px; */

    /* padding: 10px 12px; */
    padding: 6px 6px;

    border: 1px solid transparent;
    border-radius: 4px;
    background-color: #f0f0f0;

    box-shadow: 0 1px 3px 0 #e6ebf1;
    -webkit-transition: box-shadow 150ms ease;
    transition: box-shadow 150ms ease;
  }
`;

class AddPaymentModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modal: true
        }
        this.handleClose = this.handleClose.bind(this);
    }
    handleSubscribe = e => {
        e.preventDefault();
        console.log('HIT')
        if (this.props.stripe) {
            this.props.stripe.createToken().then(payload =>
                createPaymentMethod(payload.token)
                    .then(res => {
                        if (res.status === 200) {
                            console.log('ADDED', res);
                            this.setState({ modal: false });
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
    handleClose() {
        this.setState({ modal: false });
    }
    render() {
        return (
            <Modal isOpen={this.state.modal} style={{ background: '#eaeaea' }}>
                <Form style={{background: '#555', display: 'flex', alignItems: 'center' }}>
                    <ElementGroup>
                        <SubElementGroup>
                            <Label className="label">
                                Card Number
                            <CardNumberElement
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    onFocus={handleFocus}
                                    onReady={handleReady}
                                    id='add-inputs'
                                />
                            </Label>
                        </SubElementGroup>
                    </ElementGroup>
                    <ElementGroup>
                        <SubElementGroup>
                            <Label className="label">
                                Expiration Date
                            <CardExpiryElement
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    onFocus={handleFocus}
                                    onReady={handleReady}
                                    id='add-inputs'
                                />
                            </Label>
                        </SubElementGroup>
                        <SubElementGroup>
                            <Label className="label">
                                CVC
                            <CardCVCElement
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    onFocus={handleFocus}
                                    onReady={handleReady}
                                    id='add-inputs'
                                />
                            </Label>
                        </SubElementGroup>
                        <SubElementGroup>
                            <Label className="label">
                                Postal Code
                            <PostalCodeElement
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    onFocus={handleFocus}
                                    onReady={handleReady}
                                    id='add-inputs'
                                />
                            </Label>
                        </SubElementGroup>
                    </ElementGroup>
                    <button style={{width: '100px', marginTop: '2rem', background: '#c91717', color: '#fff', marginLeft: '5px' }}>Add Card</button>
                </Form>
            </Modal>
        );
    }
}

export default injectStripe(AddPaymentModal);