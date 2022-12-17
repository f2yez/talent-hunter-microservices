import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Text() {
  let navigate = useNavigate();
  useEffect(() => {
    const requestToken =
      window.location.href.match(/\?code=(.*)/) &&
      window.location.href.match(/\?code=(.*)/)[1];

    axios({
      method: "post",
      url: `https://github.com/login/oauth/access_token?client_id=${process.env.REACT_APP_clientID}&client_secret=${process.env.REACT_APP_clientSecret}&code=${requestToken}`,
      // Set the content type header, so that we get the response in JSON
      headers: {
        accept: "application/json",
      },
    })
      .then((response) => {
        const access_token = response.data.access_token;
        console.log(access_token);

        axios({
          method: "get",
          url: `https://api.github.com/user`,
          headers: {
            Authorization: "token " + access_token,
          },
        }).then((response) => {
          console.log(response);
          localStorage.setItem("token", response);
          // navigate("/");
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return <div>loading</div>;
}

export default Text;
