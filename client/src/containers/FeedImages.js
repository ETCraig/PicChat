import React, { Component } from 'react';

import { getFeedImages } from '../services/Image.Services';
import {Link} from 'react-router-dom';

class FeedImages extends Component {
    constructor(props) {
        super(props);

        this.state = {
            feedImages: []
        }
    }
    componentDidMount() {
        getFeedImages()
            .then(res => {
                console.log(res.data)
                let data = res.data;
                this.setState({ feedImages: data });
                console.log(this.state.feedImages)
            });
    }
    render() {
        let displayImages = this.state.feedImages;
        return (
            <div>
                {displayImages.map((image, i) => {
                    return (
                        <div key={i}>
                            <h1>{image.description}</h1>
                            <img src={image.image_file} alt='Feed' style={{ width: '200px', height: '200px' }} />
                            <Link to={`/view/${image._id}`} >View Image</Link>
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default FeedImages;