import React, { Component } from 'react';
import '../styles/ViewImage.css';

import Footer from './Footer';
import SaveBtn from '../containers/SaveBtn';
import {
    dislikeCreatorImage,
    getSingleImage,
    likeCreatorImage,
    saveCreatorImage,
    unsaveCreatorImage
} from '../services/Image.Services';

class ViewImage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            image: [],
            creator: [],
            likeCount: 0,
            dislikeCount: 0,
            liked: false,
            disliked: false,
            isSaved: false,
            isSubscribed: false
        }
        this.handleSaveBtn = this.handleSaveBtn.bind(this);
        this.handleUnsaveImg = this.handleUnsaveImg.bind(this);
    }
    componentDidMount() {
        let image_id = this.props.match.params.image_id;
        console.log(image_id)
        getSingleImage(image_id)
            .then(res => {
                console.log(res.data)
                let data = res.data;
                this.setState({ ...data });
                console.log(this.state.image)
            });
    }
    handleSaveBtn(image) {
        let image_id = image;
        return (
            <SaveBtn
                isImgSaved={this.state.isSaved}
                handleSave={() => this.handleSaveImg(image_id)}
                handleUnsave={() => this.handleUnsaveImg(image_id)}
            />
        );
    }
    handleSaveImg(image_id) {
        saveCreatorImage(image_id)
            .then(res => {
                let { status, data } = res;
                if (status === 200) {
                    console.log(data);
                    this.setState({ ...data });
                }
            })
            .catch(err => {
                throw err;
            });
    }
    handleUnsaveImg(image_id) {
        unsaveCreatorImage(image_id)
            .then(res => {
                let { status, data } = res;
                if (status === 200) {
                    console.log(data);
                    this.setState({ ...data });
                }
            })
            .catch(err => {
                throw err;
            });
    }
    likeImage = image_id => {
        console.log(image_id)
        likeCreatorImage(image_id)
            .then(res => {
                let { data, status } = res;
                if (status === 200) {
                    this.setState({ ...data });
                }
            })
            .catch(err => {
                throw err
            });
    }
    dislikeImage = image_id => {
        console.log(image_id)
        dislikeCreatorImage(image_id)
            .then(res => {
                let { data, status } = res;
                if (status === 200) {
                    this.setState({ ...data });
                }
            })
            .catch(err => {
                throw err
            });
    }
    render() {
        let { image, liked, disliked, likeCount, dislikeCount } = this.state;
        return (
            <div>
                <div id='view-image'>
                    <div id='view-wrapper'>
                        <div className='view-img-wrap'>
                            <img src={image.image_file} alt='Feed' style={{ width: '300px', height: '300px' }} />
                        </div>
                        <div className='view-details'>
                            <h1>{image.title}</h1>
                            <h5>{image.description}</h5>
                            <div className='likes-wrap'>
                                <button
                                    onClick={() => this.likeImage(image._id)}
                                    style={{ color: (!liked) ? "#c91717" : "#fff" }}
                                >
                                    Like
                                </button>
                                <label>{likeCount}</label>
                                <button
                                    onClick={() => this.dislikeImage(image._id)}
                                    style={{ color: (!disliked) ? "#c91717" : "#fff" }}
                                >
                                    Unlike
                                </button>
                                <label>{dislikeCount}</label>
                                {this.handleSaveBtn(image._id)}
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default ViewImage;