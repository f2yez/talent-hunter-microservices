import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Checkbox, Col, Row, Form, Input } from "antd";

import { useGlobalContext } from "../../../Context/globalData";
import { makeUpdataJob } from "../../../apis/regester";

import "./Privacy.css";

function Privacy(props) {
  const [approve, setApprove] = useState(false);
  const [privacy, setPrivacy] = useState(false);
  let navigate = useNavigate();

  const { userInformation } = useGlobalContext();

  const onFinish = (values) => {
    //make update

    const data = {
      ...values,
      draft: true,
      companyIdy: userInformation && userInformation.profileId,
    };

    userInformation &&  
      makeUpdataJob(props.data[0].id, userInformation.token, data)
        .then((res) => {
          //make change for the navigate
          navigate("/AllJobs");
        })

        .catch((error) => {
          console.log(error);
        });
  };
  useEffect(() => {
    if (approve && privacy) {
      props.setShowDialogData();
    }
  }, [approve, privacy]);
  return (
    <div className="form-container h-auto">
      <Row justify="center" className="row-form job-form ">
        <Col span={24} className="col-privacy">
          <h3>approve the terms</h3>
          <div className="text-left div-Privacy">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. In
            voluptatum culpa distinctio dolor quos, minima eligendi tempora
            adipisci ipsum, cupiditate ipsa delectus odit! Facere in dolorem
            culpa. Animi, corporis unde. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. In voluptatum culpa distinctio dolor quos, minima
            eligendi tempora adipisci ipsum, cupiditate ipsa delectus odit!
            Facere in dolorem culpa. Animi, corporis unde. Lorem ipsum dolor sit
            amet consectetur adipisicing elit. In voluptatum culpa distinctio
            dolor quos, minima eligendi tempora adipisci ipsum, cupiditate ipsa
            delectus odit! Facere in dolorem culpa. Animi, corporis unde. Lorem
            ipsum dolor sit amet consectetur adipisicing elit. In voluptatum
            culpa distinctio dolor quos, minima eligendi tempora adipisci ipsum,
            cupiditate ipsa delectus odit! Facere in dolorem culpa. Animi,
            corporis unde. Lorem ipsum dolor sit amet consectetur adipisicing
            elit. In voluptatum culpa distinctio dolor quos, minima eligendi
            tempora adipisci ipsum, cupiditate ipsa delectus odit! Facere in
            dolorem culpa. Animi, corporis unde. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. In voluptatum culpa distinctio dolor
            quos, minima eligendi tempora adipisci ipsum, cupiditate ipsa
            delectus odit! Facere in dolorem culpa. Animi, corporis unde. Lorem
            ipsum dolor sit amet consectetur adipisicing elit. In voluptatum
            culpa distinctio dolor quos, minima eligendi tempora adipisci ipsum,
            cupiditate ipsa delectus odit! Facere in dolorem culpa. Animi,
            corporis unde. Lorem ipsum dolor sit amet consectetur adipisicing
            elit. In voluptatum culpa distinctio dolor quos, minima eligendi
            tempora adipisci ipsum, cupiditate ipsa delectus odit! Facere in
            dolorem culpa. Animi, corporis unde.
          </div>
        </Col>
        <Col span={24} className="col-privacy">
          <h3>privacy the terms</h3>
          <div className="text-left div-Privacy">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. In
            voluptatum culpa distinctio dolor quos, minima eligendi tempora
            adipisci ipsum, cupiditate ipsa delectus odit! Facere in dolorem
            culpa. Animi, corporis unde. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. In voluptatum culpa distinctio dolor quos, minima
            eligendi tempora adipisci ipsum, cupiditate ipsa delectus odit!
            Facere in dolorem culpa. Animi, corporis unde. Lorem ipsum dolor sit
            amet consectetur adipisicing elit. In voluptatum culpa distinctio
            dolor quos, minima eligendi tempora adipisci ipsum, cupiditate ipsa
            delectus odit! Facere in dolorem culpa. Animi, corporis unde. Lorem
            ipsum dolor sit amet consectetur adipisicing elit. In voluptatum
            culpa distinctio dolor quos, minima eligendi tempora adipisci ipsum,
            cupiditate ipsa delectus odit! Facere in dolorem culpa. Animi,
            corporis unde. Lorem ipsum dolor sit amet consectetur adipisicing
            elit. In voluptatum culpa distinctio dolor quos, minima eligendi
            tempora adipisci ipsum, cupiditate ipsa delectus odit! Facere in
            dolorem culpa. Animi, corporis unde. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. In voluptatum culpa distinctio dolor
            quos, minima eligendi tempora adipisci ipsum, cupiditate ipsa
            delectus odit! Facere in dolorem culpa. Animi, corporis unde. Lorem
            ipsum dolor sit amet consectetur adipisicing elit. In voluptatum
            culpa distinctio dolor quos, minima eligendi tempora adipisci ipsum,
            cupiditate ipsa delectus odit! Facere in dolorem culpa. Animi,
            corporis unde. Lorem ipsum dolor sit amet consectetur adipisicing
            elit. In voluptatum culpa distinctio dolor quos, minima eligendi
            tempora adipisci ipsum, cupiditate ipsa delectus odit! Facere in
            dolorem culpa. Animi, corporis unde.
          </div>
        </Col>
        <Col>
          <Form
            name="basic-tow"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              name="approve"
              valuePropName="checked"
              wrapperCol={{ span: 16 }}
            >
              <Checkbox onChange={(e) => setApprove(e)}>approve</Checkbox>
            </Form.Item>
            <Form.Item
              name="privacy"
              valuePropName="checked"
              wrapperCol={{ span: 16 }}
            >
              <Checkbox onChange={(e) => setPrivacy(e)}>privacy</Checkbox>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button
                type="primary"
                disabled={!approve || !privacy}
                htmlType="submit"
              >
                Done
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default Privacy;
