import Cookie from '../cookie.js';
import Config from '../config.js';
import Store from '../localstorage.js';

const add = (won,attempts) => {
    axios.post(`${Config.urls.app}/gameplay/g/add`,{
        won,attempts
    },{headers: Config.getAuthConfig()})
    .then(response => {
        const users = response.data;
        console.log(`GET list users`, users);
    })
    .catch(error => console.error(error));
};


const getUserGameplays = (won,attempts) => {
    axios.get(`${Config.urls.app}/gameplay/u/serve`,
    {headers: Config.getAuthConfig()})
    .then(response => {
        const data = response.data;
        console.log(`gameplays`, data);
    })
    .catch(error => console.error(error));
};

export default {add, getUserGameplays};