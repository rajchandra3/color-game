import cookie from './cookie.js';
const toggler = 0;
const env=toggler?'production':'development';

const urls={
    app:`${env==="production"?'https://www.rajchandra.me/color-tile':'http://localhost:8060/color-tile'}`,
    base_url:`${env==="production"?'https://www.rajchandra.me':'http://localhost:8060'}`
}

const getAuthConfig = ()=>{
    //return auth headers
    return {
        Authorization: `Bearer ${cookie.getCookie(cookie.cookieName)}`
    }
}

export default { env, urls, getAuthConfig };
