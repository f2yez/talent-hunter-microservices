import React, { useEffect, useState } from "react";
import { Button, Card, Space, Table, Cell } from "antd";
import { Link } from "react-router-dom";

import LayoutPage from "../../pages/layout/LayoutPage";
import { useGlobalContext } from "../../Context/globalData";
import { getAJobByComapny, DeleteJob } from "../../apis/regester";

import "./AllJobs.css";

function AllJobs() {
  const [data, setData] = useState();
  const { userInformation } = useGlobalContext();

  const DeleteAJob = (record) => {
    DeleteJob(record.id)
      .then((res) => {
        //make filter
        const result = data.filter((jobDat) => jobDat.id !== record.id);
        setData(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    //Api to get all job for the comapny
    userInformation &&
      getAJobByComapny(userInformation.profileId, userInformation.token)
        .then((res) => {
          const KeyData = res.data.map((row) => ({
            ...row,
            key: row.id,
          }));
          setData(KeyData);
        })
        .catch((error) => {
          console.log(error);
        });
  }, [userInformation]);
  //

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
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
          <Button>
            <Link to={`/AJobDetalesForCompany/${record.id}`}>show details</Link>
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
        <Table dataSource={data} columns={columns} />
      </div>
    </LayoutPage>
  );
}

export default AllJobs;
