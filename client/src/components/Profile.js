import React, { Component } from 'react';

import {Elements} from 'react-stripe-elements';
import { getUserProfile } from '../services/Profile.Services';
import {Link} from 'react-router-dom';
import Styled from 'styled-components';
import SubscribeModal from '../containers/SubscribeModal';

class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: [],
            modal: false
        }
        this.handleModal = this.handleModal.bind(this);
    }
    componentDidMount() {
        console.log('Passing')
        console.log(this.props.match.params.userId)
        getUserProfile(this.props.match.params.userId).then(res => {
            console.log(res)
            let { data } = res;
            console.log(data)
            this.setState({ user: data });
            console.log(this.state.user)
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
    handleModal() {
        this.setState({modal: true})
    }
    render() {
        return (
            <div>
                <Link to='/edit'><button>Edit</button></Link>
                <h1>Profile Page</h1>
                <img src={this.state.user.avatar} />
                <h1>{this.state.user.user_name}</h1>
            </div>
        );
    }
}

export default Profile;