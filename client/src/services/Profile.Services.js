import { baseURL } from '../baseURL';
import axios from 'axios';

function getJWT() {
    return localStorage.getItem("jwt")
      ? localStorage.getItem("jwt")
      : console.log("no token");
  }

export const getUserProfile = async userId => {
    console.log(localStorage)
    try{
    console.log('HIT CALL')
    const JWT = getJWT();
    let auth = {
        headers: {
            Authorization: JWT,
            "Content-Type": "application/json"
        }
    };
    console.log(userId, auth)
    await axios.get(`/api/users/profile/${userId}`, auth)
        .then(res => {
            console.log(res)
            return res;
        })
        .catch(err => {
            console.log(err)
            throw err
        });
    }catch (err) {
        throw err;
    }
}