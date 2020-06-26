import Config from './requests/config.js';
import Stats from './requests/components/user_stats.js';
import Store from './requests/localstorage.js';
import Mixpanel from './components/analytics/mix.js';

//put css in html
if(Config.env==='production'){
    document.querySelector('head').innerHTML += `
    <link rel="stylesheet" type="text/css" href="/src/css/min/color.min.css">
    <link rel="stylesheet" type="text/css" href="/src/css/min/profile.min.css">
    `;
}else{
    document.querySelector('head').innerHTML += `
    <link rel="stylesheet" type="text/css" href="/src/css/color.css">
    <link rel="stylesheet" type="text/css" href="/src/css/profile.css">
    `;
}

//leaderboard trigger button
document.getElementById('nav-leaderboard-tab').addEventListener('click',Stats.leaderboard);

//share button event listener
let shareButton=document.querySelector('#share-button');
if (navigator.share) {
    console.log('was here');
    const metas=document.querySelectorAll('meta');
    let description_text="";
    for(let meta of metas){
        if(meta.getAttribute('name')=='description')
            description_text=meta.getAttribute('content');
    }
    const share_data={
        title: document.title,
        text: description_text,
        url: document.URL
    };
    let user = Store.getItem('user');
    share_data.text=`Hey I scored ${user.profile.score} points in color tile game, it's super easy and fun to play. Can you beat my score?`;
    shareButton.addEventListener('click', event => {
        Mixpanel.track('SHARE_BUTTON_CLICKED');
        navigator.share(share_data)
        .then(() => {
            Mixpanel.track('SHARE_SUCCESSFUL',share_data);
            console.log('Thanks for sharing!');
        })
        .catch((e)=>{
            console.log(e);
            Mixpanel.track('SHARE_UNSUCCESSFUL',share_data);
        });
    });
} else {
    shareButton.style.display='none';
}

document.querySelector('#nav-profile').addEventListener('click',Mixpanel.track('PROFILE_SECTION_VIEWED'));

// register service worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', ()=> {
        navigator.serviceWorker.register('/serviceWorker.js').then((registration)=> {
            // Registration was successful
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, (err)=> {
            // registration failed :(
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}