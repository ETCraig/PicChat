import React, { Component } from 'react';

import { Elements } from 'react-stripe-elements';
import { getProfileHandle } from '../services/Profile.Services';
import SubscribeModal from '../containers/SubscribeModal';
import UnsubscribeModal from '../containers/UnsubscribeModal';

class OtherProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: [],
            subscribed: false,
            subModal: false,
            unModal: false
        }
        this.handleSubscribeModal = this.handleSubscribeModal.bind(this);
        this.handleUnsubscribeModal = this.handleUnsubscribeModal.bind(this);
    }
    componentDidMount() {
        console.log('Mounting');
        getProfileHandle(this.props.match.params.handle)
            .then(res => {
                let { status, data } = res;
                if (status === 200) {
                    console.log(data);
                    this.setState({ user: data.user[0] });
                    this.setState({ subscribed: data.subscribed });
                    console.log(this.state.user, this.state.subscribed);
                }
            });
    }
    handleSubscribeModal() {
        this.setState({ subModal: true })
    }
    handleUnsubscribeModal() {
        this.setState({ unModal: true });
    }
    currentSubscribeModal() {
        if (!this.state.subModal) {
            return (
                <div />
            );
        } else {
            let creator_id = this.state.user._id;
            return (
                <Elements>
                    <SubscribeModal creator={creator_id} />
                </Elements>
            );
        }
    }
    currentUnsubscribeModal() {
        if (!this.state.unModal) {
            return (
                <div />
            );
        } else {
            let creator_id = this.state.user._id;
            return (
                <div>
                    <UnsubscribeModal creator={creator_id} />
                </div>
            );
        }
    }
    render() {
        let subscriber = this.state.subscribed;
        return (
            <div>
                <img src={this.state.user.avatar} alt='User Avatar' />
                <h1>{this.state.user.user_name}</h1>
                <button
                    onClick={() => subscriber ? this.handleUnsubscribeModal() : this.handleSubscribeModal()}
                >
                    {subscriber ? "Unsubscribe" : "Subscribe    "}
                </button>
                {this.currentSubscribeModal()}
                {this.currentUnsubscribeModal()}
            </div>
        );
    }
}

export default OtherProfile;