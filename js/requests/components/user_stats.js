import Config from '../config.js';
import Cookie from '../cookie.js';

const updateGlobalSucessfulGuessCount = () => {
    axios.get(`${base_url}/update/count/responses/success`)
        .then(response => {
            console.log(response.data);
        })
        .catch(error => console.error(error));
};

const updateGlobalFailedGuessCount = () => {
    axios.get(
        `${base_url}/update/count/responses/failed`,
        getAuthConfig()
        )
        .then(response => {
            console.log(response.data);
        })
        .catch(error => console.error(error));
};

const currentUserStats = () => {
    axios.get(`${Config.urls.app}/stats/u/serve`,{headers:Config.getAuthConfig()})
    .then(response => {
        console.log(response.data);
    })
    .catch(error => console.error(error));
};

export default {currentUserStats}