import React, { Component } from 'react';

import axios from 'axios';
import { uploadNewImage } from '../services/Image.Services';

class CreatePost extends Component {
    constructor() {
        super()

        this.state = {
            feedImages: [],
            selectedFile: null,
            description: '',
            title: '',
            image: '',
            fileType: '',
            mimeType: '',
            uri: ''
        }
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount() {
        axios.get('/api/images/images').then(res => {
            console.log(res.data)
            this.setState({ feedImages: res.data });
            console.log(this.state.feedImages)
        });
    }
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
        console.log(this.state.description, this.state.title);
    }
    handleSelectedFile = event => {
        let file = event.target.files[0];
        console.log(file.type);
        if (file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/gif') {
            let uriParts = file.type.split('/');
            let fileType = uriParts[uriParts.length - 1];
            this.setState({
                image: URL.createObjectURL(file),
                uri: file,
                fileType,
                mimeType: file.type,
                selectedFile: event.target.files[0],
            })
        }
    }
    handleUpload = () => {
        let {title, description, uri} = this.state;
        if(uri) {
            var data = new FormData();

            data.append("image", uri);
            data.append("title", `${title}`);
            data.append("description", `${description}`);
            uploadNewImage(data)
                .then(({status, data}) => {
                    if(status === 200) {
                        console.log('Success.');
                    } else {
                        console.log('Err.');
                    }
                });
        }
    }
    render() {
        let displayImages = this.state.feedImages;
        return (
            <div>
                {/* <form onSubmit={this.handleSubmit} encType="multipart/form-data"> */}
                    <img src={this.state.image} style={{width: '200px', height: '200px'}}/>
                    <input type="file" name="" id="" onChange={this.handleSelectedFile} />
                    <button onClick={this.handleUpload}>Upload</button>
                    <input name="title" onChange={this.handleChange} placeholder='title' />
                    <input name="description" onChange={this.handleChange} placeholder='description' />
                {/* </form> */}
                {displayImages.map((image, i) => {
                    return (
                        <div key={i}>
                            <h1>{image.description}</h1>
                            <img src={image.image_file} alt='Feed' style={{width: '200px', height: '200px'}} />
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default CreatePost;