import { Row, Col, Button, Divider } from "antd";
import React, { useEffect, useState } from "react";
import { Image } from "antd";
import { toast } from "react-toastify";
import { useGlobalContext } from "../../../Context/globalData";
import { getImgProfile, getUser } from "../../../apis/regester";

import "./Preview.css";

function Preview(props) {
  const next = () => {
    props.nextData();
  };
  

  const [info, setInfo] = useState();

  const [dataId, setDataId] = useState();

  const { userInformation } = useGlobalContext();

  useEffect(() => {
    userInformation &&
      getUser(userInformation.token)
        .then((res) => {
          const { data } = res;
          setInfo(data);
          data.image &&
            getImgProfile(data.image).then((res) => {
              setDataId(res.data);
            });
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
  }, [userInformation]);

  return (
    <div className="form-container h-auto">
      <Row justify="center" className="row-form job-form">
        <Col span={24} className="mb-20">
          <h1>about company</h1>
        </Col>
        <Row>
          <Col xs={24} sm={24} md={24} lg={10} xl={10}>
            <Image src={dataId} />
          </Col>
          <Col
            xs={24}
            sm={24}
            md={24}
            lg={{ span: 10, offset: 4 }}
            xl={{ span: 10, offset: 4 }}
          >
            <div className="flex">
              <h5 className="m-r-10">Name</h5>
              <p>{info && info.fullName}</p>
            </div>
            <div className="flex">
              <h5 className="m-r-10">Email</h5>
              <p>{info && info.email}</p>
            </div>
            <div className="flex">
              <h5 className="m-r-10">Website</h5>
              <p>{info && info.website}</p>
            </div>
          </Col>
        </Row>
        <Divider />
        <Row className="text-left m-t width-100">
          <Col span={24}>
            <h2>Title : {` ${props.data[0]?.title}`}</h2>
          </Col>
          <Col span={15}>
            <p>{props.data[0]?.description}</p>
          </Col>
          <Divider type="vertical" style={{ height: "100%" }} />
          <Col span={7}>
            <div className="flex">
              <h4 className="m-r-10">Type</h4>
              <p>
                {props.data[0]?.JobType && JSON.parse(props.data[0]?.JobType)}
              </p>
            </div>
            <div className="flex">
              <h4 className="m-r-10">Level</h4>
              <p>{props.data[0]?.level && JSON.parse(props.data[0]?.level)}</p>
            </div>
            <div className="flex">
              <h4 className="m-r-10">Sklics</h4>
              <p>
                {props.data[0]?.skills && JSON.parse(props.data[0]?.skills)}
              </p>
            </div>
            <div className="flex">
              <h4 className="m-r-10">Experience</h4>
              <p>{props.data[0]?.experience}</p>
            </div>
            <div className="flex">
              <div className="flex">
                <h4 className="m-r-10">Min</h4>
                <p className="m-r-10">{props.data[0]?.min}</p>
              </div>
              <div className="flex">
                <h4 className="m-r-10">Max</h4>
                <p>{props.data[0]?.max}</p>
              </div>
            </div>
            <div className="flex">
              <h4 className="m-r-10">Location</h4>
              <p>{props.data[0]?.JobLocation}</p>
            </div>
          </Col>
        </Row>
        <Col span={24}>
          <Button className="text-left" type="primary" onClick={() => next()}>
            Next
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default Preview;
