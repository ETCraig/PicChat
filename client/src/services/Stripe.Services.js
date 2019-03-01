import axios from 'axios';
import store from '../store';
import { getErrors } from '../actions/ErrorActions';

function getJWT() {
    return localStorage.getItem("jwt")
        ? localStorage.getItem("jwt")
        : console.log("no token");
}

export const getPaymentMethods = () => {
    console.log('Lols Hit')
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
    return axios.post('/api/stripe/create_payment_method', {tokenId}, auth)
        .then(res => res)
        .catch(err => {
            let { response: { data } } = err;
            if (data) {
                store.dispatch(getErrors(data));
            }
            throw err;
        });
}

export const deletePaymentMethod = sourceId => {
    const jwt = getJWT();
    let auth = {
        headers: {
            Authorization: jwt,
            "Content-Type": 'application/json'
        }
    };

    return axios.delete(`/api/stripe/delete_payment_method/${sourceId}`, auth )
        .then(res => res)
        .catch(err => {
            let { response: { data } } = err;
            if (data) {
                store.dispatch(getErrors(data));
            }
            throw err;
        });
}