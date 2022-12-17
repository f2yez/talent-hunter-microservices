const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

const AxiosCompand = axios.create({
  baseURL: process.env.COMPAND_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

AxiosCompand.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    let res = error.response;
    console.error("Looks like there was a problem. Status Code: " + res.status);
    return Promise.reject(error);
  }
);


module.exports = {
  AxiosCompand,
};
