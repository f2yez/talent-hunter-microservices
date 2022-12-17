import React, { useEffect, useState,  useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import { Form, Input, Button, Row, DatePicker, Select, Radio } from "antd";
import { ToastContainer, toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import moment from "moment";

import { UpdateUserTalent } from "../../utils/validation/yup";
import { getImgProfile, getUser, updateUser } from "../../apis/regester";
import { useGlobalContext } from "../../Context/globalData";
import File from "../../components/files/File";
import LayoutPage from "../../pages/layout/LayoutPage";
import Eduction from "../../components/eduction/Eduction";
import Experience from "../../components/experience/Experience";
import{childrenSkills ,childrenJopType ,childrenExperienceLevel ,childrenLanguage} from "../../utils/data/TalentData"

function UpdateTalent() {
  const [imgId, setImgId] = useState();
  const [dataId, setDataId] = useState();
  const [dsable, setDsable] = useState(false);

  const { TextArea } = Input;


  const { Option } = Select;

  const { userInformation } = useGlobalContext();

  function disabledDate(current) {
    return current && current.isAfter(moment("2001").startOf("day"));
  }

  const {
    control,
    handleSubmit,
    setValue,
    
    formState: { errors },
  } = useForm({ resolver: yupResolver(UpdateUserTalent) });
  
  const onSubmit = (data) => {
    setDsable(true);
    userInformation &&
      updateUser(data, userInformation.token)
        .then((res) => {
          toast.success("successful update");
          setDsable(false);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
  };

  const getUserData = useCallback(() => {
    userInformation &&
      getUser(userInformation.token)
        .then((res) => {
          const { data } = res;

          data.image && setImgId(data.image);
          data.image &&
            getImgProfile(data.image).then((res) => {
              setDataId(res.data);
            });

          for (const property in data) {
            if (property === "password") {
              continue;
            }
            if (property === "birthData" || property === "YearEstablishes") {
              setValue(property, moment(data[property]));
              continue;
            }
            if (
              (property === "skills" && !data[property]) ||
              (property === "languages" && !data[property]) ||
              (property === "jobTyp" && !data[property]) ||
              (property === "experienceLevel" && !data[property])
            ) {
              continue;
            }
            setValue(property, data[property]);
          }
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
  }, [userInformation]);

  useEffect(() => {
    getUserData();
  }, [userInformation]);



  return (
    <LayoutPage>
      <h1>Your Profile</h1>
      <div className="form-container" style={{ maxWidth: '1250px', margin: 'auto' }}>
        <div className="row-form updateForm position-relative">
          <h1 className="width-100 text-left size">
            {userInformation && userInformation.fullName}
          </h1>
          <div className="update">
            <Row>
              <File dataId={dataId} imgId={imgId} />
            </Row>
            <Row justify="center">
              <Form
                className="form"
                onSubmitCapture={handleSubmit(onSubmit)}
                name="basic"
                layout="vertical"
                initialValues={{
                  remember: true,
                }}
                autoComplete="off"
              >
                <Form.Item label="Jop Title">
                  <Controller
                    name="userName"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Input autoComplete="off" {...field} />
                    )}
                  />
                  {errors.userName && (
                    <p className="error">{errors.userName.message} </p>
                  )}
                </Form.Item>

                <Form.Item label="Describe yourself">
                  <Controller
                    name="description"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => <TextArea rows={4} {...field} />}
                  />
                  <small className="small">
                    introduce yourself in a few lines with list of different
                    skills and project in which you can work .
                  </small>

                  {errors.description && (
                    <p className="error">{errors.description.message} </p>
                  )}
                </Form.Item>

                <Form.Item label="phone">
                  <Controller
                    name="phone"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => <Input {...field} />}
                  />
                  {errors.phone && (
                    <p className="error">{errors.phone.message} </p>
                  )}
                </Form.Item>

                <Form.Item label="country">
                  <Controller
                    name="country"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => <Input {...field} />}
                  />
                  {errors.country && (
                    <p className="error">{errors.country.message} </p>
                  )}
                </Form.Item>

                <Form.Item label="Availability status">
                  <Controller
                    name="Availability"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Radio.Group {...field}>
                        <Radio.Button value="Looking for job">
                          Looking for job
                        </Radio.Button>
                        <Radio.Button value="Open but not Looking">
                          Open but not Looking
                        </Radio.Button>
                        <Radio.Button value="Not Looking">
                          Not Looking
                        </Radio.Button>
                      </Radio.Group>
                    )}
                  />
                  {errors.Availability && (
                    <p className="error">{errors.Availability.message} </p>
                  )}
                </Form.Item>

                <Form.Item label="birthData">
                  <Controller
                    name="birthData"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <DatePicker
                        defaultPickerValue={moment("2000")}
                        disabledDate={disabledDate}
                        className="width-100"
                        {...field}
                      />
                    )}
                  />
                  {errors.birthData && (
                    <p className="error">{errors.birthData.message} </p>
                  )}
                </Form.Item>

                <Form.Item label="experience Level">
                  <Controller
                    name="experienceLevel"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select
                        mode="multiple"
                        allowClear
                        style={{ width: "100%" }}
                        placeholder="Please select"
                        {...field}
                      >
                        {childrenExperienceLevel &&
                          childrenExperienceLevel.map((child, i) => (
                            <Option key={i} value={child}>
                              {child}
                            </Option>
                          ))}
                      </Select>
                    )}
                  />
                  {errors.experienceLevel && (
                    <p className="error">{errors.experienceLevel.message} </p>
                  )}
                </Form.Item>
                <Form.Item label="job Typ">
                  <Controller
                    name="jobTyp"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select
                        mode="multiple"
                        allowClear
                        style={{ width: "100%" }}
                        placeholder="Please select"
                        {...field}
                      >
                        {childrenJopType &&
                          childrenJopType.map((child, i) => (
                            <Option key={i} value={child}>
                              {child}
                            </Option>
                          ))}
                      </Select>
                    )}
                  />
                  {errors.jobTyp && (
                    <p className="error">{errors.jobTyp.message} </p>
                  )}
                </Form.Item>

                <Form.Item label="skills">
                  <Controller
                    name="skills"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select
                        mode="multiple"
                        allowClear
                        style={{ width: "100%" }}
                        placeholder="Please select"
                        {...field}
                      >
                        {childrenSkills &&
                          childrenSkills.map((child, i) => (
                            <Option key={i} value={child}>
                              {child}
                            </Option>
                          ))}
                      </Select>
                    )}
                  />
                  {errors.skills && (
                    <p className="error">{errors.skills.message} </p>
                  )}
                </Form.Item>

                <Form.Item label="languages">
                  <Controller
                    name="languages"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select
                        mode="multiple"
                        allowClear
                        style={{ width: "100%" }}
                        placeholder="Please select"
                        {...field}
                      >
                        {childrenLanguage &&
                          childrenLanguage.map((child, i) => (
                            <Option key={i} value={child}>
                              {child}
                            </Option>
                          ))}
                      </Select>
                    )}
                  />
                  {errors.languages && (
                    <p className="error">{errors.languages.message} </p>
                  )}
                </Form.Item>

                <div className="text-right">
                  <Button
                    disabled={dsable}
                    className='dark-blue submitBut'
                    type="primary"
                    htmlType="submit"
                  >
                    Update Profile
                  </Button>
                </div>
              </Form>
              {userInformation && userInformation.type === "talent" && (
                <>
                  <Eduction />

                  <Experience />
                </>
              )}
            </Row>
          </div>
          <ToastContainer />
        </div>
      </div>
    </LayoutPage>
  );
}

export default UpdateTalent;
