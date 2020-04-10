import Cookie from '../cookie.js';
import Config from '../config.js';
import Store from '../localstorage.js';
import Profile from '../../states/logged_in.js';
import Stats from './user_stats.js';
import Mixpanel from '../../components/analytics/mixpanel.js';

const add = (won,attempts,difficulty) => {
    Mixpanel.track_gameplay({won,attempts,difficulty});
    if(Cookie.checkCookie(Cookie.cookieName)){
        axios.post(`${Config.urls.app}/gameplay/g/add`,{
            won,attempts,difficulty
        },{headers: Config.getAuthConfig()})
        .then(response => {
            const data = response.data;
            if(data.code==0){
                //update metadata
                Store.setItem('metadata',{
                    fetch_stats:true,
                    fetch_gameplays:true,
                    last_gameplay:Date.now()
                });
                Stats.currentUserStats();
                getUserGameplays();
                console.log('Saved Gameplay and updated metadata');
            }else{
                console.log(`Error! couldn't save your gameplay`);
            }
        })
        .catch(error => console.error(error));
    }else{
        console.log('user needs to signup first, saving in localstorage...');
        let user=Store.getItem('user');
        user.profile.score+=won?(50/attempts):0;
        user.profile.total_success+=won?1:0;
        user.profile.total_failure+=won?0:1;
        user.profile.total_game_play+=1;
        user.gameplays.push({
            won,attempts,difficulty,user:'Anonymous',createdAt:Date.now()
        })
        Store.setItem('user',user);
        Stats.currentUserStats();
        getUserGameplays();
    }
};

const getUserGameplays = () => {
    if(Cookie.checkCookie(Cookie.cookieName)){
        const metadata=Store.getItem('metadata');
        if(metadata && metadata.fetch_gameplays){
            axios.get(`${Config.urls.app}/gameplay/u/serve`,
            {headers: Config.getAuthConfig()})
            .then(response => {
                const data = response.data;
                if(data.code==0){
                    Store.setItem('gameplays',data.payload.gameplays);
                    //update metadata
                    let metadata = Store.getItem('metadata');
                    Store.setItem('metadata',{
                        fetch_stats:metadata.stats,
                        fetch_gameplays:false,
                        last_gameplay:metadata.last_gameplay
                    });
                    Profile.populateGameplays(data.payload.gameplays);
                    console.log('Stats: Fetched new data and refreshed user gameplays');
                }else{
                    console.log(`Error!`, data);
                }
            })
            .catch(error => console.error(error));
        }else{
            Profile.populateGameplays(Store.getItem('gameplays'));
            console.log('Gameplays: Not fetching gameplays since no new game has been played!');
        }
    }else{
        let user = Store.getItem('user');
        Profile.populateGameplays(user.gameplays);
    }
};

export default {add, getUserGameplays};