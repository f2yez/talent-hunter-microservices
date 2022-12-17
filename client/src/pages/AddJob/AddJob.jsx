import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Modal, Button, Space } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

import LayoutPage from "../layout/LayoutPage";
import { useGlobalContext } from "../../Context/globalData";
import CompanyData from "../../components/addJob/CompanyData/CompanyData";
import Job1 from "../../components/addJob/job-1/Job1";
import Preview from "../../components/addJob/Preview/Preview";
import Privacy from "../../components/addJob/privacy/Privacy";
import { getAJobByComapnyDraft } from "../../apis/regester";
import { useNavigatingAway } from "../../hooks/useNavigatingAway";

import "./AddJob.css";

function AddJob() {
  const { confirm } = Modal;

  const { userInformation } = useGlobalContext();

  const [current, setCurrent] = useState(0);
  const [data, setData] = useState(0);
  const [done, setDone] = useState(false);

  const [showDialog, setShowDialog] = useState(true);
  const [showDialogPrompt, confirmNavigation, cancelNavigation] = useNavigatingAway(showDialog);

  const nextData = () => {
    setCurrent(current + 1);
  };
  const makeDone = () => {
    setDone(!done);
  };
  useEffect(() => {
    userInformation &&
      getAJobByComapnyDraft(userInformation.profileId, userInformation.token)
        .then((res) => {
          setData(res.data);

          if (res.data.length > 0) {
            setCurrent(2);
          }
        })
        .catch((error) => {
          console.log(error);
        });
  }, [done, userInformation]);

  const showConfirm = () => {
    confirm({
      title: "Are you shure you want to leave the page",
      icon: <ExclamationCircleOutlined />,
      content: "you should complete the infromation for the job",
      onOk() {
        confirmNavigation();
      },
      onCancel() {
        cancelNavigation();
      },
    });
  };

  const setShowDialogData = () => {
    setShowDialog(false);
  };
  return (
    <LayoutPage>
      <div className="height-100">
        {userInformation && !userInformation.profileId ? (
          <div className="m-t-50">
            <h1>You must complete your profile details, to be able post jobs</h1>
            <Link to={"/UpDateUser"}>
              Click here to complete your information
            </Link>
          </div>
        ) : (
          <>
            <h1>Adding Job</h1>
            {showDialogPrompt && showConfirm()}
            {current == 0 && <CompanyData nextData={nextData} />}{" "}
            {current == 1 && (
              <Job1 makeDone={makeDone} data={data} nextData={nextData} />
            )}{" "}
            {current == 2 && <Preview data={data} nextData={nextData} />}{" "}
            {current == 3 && (
              <Privacy
                setShowDialogData={setShowDialogData}
                nextData={nextData}
                data={data}
              />
            )}{" "}
          </>
        )}
      </div>
    </LayoutPage>
  );
}

export default AddJob;
