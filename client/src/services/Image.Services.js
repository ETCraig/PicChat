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

export const getFeedImages = async limit => {
    const jwt = getJWT();

    let auth = {
        headers: {
            Authorization: jwt,
            "Content-Type": "application/json"
        }
    };

    return axios.get(`api/images/feed?page=1&limit=${limit}`, auth)
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

export const getSingleImage = async (image_id) => {
    const jwt = getJWT();

    let auth = {
        headers: {
            Authorization: jwt,
            "Content-Type": "application/json"
        }
    };

    return axios.get(`/api/images/single/${image_id}`, auth)
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

export const saveCreatorImage = async (image_id) => {
    const jwt = getJWT();

    let auth = {
        headers: {
            Authorization: jwt,
            "Content-Type": "application/json"
        }
    };
    console.log(image_id)
    return axios.post(`/api/images/save/${image_id}`, auth)
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

export const unsaveCreatorImage = async (image_id) => {
    const jwt = getJWT();

    let auth = {
        headers: {
            Authorization: jwt,
            "Content-Type": "application/json"
        }
    };

    return axios.post(`/api/images/unsave/${image_id}`, auth)
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

export const likeCreatorImage = async (image_id) => {
    const jwt = getJWT();

    let auth = {
        headers: {
            Authorization: jwt,
            "Content-Type": "application/json"
        }
    };

    return axios.post(`/api/images/like/${image_id}`, auth)
        .then(res => res)
        .catch(err => {
            let {
                response: { data }
            } = err;
            if (data) {
                store.dispatch(getErrors(data));
            }
            throw err;
        })
}

export const dislikeCreatorImage = async (image_id) => {
    const jwt = getJWT();

    let auth = {
        headers: {
            Authorization: jwt,
            "Content-Type": "application/json"
        }
    };

    return axios.post(`/api/images/dislike/${image_id}`, auth)
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