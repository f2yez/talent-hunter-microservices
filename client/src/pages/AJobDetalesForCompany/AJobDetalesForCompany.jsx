import { Col, Divider, Image, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getACompany, getAJob, getImgProfile } from "../../apis/regester";
import { useGlobalContext } from "../../Context/globalData";
import LayoutPage from "../layout/LayoutPage";

function AJobDetalesForCompany() {
  const [jobData, setJobData] = useState();
  const [comapnyData, setComapnyData] = useState();
  const [imgData, setImgData] = useState();

  const { id } = useParams();

  const { userInformation } = useGlobalContext();

  useEffect(async () => {
    //make api
    try {
      const getJob =
        userInformation && (await getAJob(id, userInformation.token));
      setJobData(getJob.data);

      const getCompany =
        userInformation &&
        (await getACompany(userInformation.profileId, userInformation.token));
      setComapnyData(getCompany.data);

      const getImg =
        userInformation && (await getImgProfile(userInformation.image));
      setImgData(getImg.data);
    } catch (error) {
      console.log(error);
    }
  }, [userInformation]);

  return (
    <LayoutPage>
      <div className="height-100">
        <div className="form-container h-auto">
          <Row justify="center" className="row-form job-form">
            <Col span={24} className="mb-20">
              <h1>about Job</h1>
            </Col>
            <Row>
              <Col xs={24} sm={24} md={24} lg={10} xl={10}>
                <Image src={imgData && imgData} />
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
                  <p>{userInformation && userInformation.fullName}</p>
                </div>
                <div className="flex">
                  <h5 className="m-r-10">Email</h5>
                  <p>{userInformation && userInformation.email}</p>
                </div>
                <div className="flex">
                  <h5 className="m-r-10">Website</h5>
                  <p>{comapnyData && comapnyData[0].website}</p>
                </div>
              </Col>
            </Row>
            <Divider />
            <Row className="text-left m-t width-100">
              <Col span={24}>
                <h2>Title : {` ${jobData && jobData[0].title}`}</h2>
              </Col>
              <Col span={15}>
                <p>{jobData && jobData[0].description}</p>
              </Col>
              <Divider type="vertical" style={{ height: "100%" }} />
              <Col span={7}>
                <div className="flex">
                  <h4 className="m-r-10">Type</h4>
                  <p>{jobData && JSON.parse(jobData[0].JobType)}</p>
                </div>
                <div className="flex">
                  <h4 className="m-r-10">Level</h4>
                  <p>{jobData && JSON.parse(jobData[0].level)}</p>
                </div>
                <div className="flex">
                  <h4 className="m-r-10">Sklics</h4>
                  <p>{jobData && JSON.parse(jobData[0].skills)}</p>
                </div>
                <div className="flex">
                  <h4 className="m-r-10">Experience</h4>
                  <p>{jobData && jobData[0].experience}</p>
                </div>
                <div className="flex">
                  <div className="flex">
                    <h4 className="m-r-10">Min</h4>
                    <p className="m-r-10">{jobData && jobData[0].min}</p>
                  </div>
                  <div className="flex">
                    <h4 className="m-r-10">Max</h4>
                    <p>{jobData && jobData[0].max}</p>
                  </div>
                </div>
                <div className="flex">
                  <h4 className="m-r-10">Currency</h4>
                  <p>{jobData && jobData[0].currency}</p>
                </div>
                <div className="flex">
                  <h4 className="m-r-10">Location</h4>
                  <p>{jobData && jobData[0].JobLocation}</p>
                </div>
              </Col>
            </Row>
          </Row>
        </div>
      </div>
    </LayoutPage>
  );
}

export default AJobDetalesForCompany;
