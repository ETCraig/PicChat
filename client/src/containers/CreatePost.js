import React, {Component} from 'react';
import axios from 'axios';

import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap';
import Styled from 'styled-components';

class CreatePost extends Component {
    // constructor() {
    //     super();

    //     this.sate = {
    //         images: []
    //     }
    // }
    // componentDidMount() {
    //     axios.get('/files').then(res => {
    //         console.log('RES', res.data)
    //         this.setState({images: res.data})
    //     })
    // }
    render() {
        // let images = this.state.images;
        return(
            <div>
                <form action="/upload" method="POST" enctype="multipart/form-data">
                    <div>
                        <input type="file" name="file" id="file" />
                        <label for="file">Choose File</label>
                    </div>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}

export default CreatePost;