import { GET_ERRORS, CLEAR_ERRORS } from './Types';

export const getErrors = errors => dispatch => {
    dispatch({
        type: GET_ERRORS,
        payload: errors
    });
    setTimeout(() => dispatch({ type: CLEAR_ERRORS, payload: {} }), 5000);
}