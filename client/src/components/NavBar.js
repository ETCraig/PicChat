import React, { Component } from 'react';

import { connect } from 'react-redux';
import { clearCurrentUser } from '../actions/UserActions';
import { Link } from 'react-router-dom';
import { logoutUser } from '../actions/AuthActions';
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container,
} from 'reactstrap';
import PropTypes from 'prop-types';

class NavBar extends Component {

    onLogoutClick(e) {
        e.preventDefault();
        this.props.logoutUser();
    }
    render() {
        const { isAuthenticated } = this.props.auth;
        console.log(isAuthenticated)

        const userLinks = (
            <Nav navbar>
                <NavItem>
                    <Link to='/profile:id' style={{ cursor: 'pointer' }}>Profile</Link>
                </NavItem>
                <NavItem>
                    <Link to='/library' style={{ cursor: 'pointer' }}>Library</Link>
                </NavItem>
                <NavItem>
                    <NavLink onClick={this.onLogoutClick.bind(this)} style={{ cursor: 'pointer' }}>Logout</NavLink>
                </NavItem>
            </Nav>
        );

        const authLinks = (
            <Nav navbar>
                <NavItem>
                    <Link to='/Register'>Sign Up</Link>
                </NavItem>
                <NavItem>
                    <Link to='/Login'>Login</Link>
                </NavItem>
            </Nav>
        );
        return (
            <div>
                <Navbar color='dark'>
                    <Container>
                        <NavbarBrand>PicChat</NavbarBrand>
                        {isAuthenticated ? userLinks : authLinks}
                    </Container>
                </Navbar>
            </div>
        );
    }
}

NavBar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => {
    return {
        auth: state.auth,
        errors: state.errors
    }
}

export default connect(mapStateToProps, { logoutUser, clearCurrentUser })(NavBar);