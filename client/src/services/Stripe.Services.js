import axios from 'axios';

function getJWT() {
    return localStorage.getItem("jwt")
        ? localStorage.getItem("jwt")
        : console.log("no token");
}

export const addCard = async (token, creator_id, promo_code) => {
    const jwt = getJWT();
    let auth = {
        headers: {
            Authorization: jwt,
            "Content-Type": "application/json"
        }
    };
    let body = {
        tokenID: token,
        creatorID: creator_id,
        promo: promo_code
    };
    return axios.post('/stripe/add_card_sub', auth, body)
        .then(res => res)
        .catch(err => {
            console.log(err)
            throw err
        });
}
