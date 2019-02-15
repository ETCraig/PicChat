import axios from 'axios';
import { GET_USER, USER_LOADING, CLEAR_CURRENT_USER } from './Types';

export const setUserLoading = () => {
    return {
        type: CLEAR_CURRENT_USER
    }
}

export const clearCurrentUser = () => {
    return {
        type: USER_LOADING
    }
}

export const getCurrentUser = () => dispatch => {
    dispatch(setUserLoading());
    axios.get('/api/auth').then(res => {
        dispatch({
            type: GET_USER,
            payload: res.data
        });
    }).catch(err => dispatch({
        type: GET_USER,
        payload: {}
    }));
}