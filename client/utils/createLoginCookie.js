import cookie from "../utils/cookieInit";
import keys from "../utils/keys";

const createCookie = (token) => {
  let d = new Date();
  d.setMinutes(d.getMinutes() + 1440);

  cookie.set("nddToken", token, {
    domain: keys.DOMAIN,
    path: "/",
    expires: d,
    sameSite: keys.SAME_SITE_COOKIE_SETTING,
    secure: keys.SECURE_COOKIE,
  });
};

export default createCookie;
