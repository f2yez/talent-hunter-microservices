const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

const AxiosUser = axios.create({
  baseURL: process.env.USERS_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

AxiosUser.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    let res = error.response;
    console.error("Looks like there was a problem. Status Code: " + res.status);
    return Promise.reject(error);
  }
);

// Axios.get("/user");

module.exports = {
  AxiosUser,
};
