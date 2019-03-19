import React, { Component } from 'react';

import { getSearchQuery } from '../services/Search.Services';
import { Link } from 'react-router-dom';
import Downshift, { resetIdCounter } from 'downshift';
import debounce from 'lodash.debounce';
import SearchIcon from '@material-ui/core/icons/Search';
import Styled from 'styled-components';

class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchQuery: '',
            results: [],
            defaultResults: [
                {
                    type: "page",
                    iconClass: "fas fa-cog",
                    path: "/edit-password",
                    title: "Change Password"
                },
                {
                    type: "page",
                    iconClass: "fas fa-cog",
                    path: "/Library",
                    title: "Library"
                },
                {
                    type: "page",
                    iconClass: "fas fa-cog",
                    path: "/edit",
                    title: "Edit Profile"
                }
            ]
        }
    }

    onSearch = debounce(async e => {
        let { isAuthenticated } = this.props;
        let searchQuery = e.target.value;
        let filteredDefaults = [];
        let { defaultResults } = this.state;

        if (searchQuery) {
            if (isAuthenticated) {
                defaultResults.find(elem => {
                    let { title } = elem;
                    title = title.toLowerCase();
                    if (title.includes(searchQuery.toLowerCase())) {
                        filteredDefaults.push(elem);
                    }
                });
            }
            this.setState({ searchQuery });
            getSearchQuery(searchQuery)
                .then(({ data, status }) => {
                    if (status === 200) {
                        this.setState({
                            results: data.concat(filteredDefaults),
                        });
                    }
                })
                .catch(err => {
                    throw err;
                });
        } else {
            this.setState({
                results: []
            });
        }
    }, 300);

    handleKeyDown = e => {
        let { history } = this.props;
        let { searchQuery } = this.state;
        let { keyCode } = e;

        if (searchQuery && keyCode === 13) {
            history.push(`/Search?q=${searchQuery}`);
            this.setState({
                results: []
            });
        }
    }

    onSearchClick = () => {
        let { history } = this.props;
        let { searchQuery } = this.state;
        if (searchQuery) {
            history.push(`/Search?q=${searchQuery}`);
            this.UNSAFE_componentWillMount.searchQuery({
                results: []
            });
        }
    }

    render() {
        let { results, searchQuery } = this.state;
        console.log(this.state);
        return (
            <div>
                
            </div>
        );
    }
}

export default Search;