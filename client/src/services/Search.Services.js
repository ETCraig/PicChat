import axios from 'axios';
import { getErrors } from '../actions/ErrorActions';
import store from '../store';

export const getSearchQuery = (query) => {
    return axios.get(`/api/search/?q=${query}$limit=5`)
    .then(res => res)
    .catch(err => {throw err});
}