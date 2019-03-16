import React from 'react';

function SaveBtn(props) {
    if (props.isImgSaved) {
        return <button onClick={props.handleUnsave}>Unsave</button>
    } else {
        return <button onClick={props.handleSave}>Save</button>
    }
};

export default SaveBtn;