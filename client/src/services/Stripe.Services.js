import axios from 'axios';
import store from '../store';
import { getErrors } from '../actions/ErrorActions';

function getJWT() {
    return localStorage.getItem("jwt")
        ? localStorage.getItem("jwt")
        : console.log("no token");
}

export const getPaymentMethods = () => {
    const jwt = getJWT();

    let auth = {
        headers: {
            Authorization: jwt,
            "Content-Type": 'application/json'
        }
    };

    return axios.get('/api/stripe/sources', auth)
        .then(res => res)
        .catch(err => {
            let { response: { data } } = err;
            if (data) {
                store.dispatch(getErrors(data));
            }
            throw err;
        });
}

export const createPaymentMethod = (tokenId) => {
    const jwt = getJWT();

    let auth = {
        headers: {
            Authorization: jwt,
            "Content-Type": 'application/json'
        }
    };
    console.log(tokenId)
    return axios.post('/api/stripe/create_payment_method', { tokenId }, auth)
        .then(res => res)
        .catch(err => {
            let { response: { data } } = err;
            if (data) {
                store.dispatch(getErrors(data));
            }
            throw err;
        });
}

export const deletePaymentMethod = (source_id) => {
    const jwt = getJWT();

    let auth = {
        headers: {
            Authorization: jwt,
            "Content-Type": 'application/json'
        }
    };

    return axios.delete(`/api/stripe/delete_payment_method/${source_id}`, auth)
        .then(res => res)
        .catch(err => {
            let { response: { data } } = err;
            if (data) {
                store.dispatch(getErrors(data));
            }
            throw err;
        });
}

export const subscribeToCreator = (sourceId, creatorId) => {
    const jwt = getJWT();

    let auth = {
        headers: {
            Authorization: jwt,
            "Content-Type": 'application/json'
        }
    };

    let body = {
        sourceId,
        creatorId
    }

    return axios.post('/api/stripe/subscribe', body, auth)
        .then(res => res)
        .catch(err => {
            let {
                response: { data }
            } = err;
            if (data) {
                store.dispatch(getErrors(data));
            }
            throw err;
        });
}

export const unsubscribeFromCreator = (creatorId) => {
    const jwt = getJWT();

    let auth = {
        headers: {
            Authorization: jwt,
            "Content-Type": 'application/json'
        }
    };
    console.log(creatorId);
    return axios.post('/api/stripe/unsubscribe', { creatorId }, auth)
        .then(res => res)
        .catch(err => {
            let {
                response: { data }
            } = err;
            if (data) {
                store.dispatch(getErrors(data));
            }
            throw err;
        });
}

export const getReceiptsList = async limit => {
    const jwt = getJWT();

    let auth = {
        headers: {
            Authorization: jwt,
            "Content-Type": 'application/json'
        }
    };

    return axios.get(`/api/stripe/receipts?page=1&limit=${limit}`, auth)
        .then(res => res)
        .catch(err => {
            let {
                response: { data }
            } = err;
            if (data) {
                store.dispatch(getErrors(data));
            }
            throw err;
        });
}

export const getProfileItem = async userid => {
    const jwt = getJWT();

    let auth = {
        headers: {
            Authorization: jwt,
            "Content-Type": 'application/json'
        }
    };
    console.log('GET BY _ID')
    return axios.get(`/api/stripe/item/${userid}`, auth)
        .then(res => res)
        .catch(err => {
            let {
                response: { data }
            } = err;
            if (data) {
                store.dispatch(getErrors(data));
            }
            throw err;
        });
}