import React, {Component} from 'react';

import {
    Button,
    Form,
    Label,
    Modal
} from 'reactstrap';
import {createPaymentMethod} from '../services/Stripe.Services';
import {
    injectStripe,
    CardNumberElement,
    CardExpiryElement,
    CardCVCElement,
    PostalCodeElement
} from 'react-stripe-elements'

const handleBlur = () => { };
const handleChange = change => { };
const handleFocus = () => { };
const handleReady = () => { };

class AddPaymentModal extends Component {
    state= {
        modal: true
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
                            this.setState({modal: false});
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
        return(
            <Modal isOpen={this.state.modal}>
                <Form onSubmit={this.handleSubscribe}>
                    <Label>Add New Payment Method</Label>
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
                    <Button style={{ marginTop: '2rem', background: '#3897f0', marginLeft: '5px' }}>Add</Button>
                </Form>
            </Modal>
        );
    }
}

export default injectStripe(AddPaymentModal);