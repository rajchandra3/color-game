import Config from './requests/config.js';
import Stats from './requests/components/user_stats.js';
import Store from './requests/localstorage.js';

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
const shareButton=document.querySelector('#share-button');
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
if (navigator.share) {
    shareButton.addEventListener('click', event => {
        navigator.share(share_data)
        .then(() => {
            console.log('Thanks for sharing!');
        })
        .catch(console.error);
    });
} else {
    shareButton.style.display='none';
}

if ('serviceWorker' in navigator) {
    window.addEventListener('load', ()=> {
        navigator.serviceWorker.register('/service_worker.js').then((registration)=> {
            // Registration was successful
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, (err)=> {
            // registration failed :(
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}