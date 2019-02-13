import axios from 'axios';
import { GET_USER, USER_LOADING, CLEAR_CURRENT_USER } from './Types';

export const setUserLoading = () => {
    return {
        type: USER_LOADING
    }
}

export const clearCurrentUser = () => {
    return {
        type: CLEAR_CURRENT_USER
    }
}

export const clearCurrentUser = () => {
    dispatchEvent(setUserLoading());
    axios.get('/api/auth').then(res => {
        dispatchEvent({
            type: GET_USER,
            payload: res.data
        });
    }).catch(err => dispatch({
        type: GET_USER,
        payload: {}
    }));
}