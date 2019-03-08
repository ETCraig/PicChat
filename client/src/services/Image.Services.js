import axios from 'axios';
import { getErrors } from '../actions/ErrorActions';
import store from '../store';

function getJWT() {
    return localStorage.getItem("jwt")
        ? localStorage.getItem("jwt")
        : console.log("no token");
}

export const uploadNewImage = async data => {
    console.log('Services')
    const jwt = getJWT();

    let auth = {
        headers: {
            Authorization: jwt,
            Accept: "application/json",
            contentType: false,
            cache: false,
            processData: false
        }
    };
    console.log('Past')
    return axios.post('/api/images/upload', data, auth)
        .then(res => res)
        .catch(err => {
            console.log(err)
            throw err;
        });
}

export const getFeedImages = async () => {
    const jwt = getJWT();

    let auth = {
        headers: {
            Authorization: jwt,
            "Content-Type": "application/json"
        }
    };

    return axios.get('/api/images/images', auth)
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

export const saveCreatorImage = async (image_id, creator_id) => {
    const jwt = getJWT();

    let auth = {
        headers: {
            Authorization: jwt,
            "Content-Type": "application/json"
        }
    };

    let body = { creator_id }

    return axios.post(`/api/images/save/${image_id}`, body, auth)
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

export const unsaveCreatorImage = async (image_id, creator_id) => {
    const jwt = getJWT();

    let auth = {
        headers: {
            Authorization: jwt,
            "Content-Type": "application/json"
        }
    };

    let body = { creator_id }

    return axios.post(`/api/images/unsave/${image_id}`, body, auth)
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

export default uploadNewImage;