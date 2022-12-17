import { Row, Col, Button } from "antd";
import React, { useEffect, useState } from "react";
import { Image } from "antd";
import { toast } from "react-toastify";
import { useGlobalContext } from "../../../Context/globalData";
import { getImgProfile, getUser } from "../../../apis/regester";

import "./CompanyData.css";

function CompanyData(props) {
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

  const next = () => {
    props.nextData();
  };
  return (
    <div className="form-container h-auto">
      <Row justify="center" className="row-form job-form">
        <Row>
          <Col xs={24} sm={24} md={24} lg={10} xl={10}>
            <Image className="img-res" src={dataId} />
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
        <Row className="text-left m-t w-100">
          <Col offset={4} span={20}>
            <h5 className="m-r-10">description</h5>
          </Col>
          <Col offset={4} span={20}>
            <p>{info && info.description}</p>
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

export default CompanyData;
