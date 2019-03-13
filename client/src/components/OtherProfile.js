import React, { Component } from 'react';

import { Elements } from 'react-stripe-elements';
import { getProfileHandle } from '../services/Profile.Services';
import { Link } from 'react-router-dom';
import SubscribeModal from '../containers/SubscribeModal';
import UnsubscribeModal from '../containers/UnsubscribeModal';

class OtherProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: [],
            images: [],
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
                    this.setState({ images: data.images });
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
        let displayImages = this.state.images;
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

                {!subscriber ? (
                    <div>
                        <h3>Here's a Sample of this Creators Posts</h3>

                    </div>
                ) :
                    displayImages.map((image, i) => {
                        return (
                            <div key={i}>
                                <h1>{image.title}</h1>
                                <img src={image.image_file} alt='Profile Post' style={{ width: '200px', height: '200px' }} />
                                <Link to={`/view/${image._id}`} >View Image</Link>
                            </div>
                        );
                    })}
                {/* {displayImages.map((image, i) => {
                    return (
                        <div key={i}>
                            <h1>{image.description}</h1>
                            <img src={image.image_file} alt='Feed' style={{ width: '200px', height: '200px' }} />
                            <Link to={`/view/${image._id}`} >View Image</Link>
                        </div>
                    );
                })} */}
            </div>
        );
    }
}

export default OtherProfile;