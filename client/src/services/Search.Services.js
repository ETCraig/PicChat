import axios from 'axios';
import { getErrors } from '../actions/ErrorActions';
import store from '../store';

export const getSearchQuery = (query) => {
    console.log(query)
    return axios.get(`/api/search/?q=${query}&limit=5`)
        .then(res => res)
        .catch(err => { throw err });
}

export const searchBrowseResults = query => {
    return axios.get(`/api/search/?q=${query}&limit=5`)
        .then(res => res)
        .catch(err => {
            throw err;
        });
}