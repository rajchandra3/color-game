import Store from './../requests/localstorage.js';
import Gameplay from '../requests/components/gameplay.js';
import Stats from '../requests/components/user_stats.js';
import Setting from '../components/setting.js';

//get user data
const userData=Store.getItem('userData');

const add_user_image = (user_images)=>{
    for(let user_image of user_images){
        user_image.setAttribute('src',userData.picture);
    }
}

const add_usernames = (usernames)=>{
    for(let username of usernames){
        username.innerHTML=userData.name.fullName;
    }
}

const add_join_dates = (dates)=>{
    for(let date of dates){
        date.innerHTML=`Joined ${moment(new Date(userData.createdAt), "YYYYMMDD").fromNow()}`;
    }
}

const populateStats = (stats)=>{
    document.getElementById('stats-attempts-count').innerHTML=stats.total_game_play;
    document.getElementById('stats-success-count').innerHTML=stats.total_success;
    document.getElementById('stats-total-points').innerHTML=stats.score.toFixed(1);
}

const populateGameplays = (gameplays)=>{
    $(".tbody-gp tr").remove(); 
    for(let gameplay of gameplays){
        $('table').find('.tbody-gp').append(`
            <tr>
                <td>${moment(new Date(gameplay.createdAt), "YYYYMMDD").fromNow()}</td>
                <td>${gameplay.won?'success':'failure'}</br><small>(${gameplay.difficulty})</small></td>
                <td>${gameplay.attempts}</td>
            </tr>`);
    }
}
let update_progress_bar = (user)=>{
    console.log('updating progress bar...');
    if(user.total_game_play){
        const success_percentage = user.total_success/user.total_game_play*100;
        const failure_percentage = user.total_failure/user.total_game_play*100;
        document.getElementById('success-pbar').style.width = `${success_percentage}%`;
        document.getElementById('success-pbar').setAttribute('aria-valuenow',`${success_percentage}`);
        document.getElementById('success-pbar').innerHTML=`<b>wins (${user.total_success})</b>`;
        document.getElementById('failure-pbar').style.width = `${failure_percentage}%`;
        document.getElementById('failure-pbar').setAttribute('aria-valuenow',`${failure_percentage}`);
        document.getElementById('failure-pbar').innerHTML=`<b>losses (${user.total_failure})</b>`;
        document.getElementById('temp-pbar').style.width = `0%`;
        document.getElementById('temp-pbar').setAttribute('aria-valuenow','0');
    }else{
        document.getElementById('temp-pbar').style.width = `100%`;
        document.getElementById('temp-pbar').setAttribute('aria-valuenow','100');
        document.getElementById('temp-pbar').innerHTML=`<b>You haven't played any game!</b>`;
    }
}

const populateLeaderboard = (users)=>{
    $(".tbody-leaderboard tr").remove(); 
    let i = 0;
    for(let player of users){
        $('table').find('.tbody-leaderboard').append(`
            <tr>
                <th>${++i}</th>
                <td>${player.user.name.fullName.length>15?player.user.name.fullName.slice(0,15)+'...':player.user.name.fullName}</td>
                <td>${player.total_game_play}</td>
                <td>${player.score.toFixed(1)}</td>
            </tr>
        `);
    }
}

const exec = ()=>{
    console.log(`Setting logged in user's attributes...`);
    document.getElementById('login-btn').style.display='none';
    document.getElementById('g-signout-btn').style.display='block';
    const user_images=document.querySelectorAll('.user-image');
    add_user_image(user_images);
    const usernames=document.querySelectorAll('.username');
    add_usernames(usernames);
    const join_dates=document.querySelectorAll('.join-date');
    add_join_dates(join_dates);

    Stats.currentUserStats(); //get new stats
    Gameplay.getUserGameplays(); //get new gameplays
    Setting.show(); //show settings
}

export default {exec, populateStats, populateGameplays, update_progress_bar, populateLeaderboard};