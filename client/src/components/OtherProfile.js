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
    }
    componentDidMount() {
        console.log('Mounting');
        getProfileHandle(this.props.match.params.handle)
            .then(res => {
                let { status, data } = res;
                if (status === 200) {
                    console.log(data);
                    this.setState({ ...data, isReady: true });
                }
            });
    }
    render() {
        return (
            <div>
                <img src={this.state.user.avatar} />
                <h1>{this.state.user.user_name}</h1>
                <button>Subscribe</button>
            </div>
        );
    }
}

export default Profile;