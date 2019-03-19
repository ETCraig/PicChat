import React, { Component } from 'react';

import Chip from '@material-ui/core/Chip';
import '../styles/CreateImg.css';
import { uploadNewImage } from '../services/Image.Services';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    container: {
        display: "flex",
        flexWrap: "wrap"
    },
    dense: {
        marginTop: 16
    },
    menu: {
        width: 200
    },
    button: {
        marginTop: 40,
        width: "100%"
    }
});

class CreatePost extends Component {
    constructor() {
        super()

        this.state = {
            selectedFile: null,
            description: '',
            title: '',
            image: '',
            tags: [],
            tag: '',
            fileType: '',
            mimeType: '',
            uri: ''
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
        console.log(this.state.description, this.state.title);
    }
    handleTagChange = e => {
        let string = e.target.value.toString();
        if (!string.includes(',')) {
            this.setState({ tag: e.target.value });
            console.log(this.state.tag)
        }
    }
    handleTagDown = e => {
        let tag = this.state.tag;
        console.log(tag)
        if ((e.which === 13 || e.which === 188) && tag.trim().length > 0) {
            this.setState(state => {
                const tags = [...state.tags, tag];
                return { tags, tag: '' };
            });
        }
    }
    handleDeleteTag = index => () => {
        this.setState(state => {
            const tags = [...state.tags];
            tags.splice(index, 1);
            return { tags };
        });
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
            });
        }
    }
    handleUpload = () => {
        let { title, description, uri, tags } = this.state;
        if (uri) {
            var data = new FormData();

            data.append("image", uri);
            data.append("title", `${title}`);
            data.append("description", `${description}`);
            if (tags.length) data.append('tags', tags);
            uploadNewImage(data)
                .then(({ status, data }) => {
                    if (status === 200) {
                        console.log('Success.');
                        this.setState({
                            selectedFile: null,
                            description: '',
                            title: '',
                            image: '',
                            tags: [],
                            tag: '',
                            fileType: '',
                            mimeType: '',
                            uri: ''
                        });
                    } else {
                        console.log('Err.');
                    }
                });
        }
    }
    render() {
        let { tags } = this.state;
        const displayTags = tags && tags.map((tag, index) => (
            <Chip
                key={index}
                label={tag}
                icon={null}
                onDelete={this.handleDeleteTag(index)}
            />
        ));
        return (
            <div>
                <div id='CreateImg'>
                    <div className='image-wrap grid '>
                        <img src={this.state.image} value={this.state.image} alt='New Post' />
                    </div>
                    <div className='inputs-wrap grid'>
                        <label>Title</label>
                        <input value={this.state.title} name="title" className='create-title' onChange={this.handleChange} />
                        <label>Description</label>
                        <input value={this.state.description} name="description" className='create-desc' onChange={this.handleChange} />
                        <div
                            className='tags-wrapper grid'
                            onClick={e => e.target.className !== 'MuiChip-label-135'
                                ? this.tagInput.focus()
                                : console.log('no')
                            }
                        >
                            <div className='tags'>
                                <label>Tags</label>
                                <br />
                                {displayTags}
                            </div>
                            <input
                                id='tags-input'
                                ref={ref => { this.tagInput = ref }}
                                onChange={this.handleTagChange}
                                onKeyDown={this.handleTagDown}
                                value={this.state.tag}
                                placeholder='Tags'
                            />
                        </div>
                        <label className='direction'>Enter comma-separated values</label>
                        <div className='btn-wrap'>
                            <input type="file" name="" id="upload-btn" onChange={this.handleSelectedFile} />
                            <button id="create-btn" onClick={this.handleUpload}>Upload</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default (withStyles(styles)(CreatePost));