import axios from "axios";

const setAuthToken = (tokenType) => {
  let token =
    tokenType === "auth"
      ? localStorage.getItem("nddToken")
      : tokenType === "sendgrid"
      ? process.env.NEXT_PUBLIC_SENDGRID_API_KEY
      : null;

  if (token) {
    axios.defaults.headers.common.Authorization = "Bearer " + token;
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
};

const setApiKey = (apiKey) => {
  if (apiKey) {
    axios.defaults.headers.common["api-key"] = apiKey;
  } else {
    delete axios.defaults.headers.common["api-key"];
  }
};

export { setAuthToken, setApiKey };
