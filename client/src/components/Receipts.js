import React, {Component} from 'react';

import {getReceiptsList} from '../services/Stripe.Services';

class Receipts extends Component {
    constructor() {
        super()

        this.state = {
            receipts: [],
            limit: 0,
            maxLength: 6,
            expanded: false,
            loadingReceipts: false
        }
    }
    render() {
        return(
            <div>

            </div>
        );
    }
}

export default Receipts;