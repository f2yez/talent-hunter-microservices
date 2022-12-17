
import React from "react";
import { Link } from "react-router-dom";

import "./SignUp.css";

function SignUp() {

  return (<div className="home-banner h-100">
      <div class="home-banner-holder" style={{ textAlign: "center" }}>
        <div class="home-banner-content">
            <div>
              <div class="home-card-logo">
                <h1>Sing up to the Talent Henter</h1>
              </div>
            </div>
            <p>Select how you want to start Talent or Company. Create an efficient and enjoyable work experience.</p>
            <div class="home-banner-content-operations">
              <Link className="ant-btn ant-btn-round ant-btn-primary" to="/CompanySignUp">
                <span>Getting start as Company</span>
              </Link>
              <Link className="ant-btn ant-btn-round ant-btn-default ant-btn-background-ghost" to="/TalentSignUp">
                <span>Getting start as Talent</span>
              </Link>
            </div>
        </div>
        <Link className="have-account" to="/SingIn">
            I have Account
          </Link>
      </div>
    </div>);
}

export default SignUp;
