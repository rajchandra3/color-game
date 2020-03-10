import Store from './../requests/localstorage.js';
import Stats from '../requests/components/user_stats.js';

const add_user_image = (user_images)=>{
    for(let user_image of user_images){
        user_image.setAttribute('src','https://res.cloudinary.com/codepark-in/image/upload/v1540543932/cp-user-avatars/049-robot-8.png');
    }
}

const add_usernames = (usernames)=>{
    for(let username of usernames){
        username.innerHTML='Anonymous';
    }
}

const add_join_dates = (dates)=>{
    for(let date of dates){
        date.innerHTML=`You don't have an account yet!`;
    }
}

const set_metadata = ()=>{
    console.log(`setting metadata...`);
    Store.setItem('metadata',{
        fetch_stats:true,
        fetch_gameplays:true,
        last_gameplay:'na'
    })
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
    set_metadata();
    console.log(`Setting anonymous attributes...`);
    document.getElementById('g-signin-btn').style.display='block';
    document.getElementById('g-signout-btn').style.display='none';
    const user_images=document.querySelectorAll('.user-image');
    add_user_image(user_images);
    const usernames=document.querySelectorAll('.username');
    add_usernames(usernames);
    const join_dates=document.querySelectorAll('.join-date');
    add_join_dates(join_dates);
    document.querySelector('.progress-container').style.display='none';
    document.querySelector('.stats-wrapper').innerHTML=`<div class='p-3'>You must signin to unlock your stats</div>`;
    document.querySelector('.gameplays-container').style.textAlign='left';
    document.querySelector('#nav-gameplays').innerHTML=`
        <h3 class='p-4 text-monospace'>Your Gameplays</h3>
        <div class='p-3 text-monospace'>You must signin to unlock your gameplays</div>
    `;
}

export default {exec, populateLeaderboard};