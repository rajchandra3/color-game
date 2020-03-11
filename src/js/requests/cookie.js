import Config from './config.js';

const cookieName = 'me_apps_access_token';
/**
 * Set cookie 
 * @param {String} cname cookie name
 * @param {string} cvalue cookie value
 * @param {Number} exp_days expires in x number of days
 */
const setCookie = (cname,cvalue,exp_days) =>{
    let d = new Date();
    d.setTime(d.getTime() + (exp_days*24*60*60*1000));
    let expires = `expires=${d.toGMTString()}`;
    document.cookie = `${cname}=${cvalue};path=/;domain=${Config.env==='production'?'rajchandra.me':'localhost'};${expires}`;
}
  
const getCookie = (cname)=> {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}
  
const checkCookie = ()=> {
    let user=getCookie(cookieName);
    if (user != "") {
        return true;
    } else {
        return false
    }
}

const removeCookie = (cname) => {
    document.cookie = `${cname}= ;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;domain=${Config.env==='production'?'rajchandra.me':'localhost'}`;
}

export default {cookieName, getCookie, setCookie, checkCookie, removeCookie}