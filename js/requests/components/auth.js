import Cookie from '../cookie.js';
import Config from '../config.js';
import Store from '../localstorage.js';
import StateManager from '../../states/state_manager.js';

const onSignIn = () => {
    const raw = gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().id_token;
    const data = {
        id_token: raw
    }
    loginUsingGoogle(data);
}

const signOut = () => {
    var googleAuth = gapi.auth2.getAuthInstance();
    googleAuth.signOut().then(function () {
        Store.empty();
        Cookie.removeCookie(Cookie.cookieName);
        StateManager.handle_state_change();
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
            StateManager.handle_state_change();
        }else{
            signOut();
            //error
            console.log(data);
        }
    }, (error) => {
        console.log(error);
    });
}

document.getElementById('g-signin-btn').addEventListener('click',onSignIn);
document.getElementById('g-signout-btn').addEventListener('click',signOut);

export default {onSignIn, signOut, loginUsingGoogle};