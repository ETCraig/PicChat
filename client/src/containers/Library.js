import React, { Component } from 'react';
import '../styles/Library.css';

import Footer from '../components/Footer';
import { getSavedImages } from '../services/Image.Services';
import { Link } from 'react-router-dom';

class Library extends Component {
    constructor() {
        super()

        this.state = {
            savedImages: [],
            limit: 0,
            maxLength: 0
        }
    }
    componentDidMount() {
        let limit = 2;
        getSavedImages(limit)
            .then(res => {
                let { status, data } = res;
                if (status === 200) {
                    console.log(res)
                    this.setState({ ...data });
                    console.log(this.state)
                }
            });
    }
    render() {
        let displayImages = this.state.savedImages;
        return (
            <div>
                <div id='library-wrap'>
                    <div className='library-title'>
                        <h2>Image Library</h2>
                    </div>
                </div>
                <div id='library-images'>
                    {displayImages.map((image, i) => {
                        return (
                            <div key={i} id='library-image-wrap'>
                                <h5>{image.title}</h5>
                                <Link to={`/view/${image._id}`}>
                                    <img src={image.image_file} alt='Feed' style={{ width: '225px', height: '225px' }} />
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

export default Library;