import { baseURL } from '../baseURL';
import axios from 'axios';

function getJWT() {
    return localStorage.getItem("jwt")
        ? localStorage.getItem("jwt")
        : console.log("no token");
}

export const uploadNewImage = async (data) => {
    console.log('Services')
    const jwt = getJWT();
    let auth = {
        headers: {
            Authorization: jwt,
            "Content-Type": 'application.json'
        }
    };
    console.log('Past')
    await axios.post('/api/images/upload', data)
        .then(res => {
            console.log('res', res.data)
            return res;
        })
        .catch(err => {
            console.log(err)
            throw err;
        });
}

export default uploadNewImage;