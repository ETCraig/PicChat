import React, { Component } from 'react';
import '../styles/Receipts.css';

import Footer from './Footer';
import { getReceiptsList } from '../services/Stripe.Services';

class Receipts extends Component {
    constructor() {
        super()

        this.state = {
            receipt: [],
            limit: 0,
            maxLength: 4,
            expanded: false,
            loadingReceipts: false
        }
        this.reloadFeed = this.reloadFeed.bind(this);
        this.handleBtn = this.handleBtn.bind(this);
        this.receiptsInit = this.receiptsInit.bind(this);
    }
    componentDidMount() {
        window.addEventListener('scroll', this.handleBtn);
        this.receiptsInit();
    }
    receiptsInit() {
        const limit = 4;
        getReceiptsList(limit).then(res => {
            let data = res.data;
            console.log('RES', res.data);
            this.setState({ ...data });
            console.log(this.state.receipt);
        });
    }
    reloadFeed() {
        let { limit, receipt } = this.state;
        if (receipt && receipt.length < this.state.maxLength) {
            this.setState({
                loadingReceipts: true
            });
            getReceiptsList(limit)
                .then(res => {
                    let { data, status } = res;
                    let { receipt, maxLength } = data;
                    if (status === 200) {
                        this.setState({
                            maxLength,
                            receipt,
                            loadingReceipts: false
                        });
                    } else {
                        this.setState({
                            loadingReceipts: false
                        });
                    }
                })
                .catch(err => {
                    this.setState({
                        loadingReceipts: false
                    });
                });
        }
    }
    handleBtn() {
        let { limit } = this.state;
        if (
            handleReloadReceipts(
                window.document.body.scrollHeight,
                document.documentElement.clientHeight + window.pageYOffset,
                1
            )
        ) {
            this.setState({
                limit: limit + 4
            });
            this.reloadFeed()
        }
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleBtn);
    }
    render() {
        let { receipt } = this.state;
        return (
            <div>
                <div id='receipts-wrap'>
                    <div id='user-receipts'>
                        {receipt && receipt.map((receipts, i) => {
                            return (
                                <div key={i} id='user-receipts-wrap'>
                                    <h5>Cost: {receipts.amount}</h5>
                                    <h5>Currency:{receipts.currency}</h5>
                                    <h5>Date: {receipts.time}</h5>
                                    <h5>Click <a href={receipts.receipt_url} target='blank'>here</a> to view your Digital Receipt.</h5>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

function handleReloadReceipts(y1, y2, tollerance) {
    if (Math.abs(y1 - y2) < tollerance) {
        console.log('FETCH!', y1, y2, Math.abs(y1 - y2));
        return true
    }
    return false
}

export default Receipts;