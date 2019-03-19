import React from 'react';

import {
    Button,
    Modal,
    ModalHeader,
    ModalBody
} from 'reactstrap';
import {unsubscribeFromCreator} from '../services/Stripe.Services';

function UnsubscribeModal(props) {
    const handleUnsubscribe = e => {
        console.log(props.creator);
        let creatorId = props.creator
        unsubscribeFromCreator(creatorId)
            .then(res => {
                let {status} = res;
                if(status === 200) {
                    console.log('Success');
                } else {
                    console.log('Err');
                }
            });
    }
    return (
        <Modal isOpen={true}>
            <ModalBody>
                <ModalHeader>Are you Sure?</ModalHeader>
                <Button onClick={handleUnsubscribe}>Yes</Button>
            </ModalBody>
        </Modal>
    );
}

export default UnsubscribeModal;