import Config from '../config.js';
import Cookie from '../cookie.js';
import UIMaker from '../../main.js';

const currentUserStats = () => {
    axios.get(`${Config.urls.app}/stats/u/serve`,{headers:Config.getAuthConfig()})
    .then(response => {
        const data=response.data;
        if(data.code==0){
            UIMaker.update_profile_data(data.payload.data);
        }else{
            console.log('user not found');
        }
    })
    .catch(error => console.error(error));
};

export default {currentUserStats}