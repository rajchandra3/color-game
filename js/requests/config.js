import cookieManager from './cookie';

const env='production';

const base_url=`${env==="production"?'https://www.rajchandra.me/color-tile':'http://localhost:8060/color-tile'}`;

const getAuthConfig = ()=>{
    //return auth headers
    return {
        Authorization: `Bearer ${cookieManager.getCookie()}`
    }
}

export default {env, base_url, getAuthConfig};
