import Cookie from '../requests/cookie.js';
import LoggedIn from './logged_in.js';
import Anonymous from './anonymous.js';
import Store from '../requests/localstorage.js';

const handle_state_change = ()=>{
    let isLoggedIn=(Cookie.checkCookie(Cookie.cookieName) && Store.getItem('userData'));
    isLoggedIn?LoggedIn.exec():Anonymous.exec();
}
export default {handle_state_change};