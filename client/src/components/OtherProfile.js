import React, { Component } from 'react';

import { Elements } from 'react-stripe-elements';
import {getProfileHandle} from '../services/Profile.Services';
import SubscribeModal from '../containers/SubscribeModal';

class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: [],
            modal: false
        }
        this.handleSubscribeModal = this.handleSubscribeModal.bind(this);
    }
    componentDidMount() {
        console.log('Mounting');
        getProfileHandle(this.props.match.params.handle)
            .then(res => {
                let { status, data } = res;
                if (status === 200) {
                    console.log(data);
                    this.setState({ user: data[0] });
                    console.log(this.state.user)
                }
            });
    }
    currentModal() {
        if (!this.state.modal) {
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
    handleSubscribeModal() {
        this.setState({modal: true})
    }
    render() {
        return (
            <div>
                <img src={this.state.user.avatar} />
                <h1>{this.state.user.user_name}</h1>
                <button onClick={this.handleSubscribeModal}>Subscribe</button>
                {this.currentModal}
            </div>
        );
    }
}

export default Profile;