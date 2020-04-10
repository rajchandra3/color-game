import Cookie from '../cookie.js';
import Config from '../config.js';
import Store from '../localstorage.js';
import Mixpanel from '../../components/analytics/mixpanel.js';

const signOut = () => {
    let user = Store.getItem('userData');
    Mixpanel.track('USER_LOGOUT',{
        name:user.name.fullName,
        picture:user.picture,
        uid:user.uid
    });
    var googleAuth = gapi.auth2.getAuthInstance();
    googleAuth.signOut().then(function () {
        Store.empty();
        Cookie.removeCookie(Cookie.cookieName);
        location.reload();
    });
}

const loginUsingGoogle = (raw)=>{
    // send a POST request
    axios({
        method: 'post',
        url: `${Config.urls.base_url}/auth/google`,
        data: raw
    })
    .then((response) => {
        const data=response.data;
        if(data.code===0){
            Cookie.setCookie(Cookie.cookieName,data.cookies.access_token,999);
            Store.setItem('userData',data.userData);
            Mixpanel.track_user(data.userData);
            location.reload();
        }else{
            //error
            console.log(data);
        }
    }, (error) => {
        console.log(error);
    });
}


const onSuccess = (googleUser)=> {
//   console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
    if(!Store.getItem('userData')){
        const raw = gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().id_token;
        const data = {
            id_token: raw
        }
        loginUsingGoogle(data);
    }else{
        Mixpanel.track('GOOGLE_LOGIN_FAILURE');
        console.log('userdata is available!')
    }
}
const onFailure = (error)=> {
  console.log(`Error with google signin! ${error}`);
}
const renderButton = ()=> {
  gapi.signin2.render('g-signin-btn', {
    'scope': 'profile email',
    'width': 240,
    'height': 50,
    'longtitle': true,
    'theme': 'dark',
    'onsuccess': onSuccess,
    'onfailure': onFailure
  });
}

window.onload=()=>{
    renderButton();
}

// document.getElementById('g-signin-btn').addEventListener('click',onSignIn);
document.getElementById('g-signout-btn').addEventListener('click',signOut);
