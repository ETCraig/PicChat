import React, { Component } from 'react';
import '../styles/OtherProfile.css';

import { Elements } from 'react-stripe-elements';
import Footer from './Footer';
import { getProfileHandle } from '../services/Profile.Services';
import { Link } from 'react-router-dom';
import { pluralize } from '../utils/Pluralize';
import SubscribeModal from '../containers/SubscribeModal';
import UnsubscribeModal from '../containers/UnsubscribeModal';

class OtherProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: [],
            images: [],
            subscribed: false,
            subscribers: 0,
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
                    this.setState({
                        user: data.user[0],
                        subscribed: data.subscribed,
                        images: data.images,
                        subscribers: data.subscribers
                    });
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
        let count = this.state.subscribers;
        return (
            <div>
                <div className='profile-wrap'>
                    <div id='profile-header'>
                        <div className='avatar-wrap pro-grid'>
                            <img src={this.state.user.avatar} alt='User Avatar' />
                        </div>
                        <div className='profile-details pro-grid'>
                            <h1>{this.state.user.user_name}</h1>
                            <button
                                className={subscriber ? 'unsubscribe-btn' : 'subscribe-btn'}
                                onClick={() => subscriber ? this.handleUnsubscribeModal() : this.handleSubscribeModal()}
                            >
                                {subscriber ? "Unsubscribe" : "Subscribe    "}
                            </button>
                            {this.currentSubscribeModal()}
                            {this.currentUnsubscribeModal()}
                            <div className="stats">
                                <div className="stats-item">
                                    <span className="count">{count}</span>{" "}
                                    {pluralize(count, "subscribers", "subscribers")}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div id='profile-images'>
                    {!subscriber ? (
                        <div>
                            <h3>Here's a Sample of this Creators Posts</h3>

                        </div>
                    ) :
                        displayImages.map((image, i) => {
                            return (
                                <div key={i} id='profile-image-wrap'>
                                    <h5>{image.title}</h5>
                                    <Link to={`/view/${image._id}`} >
                                        <img src={image.image_file} alt='Profile Post' style={{ width: '225px', height: '225px' }} />
                                    </Link>
                                </div>
                            );
                        })}
                </div>
                <Footer />
            </div>
        );
    }
}

export default OtherProfile;