import React, {Component} from 'react';
import {
    Elements,
    injectStripe,
    CardNumberElement,
    CardExpiryElement,
    CardCVCElement,
    PostalCodeElement
} from 'react-stripe-elements';
import {
    Button,
    Input,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label
} from 'reactstrap';

const handleBlur = () => {};
const handleChange = change => {};
const handleClick = () => {};
const handleFocus = () => {};
const handleReady = () => {};

class SubscribeModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            body: '',
            modal: true,
            creator_id: this.props.creator,
            promo_code: ''
        };
        this.handlePromoCode = this.handlePromoCode.bind(this);
        this.handleSubscribe = this.handleSubscribe.bind(this); 
    }
    toggle = () => {
        this.setState({modal: !this.state.model});
    };
    handlePromoCode = e => {
        this.setState({[e.target.name]: e.target.value});
        console.log(this.state.promo_code);
    };
    handleSubscribe = ev => {
        ev.preventDefault();
        if(this.props.stripe) {
            this.props.stripe.createToken().then(payload => {
                addCard(payload.token, this.state.creator_id, this.state.promo_code)
                    .then(res => {
                        this.setState({modal: false});
                        console.log('res.data', res.data)
                    })
                    .catch(err => {
                        console.log(err)
                    })
            });
        } else {
            console.log("Stripe.js hasn't loaded yet.");
        }
    }
    render() {
        let {cards} = this.state;
        return(
            <Elements>
                <Modal 
                    isOpen={this.state.modal}
                    style={{marginTop: '100px'}}
                >
                    <ModalHeader toggle={this.toggle}>Subscribe Payment</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleSubscribe}>
                            <FormGroup>
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
                                <PostalCodeElement 
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    onFocus={handleFocus}
                                    onReady={handleReady}
                                />
                                <Label>Coupon Code</Label>
                                <Input type='text' name='promo_code' onChange={this.handlePromoCode} />
                                <Button 
                                    color='dark'
                                    style={{marginTop: '2rem', background: '#3897f0', marginLeft: '5px'}}
                                    block
                                >
                                Subscribe
                                </Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </Elements>
        );
    }
}

export default injectStripe(SubscribeModal);