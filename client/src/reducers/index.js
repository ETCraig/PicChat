import {combineReducers} from 'redux';
import AuthReducer from './AuthReducer';
import ErrorReducer from './ErrorReducer';
import UserReducer from './UserReducer';

export default combineReducers({
    auth: AuthReducer,
    errors: ErrorReducer,
    user: UserReducer
});