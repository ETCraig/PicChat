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
            <Nav className='navbar-nav ml-auto' navbar>
                <NavItem>
                    <Link to='/Profile/5c7b717ee44e6572d8e4e573' className='nav-link' style={{ cursor: 'pointer' }}>Profile</Link>
                </NavItem>
                <NavItem>
                    <Link to='/library' className='nav-link' style={{ cursor: 'pointer' }}>Library</Link>
                </NavItem>
                <NavItem>
                    <Link to='/Creator/product1' className='nav-link' style={{ cursor: 'pointer' }}>User</Link>
                </NavItem>
                <NavItem>
                    <NavLink onClick={this.onLogoutClick.bind(this)} className='nav-link' style={{ cursor: 'pointer' }}>Logout</NavLink>
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