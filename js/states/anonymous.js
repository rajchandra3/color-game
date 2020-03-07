import Store from './../requests/localstorage.js';

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
    document.querySelector('.stats-wrapper').innerHTML=`You must signin to unlock your stats!`;
    document.querySelector('.gameplays-container').style.display='none';
}

export default {exec};