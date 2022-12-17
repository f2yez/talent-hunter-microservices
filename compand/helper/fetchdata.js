const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

const AxiosJob = axios.create({
  baseURL: process.env.JOB_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

AxiosJob.interceptors.response.use(
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
  AxiosJob,
};
