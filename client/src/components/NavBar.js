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
    Container
} from 'reactstrap';
import PropTypes from 'prop-types';
import Search from '../containers/Search';

class NavBar extends Component {

    componentDidMount() {
        // const {history} = this.props;
    }
    onLogoutClick(e) {
        e.preventDefault();
        this.props.logoutUser();
    }
    render() {
        const { isAuthenticated } = this.props.auth;
        const {history} = this.props;
        // let {location: {pathname} } = history;
        console.log(isAuthenticated)
        console.log(history)
        return (
            isAuthenticated ? (
                <div>
                <Navbar style={{ background: isAuthenticated ? '#000' : 'transparent' }} >
                    <Container>
                        <Link to='/Feed'><NavbarBrand style={{ color: isAuthenticated ? '#c91717' : 'transparent', fontSize: '2rem' }}><strong>PicChat</strong></NavbarBrand></Link>
                            <Search history={history} />
                        <Nav className='navbar-nav ml-auto' style={{ display: 'flex', flexDirection: 'row' }}>
                            <NavItem style={{ margin: '10px' }}>
                                <Link to='/Profile/5c845bf9be7413697c0fb1c5' className='nav-link' style={{ cursor: 'pointer', color: '#fff' }}>Profile</Link>
                            </NavItem>
                            <NavItem style={{ margin: '10px' }}>
                                <Link to='/Library' className='nav-link' style={{ cursor: 'pointer',color: '#fff' }}>Library</Link>
                            </NavItem>
                            <NavItem style={{ margin: '10px' }}>
                                <Link to='/Receipts' className='nav-link' style={{ cursor: 'pointer', color: '#fff' }}>Receipts</Link>
                            </NavItem>
                            <NavItem style={{ margin: '10px' }}>
                            <Link to='/Creator/practice' className='nav-link' style={{ cursor: 'pointer', color: '#fff' }}>Creator</Link>
                            </NavItem>
                            <NavItem style={{ margin: '10px' }}>
                                <NavLink onClick={this.onLogoutClick.bind(this)} className='nav-link' style={{ cursor: 'pointer', color: '#ccc' }}>Logout</NavLink>
                            </NavItem>
                        </Nav>
                    </Container>
                </Navbar>
            </div>
            ) : <div/>
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