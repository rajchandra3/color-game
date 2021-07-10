import Cookie from "../cookie.js";
import Config from "../config.js";
import Store from "../localstorage.js";
import Mixpanel from "../../components/analytics/mix.js";

const signOut = () => {
  let user = Store.getItem("userData");
  Mixpanel.track("USER_LOGOUT", {
    name: user.name.fullName,
    picture: user.picture,
    uid: user.uid,
  });
  Store.empty();
  Cookie.removeCookie(Cookie.cookieName);
  Cookie.removeCookie("me_apps_user");
  location.href = `${Config.urls.auth}/index.html?logout=true&redirect_url=${location.href}`;
};

// document.getElementById('login-btn').addEventListener('click',onSignIn);
document.getElementById("g-signout-btn").addEventListener("click", signOut);
