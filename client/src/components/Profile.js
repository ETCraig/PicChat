import React, { Component } from 'react';
import '../styles/Profile.css';

import Footer from './Footer';
import { getUserProfile } from '../services/Profile.Services';
import {Link} from 'react-router-dom';
import {pluralize} from '../utils/Pluralize';

class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: [],
            images: [],
            subscribers: 0
        }
    }
    componentDidMount() {
        console.log('Passing')
        console.log(this.props.match.params.userId)
        getUserProfile(this.props.match.params.userId).then(res => {
            console.log(res)
            let { data } = res;
            console.log(data)
            this.setState({ ...data });
            console.log(this.state)
        });
    }
    render() {
        let displayImages = this.state.images;
        let count = this.state.subscribers;
        return (
            <div>
                <div className='user-wrap'>
                    <div id='user-header'>
                        <div className='avatar-wrap user-grid'>
                            <img src={this.state.user.avatar} alt='User Avatar' />
                        </div>
                        <div className='user-details user-grid'>
                            <h1>{this.state.user.user_name}</h1>
                            <div className="stats">
                                <div className="stats-item">
                                    <span className="count">{count}</span>{" "}
                                    {pluralize(count, "subscriber", "subscribers")}
                                </div>

                            </div>
                            <br />
                            <Link to='/edit' style={{textDecoration: 'none'}}>
                                <button className='user-edit-btn'>Edit</button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div id='user-images'>
                    {displayImages.map((image, i) => {
                        return(
                            <div key={i} id='user-image-wrap'>
                                <h5>{image.title}</h5>
                                <Link to={`/view/${image._id}`}>    
                                    <img src={image.image_file} alt='User Post' style={{width: '225px', height: '225px'}} />
                                </Link>
                            </div>
                        );
                    })}
                </div>
                <div style={{background: '#333', height: '19.5vh', marginTop: '-30px'}} />
                <Footer />
            </div>
        );
    }
}

export default Profile;