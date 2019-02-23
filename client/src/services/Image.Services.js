import { baseURL } from '../baseURL';
import axios from 'axios';

function getJWT() {
    return localStorage.getItem("jwt")
        ? localStorage.getItem("jwt")
        : console.log("no token");
}

const uploadNewImage = async body => {
    console.log('Services')
    const jwt = getJWT();
    let auth = {
        headers: {
            Authorization: jwt,
            "Content-Type": 'application.json'
        }
    };
    console.log('Past')
    return axios.get(`${baseURL}/images/upload`, auth, body)
        .then(res => res)
        .catch(err => {
            console.log(err)
            throw err;
        });
}

export default uploadNewImage;