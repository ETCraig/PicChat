import React, {Component} from 'react';

import {getUserProfile} from '../services/Profile.Services';
import Styled from 'styled-components';

class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user_name: '',
            avatar: '' 
        }
    }
    componentDidMount() {
        console.log('Passing')
        console.log(this.props.match.params.userId)
        getUserProfile(this.props.match.params.userId).then(res => {
            let {status, data} = res;
            if(status === 200) {
                console.log(res);
                this.setState({...data});
            }
        });
    }
    render() {
        return(
            <div>
                <h1>Profile Page</h1>
                <img src={this.state.avatar} />
                <h1>{this.state.user_name}</h1>
            </div>
        );
    }
}

export default Profile;