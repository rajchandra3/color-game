import Config from '../config.js';
import Cookie from '../cookie.js';
import Store from '../localstorage.js';
import Profile from '../../states/logged_in.js';
import Anonymous from '../../states/anonymous.js';

const currentUserStats = () => {
    const metadata=Store.getItem('metadata');
    if(metadata && metadata.fetch_stats){
        axios.get(`${Config.urls.app}/stats/u/serve`,{headers:Config.getAuthConfig()})
        .then(response => {
            const data=response.data;
            if(data.code==0){
                Store.setItem('stats',data.payload.data);
                //update metadata
                let metadata = Store.getItem('metadata');
                Store.setItem('metadata',{
                    fetch_stats:false,
                    fetch_gameplays:metadata.fetch_gameplays,
                    last_gameplay:metadata.last_gameplay
                });
                Profile.populateStats(data.payload.data);
                Profile.update_progress_bar(data.payload.data);
                console.log('Stats: Fetched new data and refreshed stats and progrees bar');
            }else{
                console.log('user not found');
            }
        })
        .catch(error => console.error(error));
    }else{
        console.log('Stats: Not fetching stats since no new game has been played!');
        const stats_data=Store.getItem('stats');
        Profile.populateStats(stats_data);
        Profile.update_progress_bar(stats_data);
    }
};

const leaderboard = ()=>{
    document.getElementById('leaderboard-loader').style.display = 'block';//start loading
    axios.get(`${Config.urls.app}/stats/g/serve`,{headers:Config.getAuthConfig()})
    .then(response => {
        document.getElementById('leaderboard-loader').style.display = 'none';//stop loading
        const data=response.data;
        if(data.code==0){
            Cookie.checkCookie(Cookie.cookieName)?Profile.populateLeaderboard(data.payload.users):Anonymous.populateLeaderboard(data.payload.users);
            console.log('Leaderboard: Fetched new leaderboard');
        }else{
            console.log('Error! Issue in fetching leaderboard');
        }
    })
    .catch(error => console.error(error));
}
export default {currentUserStats, leaderboard}