import React, { Component } from 'react';

import { getFeedImages } from '../services/Image.Services';
import { Link } from 'react-router-dom';

class FeedImages extends Component {
    constructor(props) {
        super(props);

        this.state = {
            feedImages: [],
            limit: 0,
            maxLength: 4,
            expanded: false,
            loadingFeed: false
        }
        this.reloadFeed = this.reloadFeed.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
        this.feeedInit = this.feeedInit.bind(this);
    }
    componentWillMount() {
        window.addEventListener('scroll', this.handleScroll);
        this.feeedInit();
    }
    feeedInit() {
        let limit = 4;
        getFeedImages(limit)
            .then(res => {
                let { status, data } = res;
                if (status === 200) {
                    this.setState({ ...data });
                    console.log(this.state.feedImages)
                }
            });
    }
    reloadFeed() {
        let { limit, maxLength, feedImages } = this.state;
        if (feedImages && feedImages.length < maxLength) {
            this.setState({
                loadingFeed: true
            });
            getFeedImages(limit)
                .then(res => {
                    let { status, data } = res;
                    let { feedImages, maxLength } = data;
                    if (status === 200) {
                        this.setState({
                            maxLength,
                            feedImages,
                            loadingFeed: false
                        });
                    } else {
                        this.setState({
                            loadingFeed: false
                        });
                    }
                })
                .catch(err => {
                    this.setState({
                        loadingFeed: false
                    });
                });
        }
    }
    handleScroll() {
        let { limit } = this.state;
        if (
            handleReloadFeed(
                window.document.body.scrollHeight,
                document.documentElement.clientHeight + window.pageYOffset,
                1
            )
        ) {
            this.setState({
                limit: limit + 4
            });
            this.reloadFeed();
        }
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
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

function handleReloadFeed(y1, y2, tollerance) {
    if (Math.abs(y1 - y2) < tollerance) {
        console.log('FETCH', y1, y2, Math.abs(y1 - y2));
        return true
    }
    return false
}

export default FeedImages;