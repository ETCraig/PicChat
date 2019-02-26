import React, {Component} from 'react';

import {getUserProfile} from '../services/Profile.Services';
import Styled from 'styled-components';

class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: []
        }
    }
    componentDidMount() {
        console.log('Passing')
        console.log(this.props.match.params.userId)
        getUserProfile(this.props.match.params.userId).then(res => {
            console.log(res)
            let {data} = res;
            console.log(data)
                this.setState({user: data});
                console.log(this.state.user)
        });
    }
    render() {
        return(
            <div>
                <h1>Profile Page</h1>
                <img src={this.state.user.avatar} />
                <h1>{this.state.user.user_name}</h1>
            </div>
        );
    }
}

export default Profile;