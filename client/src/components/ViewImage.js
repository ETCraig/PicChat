import React, { Component } from 'react';

import SaveBtn from '../containers/SaveBtn';
import { getSingleImage, saveCreatorImage, unsaveCreatorImage } from '../services/Image.Services';

class ViewImage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            image: [],
            creator: [],
            likeCount: 0,
            dislikeCount: 0,
            liked: 0,
            disliked: 0,
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
    render() {
        let image = this.state.image;
        return (
            <div>
                <h1>{image.description}</h1>
                <img src={image.image_file} alt='Feed' style={{ width: '200px', height: '200px' }} />
                {this.handleSaveBtn(image._id)}
            </div>
        );
    }
}

export default ViewImage;