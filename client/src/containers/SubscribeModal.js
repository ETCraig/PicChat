import React, {Component} from 'react';
// import {addCard} from '../services/Stripe.Services';
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

import {
    getPaymentMethods, 
    subscribeToCreator
} from '../services/Stripe.Services';

class SubscribeModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modal: true,
            cards: [],
            selected: [],
            creator: this.props.creator_id
        }
        this.handleSubscribe = this.handleSubscribe.bind(this);
    }
    componentDidMount() {
        getPaymentMethods()
            .then(({status, data}) => {
                if(status === 200) {
                    if(data.data.length) {
                        this.setState({cards: data});
                        this.setState({selected: data.data[0].id});
                    }
                }
            })
            .catch(err => {
                console.log(err);
            })
    }
    handleSubscribe() {
        let sourceId = this.state.selected;
        let creatorId = this.state.creator;
        subscribeToCreator(sourceId, creatorId)
            .then(({status, data}) => {
                if(status === 200) {
                    this.setState({modal: false})
                } else {
                    console.log('Err.');
                }
            });
    }
    render() {
        return(
            <div>

            </div>
        );
    }
}

export default injectStripe(SubscribeModal);