import axios from 'axios';
import { getErrors } from '../actions/ErrorActions';
import { getUpdatedUser } from '../actions/AuthActions';
import store from '../store';

function getJWT() {
    return localStorage.getItem("jwt")
        ? localStorage.getItem("jwt")
        : console.log("no token");
}

export const getUserProfile = async userId => {
    console.log(localStorage)
    try {
        console.log('HIT CALL')
        const jwt = getJWT();
        let auth = {
            headers: {
                Authorization: jwt,
                "Content-Type": "application/json"
            }
        };
        console.log(userId, auth)
        return axios.get(`/api/users/profile/${userId}`, auth)
            .then(res => res)
            .catch(err => {
                console.log(err)
                throw err
            });
    } catch (err) {
        throw err;
    }
}

export const changeUserName = async user_name => {
    const jwt = getJWT();

    let auth = {
        headers: {
            Authorization: jwt,
            "Content-Type": "application/json"
        }
    };

    return axios.post('/api/users/user_name', user_name, auth)
        .then(res => {
            if (res.status === 200) {
                store.dispatch(getUpdatedUser())
                return {
                    data: 'Name Updated Successfully.',
                    status: res.status
                }
            }
        })
        .catch(err => {
            store.dispatch(getErrors(err))
            return { message: "Didn't Update Name..." }
        });
}

export const changeEmail = async email => {
    const jwt = getJWT();

    let auth = {
        headers: {
            Authorization: jwt,
            "Content-Type": "application/json"
        }
    };

    return axios.post('/api/users/email', email, auth)
        .then(res => {
            if (res.status === 200) {
                store.dispatch(getUpdatedUser())
                return {
                    data: 'Email Updated Successfully.',
                    status: res.status
                }
            }
        })
        .catch(err => {
            store.dispatch(getErrors(err))
            return { message: "Didn't Update Email..." }
        });
}

export const changeFirstName = async first_name => {
    const jwt = getJWT();

    let auth = {
        headers: {
            Authorization: jwt,
            "Content-Type": "application/json"
        }
    };

    return axios.post('/api/users/first_name', first_name, auth)
        .then(res => {
            if (res.status === 200) {
                store.dispatch(getUpdatedUser())
                return {
                    data: 'First Name Updated Successfully.',
                    status: res.status
                }
            }
        })
        .catch(err => {
            store.dispatch(getErrors(err))
            return { message: "Didn't Update First Name..." }
        });
}

export const changeLastName = async last_name => {
    const jwt = getJWT();

    let auth = {
        headers: {
            Authorization: jwt,
            "Content-Type": "application/json"
        }
    };

    return axios.post('/api/users/last_name', last_name, auth)
        .then(res => {
            if (res.status === 200) {
                store.dispatch(getUpdatedUser())
                return {
                    data: 'Last Name Updated Successfully.',
                    status: res.status
                }
            }
        })
        .catch(err => {
            store.dispatch(getErrors(err))
            return { message: "Didn't Update Last Name..." }
        });
}

export const verifyPasswordConfirm = async password => {
    const jwt = getJWT();

    let auth = {
        headers: {
            Authorization: jwt,
            "Content-Type": "application/json"
        }
    };

    return axios.post('/api/users/verify_password', password, auth)
        .catch(res => {
            if (res.status === 200) {
                store.dispatch(getErrors({}));
                return res.status;
            }
        })
        .catch(err => {
            store.dispatch(getErrors(err));
        });
}

export const changeUserPassword = async password => {
    const jwt = getJWT();

    let auth = {
        headers: {
            Authorization: jwt,
            "Content-Type": "application/json"
        }
    };

    return axios.post('/api/users/password', password, auth)
        .then(res => {
            if (res.status === 200) {
                store.dispatch(getUpdatedUser());
                store.dispatch(getErrors({}));
            }
        })
        .catch(err => {
            store.dispatch(getErrors(err));
        });
}