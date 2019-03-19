import React, {Component} from 'react';

import {Link} from 'react-router-dom';

class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchParameter: '',
            searchInput: '',
            users: [],
            filteredUsers: [],
            currentPage: 1,
            usersPerPage: 10,
            filteredClicked: false
        }
    }
    render() {
        return(
            <div>

            </div>
        );
    }
}

export default Search;