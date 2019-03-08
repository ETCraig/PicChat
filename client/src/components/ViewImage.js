import React, { Component } from 'react';

import SaveBtn from '../containers/SaveBtn';
import { getFeedImages, saveCreatorImage, unsaveCreatorImage } from '../services/Image.Services';

class ViewImage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            image: [],
            creator: [],
            likes: 0,
            dislikes: 0,
            isSaved: false
        }
        this.handleSaveBtn = this.handleSaveBtn.bind(this);
        this.handleUnsaveImg = this.handleUnsaveImg.bind(this);
    }
    componentDidMount() {
        getFeedImages()
            .then(res => {
                console.log(res.data)
                let data = res.data;
                this.setState({ image: data });
                console.log(this.state.feedImages)
            });
    }
    handleSaveBtn() {
        return (
            <SaveBtn
                isImgSaved={this.state.isSaved}
                handleSave={() => this.handleSaveImg()}
                handleUnsave={() => this.handleUnsaveImg()}
            />
        );
    }
    handleSaveImg() {
        let { image_id } = this.props.match.params;
        let creator_id = this.state.creator._id;
        saveCreatorImage(image_id, creator_id)
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
    handleUnsaveImg() {
        let { image_id } = this.props.match.params;
        let creator_id = this.state.creator._id;
        unsaveCreatorImage(image_id, creator_id)
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
        return (
            <div>
                
            </div>
        );
    }
}

export default ViewImage;