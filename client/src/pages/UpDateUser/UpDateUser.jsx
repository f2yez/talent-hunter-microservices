import React from "react";

import { useGlobalContext } from "../../Context/globalData";
import UpdateTalent from "../../components/UpdateTalent/UpdateTalent";

import "./UpDateUser.css";
import UpdateCompany from "../../components/UpdateCompany/UpdateCompany";

function UpDateUser() {
  const { userInformation } = useGlobalContext();

  return (
    <>
      {userInformation && userInformation.type === "talent" ? (
          <UpdateTalent />
      ) : (
        <UpdateCompany />
      )}
    </>
  );
}

export default UpDateUser;
