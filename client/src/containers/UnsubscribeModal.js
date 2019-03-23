import React from 'react';

import {
    Button,
    Modal,
    ModalHeader,
    ModalBody
} from 'reactstrap';
import { unsubscribeFromCreator } from '../services/Stripe.Services';

class UnsubscribeModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: true,
            creator_id: props.creator
        }
    }
    handleUnsubscribe = e => {
        let creatorId = this.state.creator_id;
        unsubscribeFromCreator(creatorId)
            .then(res => {
                let { status } = res;
                if (status === 200) {
                    console.log('Success');
                    this.setState({ isOpen: false })
                } else {
                    console.log('Err');
                }
            });
    }
    render() {
        return (
            <Modal isOpen={this.state.isOpen}>
                <ModalBody>
                    <ModalHeader>Are you Sure?</ModalHeader>
                    <Button onClick={this.handleUnsubscribe}>Yes</Button>
                </ModalBody>
            </Modal>
        );
    }
}

export default UnsubscribeModal;