import React, { Component } from 'react';

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
                <h1>{image.description}</h1>
                <img src={image.image_file} alt='Feed' style={{ width: '200px', height: '200px' }} />
                <button
                    onClick={() => this.likeImage(image._id)}
                    style={{ color: (!liked) ? "blue" : "red" }}
                >
                    Like
                </button>
                <label>{likeCount}</label>
                <button
                    onClick={() => this.dislikeImage(image._id)}
                    style={{ color: (!disliked) ? "blue" : "red" }}
                >
                    Unlike
                </button>
                <label>{dislikeCount}</label>
                {this.handleSaveBtn(image._id)}
            </div>
        );
    }
}

export default ViewImage;