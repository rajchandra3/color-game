import {env, base_url, getAuthConfig} from './config';

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

const getGlobalStats = () => {
    axios.get(`${base_url}/get/stats/global`)
        .then(response => {
            console.log(response.data);
        })
        .catch(error => console.error(error));
};