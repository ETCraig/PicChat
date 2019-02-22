import React, {Component} from 'react';

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
    render() {
        return(
            <div>
                <form action="/upload" method="POST" enctype="multipart/form-data">
                    <div class="custom-file mb-3">
                        <input type="file" name="file" id="file" class="custom-file-input" />
                        <label for="file" class="custom-file-label">Choose File</label>
                    </div>
                    <input type="submit" value="Submit" class="btn btn-primary btn-block" />
                </form>
            </div>
        );
    }
}

export default CreatePost;