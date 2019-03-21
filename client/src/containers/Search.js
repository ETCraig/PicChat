import React, { Component } from 'react';

import {connect} from 'react-redux';
import { getSearchQuery } from '../services/Search.Services';
import { Link } from 'react-router-dom';
import Downshift, { resetIdCounter } from 'downshift';
import debounce from 'lodash.debounce';
import SearchIcon from '@material-ui/icons/Search';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;    
  width: 100%;
  max-width: 600px;
  position: relative;
  font-size: 14px;
  button {
    cursor: pointer;
    border-radius: 0px 3px 3px 0px;
    border-color: var(--PrimaryColorHover);

    background: var(--PrimaryColor);
    svg {
      color: white;
    }
    &:hover {
      background-color: var(--PrimaryColorHover);
    }
  }
  .downshift {
    width: 100%;
    input {
      height: 100%;
    }
  }
`;

const DropDownLink = styled(Link)`
  &:hover {
    text-decoration: none;
  }
  li {
    display: flex;
    height: 35px;
    padding: 10px;
    color: initial;
    align-items: center;
    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }
    .user-icon {
      width: 24px;
      height: 24px;
      border-radius: 12px;
    }
    .icon-wrapper {
    }
    .icon-wrapper {
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0.5;
      margin-right: 5px;
      svg {
        width: 24px;
        height: 24px;
      }
    }
    img {
      margin-right: 8px;
    }
  }
  ${props =>
    props.highlighted
      ? "background: rgba(0, 0, 0, 0.5);"
      : "background: white;"}
`;

const Results = styled.ul`
  ${props => !props.results && "display: none"}
  position: absolute;
  top: 100%;
  border: 1px solid #ccc;
  width: calc(100% - 59.09px);
  border-top: 0px;
  background: white;
  list-style: none;
  border-radius: 0px 0px 3px 3px;
  padding-left: 0px;
  .no-result {
    height: 32px;
    width: 100%;
    height: 40px;
    padding: 10px;
  }
  .loading {
    height: 1px;
    border: 0px;
    overflow: hidden;
  }
`;

const DownshiftWrapper = styled.div`
  display: flex;    
  #search {
    width: 100%;
    height: 32px;
    border: 1px solid #ccc;
    border-right-width: 0px;
    padding-left: 10px;
    padding-right: 10px;
  }
`;

const SearchButton = styled.button`
  display: flex;
  justify-content: center;
  width: 64px;
  height: 32px;
  background: white;
`;

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
                },
                {
                    type: "page",
                    iconClass: "fas fa-cog",
                    path: "payment-methods",
                    title: "Payment Options"
                }
            ]
        }
    }

    onSearch = debounce(async e => {
        let { isAuthenticated } = this.props;
        let searchQuery = e.target.value;
        let filteredDefaults = [];
        let { defaultResults } = this.state;
        console.log(searchQuery)
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
            console.log(searchQuery)
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
            this.setState({
                results: []
            });
        }
    }

    render() {
        let { results, searchQuery } = this.state;
        console.log(this.state);
        return (
            <Container>
        <Downshift
          itemToString={item =>
            item === null
              ? ""
              : item.type === null
              ? ""
              : item.type === "video"
              ? item.title
              : item.type === "user"
              ? item.full_name
              : ""
          }
        >
          {({
            getInputProps,
            getItemProps,
            isOpen,
            inputValue,
            highlightedIndex
          }) => (
            <div className="downshift">
              <DownshiftWrapper searchActive={isOpen && results.length > 0}>
                <input
                  value={this.state.searchQuery}
                  {...getInputProps({
                    type: "search",
                    placeholder: "Search",
                    id: "search",
                    onChange: e => {
                      e.persist();
                      this.onSearch(e);
                    },
                    onKeyDown: e => {
                      this.handleKeyDown(e);
                    }
                  })}
                />
                <SearchButton
                  {...getInputProps({
                    type: "button",
                    id: "searchbutton",
                    onClick: e => {
                      this.onSearchClick(inputValue);
                      this.setState({
                        results: []
                      });
                    }
                  })}
                >
                  <SearchIcon />
                </SearchButton>
                {isOpen && results.length > 0 && (
                  <Results results={results}>
                    {!this.state.loading && results.length !== 0
                      ? results.map((item, index) => {
                          let {
                            type,
                            handle,
                            _id,
                            title,
                            avatar,
                            path,
                            icon,
                            iconClass
                          } = item;
                          if (type === "user") {
                            return (
                              <DropDownLink
                                {...getItemProps({ item })}
                                key={index}
                                to={`/${handle}`}
                              >
                                <li>
                                  <img className="user-icon" src={avatar} />
                                  {item.full_name}
                                </li>
                              </DropDownLink>
                            );
                          } else if (type === "image") {
                            return (
                              <DropDownLink
                                highlighted={index === highlightedIndex}
                                {...getItemProps({ item })}
                                key={index}
                                to={`/watch/${_id}`}
                              >
                                <li>
                                  <div className="icon-wrapper">
                                    <i className="fas fa-video" />
                                  </div>
                                  {title}
                                </li>
                              </DropDownLink>
                            );
                          } else if (type === "page") {
                            return (
                              <DropDownLink
                                highlighted={index === highlightedIndex}
                                {...getItemProps({ item })}
                                key={index}
                                to={path}
                              >
                                <li>
                                  <div className="icon-wrapper">
                                    <i className={iconClass} />
                                  </div>
                                  {title}
                                </li>
                              </DropDownLink>
                            );
                          } 
                        })
                      : null}
                  </Results>
                )}
              </DownshiftWrapper>
            </div>
          )}
        </Downshift>
      </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated
    }
}

export default connect(mapStateToProps)(Search);