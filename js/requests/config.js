import Cookie from './cookie.js';
const toggler = window.location.hostname === 'color-tile.rajchandra.me' ? 1 : 0;
const env=toggler?'production':'development';

const urls={
    app:`${env==="production"?'https://www.rajchandra.me/color-tile':'http://localhost:8060/color-tile'}`,
    base_url:`${env==="production"?'https://www.rajchandra.me':'http://localhost:8060'}`
}

const getAuthConfig = ()=>{
    //return auth headers
    return {
        Authorization: Cookie.checkCookie(Cookie.cookieName)?`Bearer ${Cookie.getCookie(Cookie.cookieName)}`:null
    }
}

export default { env, urls, getAuthConfig };
