import React from 'react';

import {
    Button,
    Modal,
    ModalHeader,
    ModalBody
} from 'reactstrap';

const UnsubscribeModal = (props) => {
    return (
        <Modal isOpen={true}>
            <ModalBody>
                <ModalHeader>Unsubscribe Modal</ModalHeader>
            </ModalBody>
        </Modal>
    );
}

export default UnsubscribeModal;