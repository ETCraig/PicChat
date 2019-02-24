import React, { Component } from 'react';

import axios from 'axios';
import {uploadNewImage} from '../services/Image.Services';
 
import Styled from 'styled-components';

class CreatePost extends Component {
    constructor() {
        super()

        this.state = {
            feedImages: [],
            selectedFile: null,
            description: ''
        }
        this.handleChange = this.handleChange.bind(this);
    }
    // componentDidMount() {
    //     axios.get('/api/images/images').then(res => {
    //         console.log(res.data)
    //         this.setState({ feedImages: res.data });
    //         console.log(this.state.feedImages)
    //     });
    // }
    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
        console.log(this.state.description)
    }
    handleSelectedFile = event => {
        this.setState({
          selectedFile: event.target.files[0],
        })
      }
      handleUpload = () => {
        let title = 'maTitle';
        let description = this.state.description;
        let body = [title, description];
        const data = new FormData()
        data.append('file', this.state.selectedFile)
        uploadNewImage(data, body).then(res => {
            console.log('RES', res)
        }); 
      }
    render() {
        let displayImages = this.state.feedImages;
        return (
            <div>
                <form onSubmit={this.handleSubmit} encType="multipart/form-data">
                    <input type="file" name="" id="" onChange={this.handleSelectedFile} />
                    <button onClick={this.handleUpload}>Upload</button>
                    <input name="description" onChange={this.handleChange} />
                </form>
                {displayImages.map((image, i) => {
                    return (
                        <div>
                            <h1>{image.description}</h1>
                            <img src={image.image_file} />
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default CreatePost;