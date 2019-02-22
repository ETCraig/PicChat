import React, {Component} from 'react';

import CreatePosts from '../containers/CreatePost';

class Feed extends Component {
    render() {
        return(
            <div>
                <CreatePosts />
                <h1>Feed</h1>
                <h3>You are authorized.</h3>
            </div>
        );
    }
}

export default Feed;