import React, { useEffect, useState,  useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import { Form, Input, Button, Row, Select, InputNumber } from "antd";
import { ToastContainer, toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import moment from "moment";

import { UpdateUserCompany } from "../../utils/validation/yup";
import { getImgProfile, getUser, updateUser } from "../../apis/regester";
import { useGlobalContext } from "../../Context/globalData";
import File from "../../components/files/File";
import LayoutPage from "../../pages/layout/LayoutPage";

function UpdateCompany() {
  const [imgId, setImgId] = useState();
  const [dataId, setDataId] = useState();
  const [dsable, setDsable] = useState(false);


  const { Option } = Select;

  const { userInformation } = useGlobalContext();

  const { TextArea } = Input;

  const nowDate = new Date();
  const startDate = new Date(0);

  const date = [];

  for (let i = nowDate.getFullYear(); i >= startDate.getFullYear(); i--) {
    date.push(i);
  }

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(UpdateUserCompany) });

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
            if (property === "birthData") {
              setValue(property, moment(data[property]));
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
      <div className="form-container form-containerr" style={{ maxWidth: '1250px', margin: 'auto' }}>
        <div className="row-form updateForm position-relative">
          <h1 className="width-100 text-left size">
            {userInformation && userInformation.fullName}
          </h1>
          <div className="update">
            <Row>
              <File  dataId={dataId} imgId={imgId} />
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
                <Form.Item label="Contact person Name">
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

                <Form.Item label="Company Official website">
                  <Controller
                    name="website"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => <Input {...field} />}
                  />
                  {errors.website && (
                    <p className="error">{errors.website.message} </p>
                  )}
                </Form.Item>
                <Form.Item label="Number of employees ">
                  <Controller
                    name="noOfEmployees"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <InputNumber className="noOfEmployees" {...field} />
                    )}
                  />
                  {errors.noOfEmployees && (
                    <p className="error">{errors.noOfEmployees.message} </p>
                  )}
                </Form.Item>

                <Form.Item label="Type of business">
                  <Controller
                    name="typeOfBusiness"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select
                        defaultValue="Type of business"
                        allowClear
                        className="text-left"
                        style={{ width: "100%" }}
                        {...field}
                      >
                        <Option value="C-corporation">C-corporation</Option>
                        <Option value="Estate">Estate</Option>
                        <Option value="Municipality">Municipality</Option>
                        <Option value="Cooperative">Cooperative</Option>
                        <Option value="Limited Partnership">
                          Limited Partnership
                        </Option>
                        <Option value="Partnership"> Partnership</Option>
                        <Option value="Sole Proprietorship">
                          Sole Proprietorship
                        </Option>
                        <Option value="Nonprofit Organization">
                          Nonprofit Organization
                        </Option>
                      </Select>
                    )}
                  />

                  {errors.typeOfBusiness && (
                    <p className="error">{errors.typeOfBusiness.message} </p>
                  )}
                </Form.Item>

                <Form.Item label="Address">
                  <Controller
                    name="address"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => <Input {...field} />}
                  />
                  {errors.address && (
                    <p className="error">{errors.address.message} </p>
                  )}
                </Form.Item>
                <Form.Item label="Country">
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

                <Form.Item label="Year Establishes">
                  <Controller
                    name="YearEstablishes"
                    control={control}
                    render={({ field }) => (
                      <Select
                        allowClear
                        defaultValue="2022"
                        className="text-left"
                        placement="bottomRight"
                        {...field}
                      >
                        {date &&
                          date.map((da, i) => (
                            <Option key={i} value={da}>
                              {da}
                            </Option>
                          ))}
                      </Select>
                    )}
                  />
                  {errors.YearEstablishes && (
                    <p className="error">{errors.YearEstablishes.message} </p>
                  )}
                </Form.Item>

                <Form.Item>
                  <div className="text-right">
                    <Button
                      disabled={dsable}
                      className={` mt-20 submitButCompany `}
                      type="primary"
                      htmlType="submit"
                    >
                      Submit
                    </Button>
                  </div>
                </Form.Item>
              </Form>
            </Row>
          </div>
          <ToastContainer />
        </div>
      </div>
    </LayoutPage>
  );
}

export default UpdateCompany;
