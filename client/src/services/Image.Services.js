import axios from 'axios';

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

export default uploadNewImage;