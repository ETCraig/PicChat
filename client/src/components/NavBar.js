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
            <Nav className='navbar-nav ml-auto' style={{margin: '10px'}}>
                <NavItem style={{margin: '10px'}}>
                    <Link to='/Profile/5c845bf9be7413697c0fb1c5' className='nav-link' style={{ cursor: 'pointer' }}>Profile</Link>
                </NavItem>
                <NavItem style={{margin: '10px'}}>
                    <Link to='/Receipts' className='nav-link' style={{ cursor: 'pointer' }}>Receipts</Link>
                </NavItem>
                <NavItem style={{margin: '10px'}}>
                    <Link to='/Creator/testfeed' className='nav-link' style={{ cursor: 'pointer' }}>User</Link>
                </NavItem>
                <NavItem style={{margin: '10px'}}>
                    <NavLink onClick={this.onLogoutClick.bind(this)} className='nav-link' style={{ cursor: 'pointer' }}>Logout</NavLink>
                </NavItem>
            </Nav>
        );

        const authLinks = (
            <Nav>
                <NavItem style={{margin: '10px'}}>
                    <Link to='/Register'>Sign Up</Link>
                </NavItem>
                <NavItem style={{margin: '10px'}}>
                    <Link to='/Login'>Login</Link>
                </NavItem>
            </Nav>
        );
        return (
            <div>
                <Navbar style={{background: '#333'}}>
                    <Container>
                        <NavbarBrand style={{color: '#c91717'}}><strong>PicChat</strong></NavbarBrand>
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