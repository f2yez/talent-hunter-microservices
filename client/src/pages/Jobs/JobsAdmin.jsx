import React, { useEffect, useState } from "react";
import { Table, Tag, Space, Button } from "antd";

import LayoutPage from "../layout/LayoutPage";
import { DeleteJob, getAllJobs, makeRelesForJob } from "../../apis/regester";
import { useGlobalContext } from "../../Context/globalData";
import { Link } from "react-router-dom";
import io from "socket.io-client";

function JobsAdmin() {
  const [jobData, setJobData] = useState();
  const [done, setDone] = useState();

  const { userInformation } = useGlobalContext();
  let socket;

  const MakeAprove = (record) => {
    // make aprove by id
    userInformation &&
      makeRelesForJob(record.id, userInformation.token)
        .then((res) => {
          setDone(!done);
          if (res.data[2]) {
            socket = io("http://localhost:5009");
            res.data.pop();
            socket.emit("data", res.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
  };

  const DeleteAJob = (record) => {
    DeleteJob(record.id)
      .then((res) => {
        //make filter
        const result = jobData.filter((jobDat) => jobDat.id !== record.id);
        setJobData(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    userInformation &&
      getAllJobs(userInformation.token)
        .then((res) => {
          const KeyData = res.data.map((row) => ({
            ...row,
            key: row.id,
          }));
          setJobData(KeyData);
        })
        .catch((error) => {
          console.log(error);
        });
  }, [done, userInformation]);
  const columns = [
    {
      title: "Tile",
      dataIndex: "title",
      key: "name",
    },
    {
      title: "Job Location",
      dataIndex: "JobLocation",
      key: "email",
    },
    {
      title: "complet",
      dataIndex: `draft`,
      key: "websit",
      render: (text, record) => <>{record.draft ? "Yes" : "No"}</>,
    },
    {
      title: "release",
      dataIndex: `releaseJob`,
      key: "websit",
      render: (text, record) => <>{record.releaseJob ? "Yes" : "No"}</>,
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button
            disabled={record.releaseJob || !record.draft}
            onClick={() => MakeAprove(record)}
          >
            aprove
          </Button>
          <Button>
            <Link to={`/AJobByAdmin/${record.id}`}>show details</Link>
          </Button>
          <Button danger onClick={() => DeleteAJob(record)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <LayoutPage>
      <div className="height-100">
        <Table dataSource={jobData} columns={columns} />
      </div>
    </LayoutPage>
  );
}

export default JobsAdmin;
