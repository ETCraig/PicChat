import React, { Component } from 'react';

import axios from 'axios';
import Chip from '@material-ui/core/Chip';
import FeedImages from '../containers/FeedImages';
import { Link } from 'react-router-dom';
import { uploadNewImage } from '../services/Image.Services';
import styled from 'styled-components';
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

const TagInputWrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  overflow: hidden;
  padding: 0 16px 8px 16px;
  position: relative;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  border-color: rgba(0, 0, 0, 0.38);

  .wrap {
    font-family: "Roboto", "Noto", sans-serif;
    font-weight: 400;
    white-space: initial;
    overflow: initial;
    text-overflow: initial;
    font-size: 12px;
    line-height: 16px;
    margin-top: calc(20px - 12px);
    color: rgba(0, 0, 0, 0.55);
    margin-bottom: 3px;
    position: relative;
  }

  .container {
    min-height: 48px;
    padding-top: 5px;
    padding-bottom: 5px;
    display: inline-flex;
    flex-wrap: wrap;
    align-items: center;
    width: 100%;

    div {
      margin-right: 10px;
      margin-bottom: 10px;
    }

    input {
      border: 0px solid transparent;
      margin-bottom: 10px;
      width: min-content;
      height: 32px;
    }
  }
`;

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
                {/* <form onSubmit={this.handleSubmit} encType="multipart/form-data"> */}
                <img src={this.state.image} style={{ width: '200px', height: '200px' }} />
                <input type="file" name="" id="" onChange={this.handleSelectedFile} />
                <button onClick={this.handleUpload}>Upload</button>
                <input name="title" onChange={this.handleChange} placeholder='title' />
                <input name="description" onChange={this.handleChange} placeholder='description' />
                <TagInputWrapper
                    onClick={e => e.target.className !== 'MuiChip-label-135'
                        ? this.tagInput.focus()
                        : console.log('no')
                    }
                >
                    <label className='wrap'>Tags</label>
                    {displayTags}
                    <div className='container'>
                        <input
                            ref={ref => { this.tagInput = ref }}
                            onChange={this.handleTagChange}
                            onKeyDown={this.handleTagDown}
                            value={this.state.tag}
                            placeholder='Tags'
                        />
                    </div>
                </TagInputWrapper>
                <label>
                    Enter comma-separated values
                </label>
                {/* </form> */}
                <FeedImages />
            </div>
        );
    }
}

export default (withStyles(styles)(CreatePost));