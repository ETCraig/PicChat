import React, {Component} from 'react';

import CreatePosts from '../containers/CreatePost';

class Feed extends Component {
    render() {
        return(
            <div>
                <CreatePosts />
            </div>
        );
    }
}

export default Feed;