import Cookie from '../requests/cookie.js';
import LoggedIn from './logged_in.js';
import Anonymous from './anonymous.js';
import Store from '../requests/localstorage.js';

const handle_state_change = async ()=>{
    let userDataCookie = Cookie.getCookie('me_apps_user');
    let userDataStoreItem = Store.getItem('userData');
    userDataCookie && !userDataStoreItem?Store.setItem('userData',await JSON.parse(atob(userDataCookie))):null;
    let isLoggedIn=userDataCookie?true:false;
    isLoggedIn?LoggedIn.exec(userDataStoreItem || Store.getItem('userData')):Anonymous.exec();
}
export default {handle_state_change};