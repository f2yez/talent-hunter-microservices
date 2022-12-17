import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Select,
  Row,
  InputNumber,
  Checkbox,
  Col,
} from "antd";

import {
  childrenExperienceLevel,
  childrenJopType,
  childrenSkills,
  experienceYear,
} from "../../../utils/data/TalentData";
import { useGlobalContext } from "../../../Context/globalData";
import { makeJob } from "../../../apis/regester";

import "./Job.css";

function Job1(props) {
  const [currency, setCurrency] = useState(
    props.data[0]?.JobLocation ? props.data[0]?.JobLocation : "USD"
  );

  const [form] = Form.useForm();
  
  const { userInformation } = useGlobalContext();

  const onFinish = (values) => {
    const data = {
      ...values,
      currency: currency,
      companyIdy: userInformation.profileId,
      draft: false,
    };
    // console.log("Success1:", values);
    userInformation &&
      makeJob(userInformation.token, data)
        .then((res) => {
          props.makeDone();
          props.nextData();
        })
        .catch((error) => {
          console.log(error);
        });
  };

  useEffect(() => {
    form.setFieldsValue({
      JobType: props.data[0]?.JobType && JSON.parse(props.data[0]?.JobType),
      IsRemotly: props.data[0]?.IsRemotly,
      JobLocation: props.data[0]?.JobLocation,
      description: props.data[0]?.description,
      experience: props.data[0]?.experience,
      level: props.data[0]?.level && JSON.parse(props.data[0]?.level),
      max: props.data[0]?.max,
      min: props.data[0]?.min,
      skills: props.data[0]?.skills && JSON.parse(props.data[0]?.skills),
      title: props.data[0]?.title,
    });
  }, []);

  const { Option } = Select;
  const { TextArea } = Input;

  const dtata = () => {
    props.nextData();
  };

  const selectAfter = (
    <Select
      defaultValue="USD"
      onChange={(e) => setCurrency(e)}
      value={currency}
      style={{ width: 60 }}
    >
      <Option value="USD">$</Option>
      <Option value="EUR">€</Option>
      <Option value="GBP">£</Option>
      <Option value="CNY">¥</Option>
    </Select>
  );

  return (
    <div className="form-container h-auto">
      <Row justify="center" className="row-form job-form-2 ">
        <div className="flex-baise">
          <Form
            form={form}
            name="basic"
            labelCol={{
              span: 6,
            }}
            wrapperCol={{
              span: 14,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            autoComplete="off"
          >
            {/* // */}
            <Form.Item
              label="jobType"
              name="JobType"
              rules={[
                {
                  required: true,
                  message: "Please input your JobType!",
                },
              ]}
            >
              <Select
                mode="multiple"
                allowClear
                style={{ width: "100%" }}
                placeholder="Please select"
              >
                {childrenJopType &&
                  childrenJopType.map((child, i) => (
                    <Option key={i} value={child}>
                      {child}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
            {/* // */}
            <Form.Item
              label="Title"
              name="title"
              rules={[
                {
                  required: true,
                  message: "Please input your Title!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            {/* // */}
            <Form.Item
              label="level"
              name="level"
              rules={[
                {
                  required: true,
                  message: "Please input your level!",
                },
              ]}
            >
              <Select
                mode="multiple"
                allowClear
                style={{ width: "100%" }}
                placeholder="Please select"
                autoComplete="off"
              >
                {childrenExperienceLevel &&
                  childrenExperienceLevel.map((child, i) => (
                    <Option key={i} value={child}>
                      {child}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
            {/* // */}
            <Form.Item
              label="Describe The project"
              name="description"
              rules={[
                {
                  required: true,
                  message: "Please input your description!",
                },
              ]}
            >
              <TextArea rows={4} />
            </Form.Item>
            <Col offset={6}>
              <small className="small">
                introduce your job in a few lines with list of different skills
                and project in which you can work .
              </small>
            </Col>
            {/* // */}
            <Form.Item
              label="skills"
              name="skills"
              rules={[
                {
                  required: true,
                  message: "Please input your skills!",
                },
              ]}
            >
              <Select
                mode="multiple"
                allowClear
                style={{ width: "100%" }}
                placeholder="Please select"
                autoComplete="off"
              >
                {childrenSkills &&
                  childrenSkills.map((child, i) => (
                    <Option key={i} value={child}>
                      {child}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
            {/* // */}
            <Form.Item
              label="experience Year"
              name="experience"
              rules={[
                {
                  required: true,
                  message: "Please input your experience!",
                },
              ]}
            >
              <Select
                allowClear
                style={{ width: "100%" }}
                placeholder="Please select"
                autoComplete="off"
              >
                {experienceYear &&
                  experienceYear.map((child, i) => (
                    <Option key={i} value={child}>
                      {child}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
            {/* // */}
            <Form.Item
              className="text-left"
              label="min salary"
              name="min"
              rules={[
                {
                  required: true,
                  message: "Please input your min salary!",
                },
              ]}
            >
              <InputNumber addonAfter={selectAfter} min={0} />
            </Form.Item>
            {/* // */}
            <Form.Item
              className="text-left"
              label="max salary"
              name="max"
              dependencies={["min"]}
              rules={[
                {
                  required: true,
                  message: "Please input your max salary!",
                },

                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("min") < value) {
                      return Promise.resolve();
                    }

                    return Promise.reject(
                      new Error("The  Max salary should by grater than min ")
                    );
                  },
                }),
              ]}
            >
              <InputNumber addonAfter={selectAfter} />
            </Form.Item>
            {/* // */}
            <Form.Item
              label="Job Location"
              name="JobLocation"
              rules={[
                {
                  required: true,
                  message: "Please input your job location",
                },
              ]}
            >
              <Input />
            </Form.Item>
            {/* // */}
            <Form.Item
              label="work Remotely"
              name="IsRemotly"
              valuePropName="checked"
              className="text-left"
            >
              <Checkbox>Checkbox</Checkbox>
            </Form.Item>
            {/* // */}
            <Button type="primary" htmlType="submit">
              Next
            </Button>
            {/* // */}
          </Form>
          {/* <Button type="primary" onClick={(e) => dtata(e)}>
            Next
          </Button> */}
        </div>
      </Row>
    </div>
  );
}

export default Job1;
