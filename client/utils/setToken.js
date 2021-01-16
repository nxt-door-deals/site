import axios from "axios";

const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common.Authorization = "Bearer " + token;
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
};

const setApiKey = (apiKey) => {
  console.log(apiKey);
  if (apiKey) {
    axios.defaults.headers.common["api-key"] = apiKey;
  } else {
    delete axios.defaults.headers.common["api-key"];
  }
};

export { setAuthToken, setApiKey };
