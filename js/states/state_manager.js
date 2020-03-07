import Cookie from '../requests/cookie.js';
import LoggedIn from './logged_in.js';
import Anonymous from './anonymous.js';

const handle_state_change = ()=>{
    let isLoggedIn=Cookie.checkCookie(Cookie.cookieName);
    console.log(isLoggedIn);
    if(isLoggedIn){
        LoggedIn.exec();
    }else{
        Anonymous.exec();
    }
}
export default {handle_state_change};