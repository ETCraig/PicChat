import axios from 'axios';
import SetAuthToken from '../utils/SetAuthToken';
import { GET_ERRORS, SET_CURRENT_USER } from './Types';
import jwt_decode from 'jwt-decode';

export const registerUser = (userData, history) => dispatch => {
    axios.post('/api/users/register', userData)
        .then(res => history.push('/Login'))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err
        })
    );
}

export const loginUser = userData => dispatch => {
    axios.post('/api/users/login', userData).then(res => {
        const {token} = res.data;
        localStorage.setItem('jwt', token);
        SetAuthToken(token);
        const decoded = jwt_decode(token);
        dispatch(setCurrentUser(decoded));
    }).catch(err => dispatch({
        type: GET_ERRORS,
        payload: err.response.data
    }));
}

export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

export const logoutUser = () => dispatch => {
    localStorage.removeItem('jwtToken');
    SetAuthToken(false);
    dispatch(setCurrentUser({}));
}