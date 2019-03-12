import axios from 'axios';
import SetAuthToken from '../utils/SetAuthToken';
import { GET_ERRORS, SET_CURRENT_USER } from './Types';
import jwt_decode from 'jwt-decode';

export function saveItem(item, selectedValue) {
    try {
        localStorage.setItem(item, selectedValue);
    } catch (error) {
        console.error("AsyncStorage error: " + error.message);
    }
}

function getJWT() {
    return localStorage.getItem("jwt")
        ? localStorage.getItem("jwt")
        : console.log("no token");
}

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
        const { token } = res.data;
        localStorage.setItem('jwt', token);
        SetAuthToken(token);
        const decoded = jwt_decode(token);
        console.log(token)
        dispatch(setCurrentUser(decoded));
    }).catch(err => dispatch({
        type: GET_ERRORS,
        payload: err.response.data
    }));
}

export const getUpdatedUser = () => dispatch => {
    const jwt = getJWT();
    let auth = {
        headers: {
            Authorization: jwt,
            "Content-Type": "application/json"
        }
    };

    return axios.get('/api/users/latest', auth)
        .then(res => {
            const { token } = res.data;
            saveItem('jwt', token);
            const decoded = jwt_decode(token);
            dispatch(setCurrentUser(decoded));
        })
        .catch(err => {
            console.log(err);
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
}

export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

export const logoutUser = () => dispatch => {
    localStorage.removeItem('jwt');
    SetAuthToken(false);
    dispatch(setCurrentUser({}));
}