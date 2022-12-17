import React, { useState,useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Form, Input, Button, Row, Divider } from "antd";
import { yupResolver } from "@hookform/resolvers/yup";
import { ToastContainer, toast } from "react-toastify";

import LayoutPage from "../layout/LayoutPage";
import { SettingUser } from "../../utils/validation/yup";
import { useGlobalContext } from "../../Context/globalData";
import { updateUser } from "../../apis/regester";

import "./settingPage.css";

function SettingPages() {
  const [done, setDone] = useState(true);

  const { userInformation } = useGlobalContext();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(SettingUser) });

  const onSubmit = async (data) => {
    const sendData = {
      fullName: data.fullName,
      email: data.email,
      password: data.password,
    };
    userInformation &&
      updateUser(sendData, userInformation.token)
        .then((res) => {
          setDone(false);
          if (localStorage.getItem("UserInformation")) {
            const userData = JSON.parse(
              localStorage.getItem("UserInformation")
            );
            const newUserData = {
              ...userData,
              fullName: data.fullName,
              email: data.email,
            };
            const newData = localStorage.setItem(
              "UserInformation",
              JSON.stringify(newUserData)
            );
            // setUser(JSON.parse(newData));
          }
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
  };

  useEffect(() => {
    userInformation && setValue("fullName", userInformation.fullName);
    userInformation && setValue("email", userInformation.email);
  }, [userInformation]);
  return (
    <LayoutPage>
      <h1>Your Account Setting</h1>
      <div className="form-container" style={{ maxWidth: '750px', margin: 'auto' }}>
        {done ? (
          <Row justify="center" className="row-form">
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
              <Form.Item label="Name">
                <Controller
                  name="fullName"
                  control={control}
                  render={({ field }) => <Input {...field} />}
                />
                {errors.fullName && (
                  <p className="error">{errors.fullName.message}</p>
                )}
              </Form.Item>
              <Form.Item label="E-mail">
                <Controller
                  name="email"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => <Input {...field} />}
                />
                {errors.email && (
                  <p className="error">{errors.email.message} </p>
                )}
              </Form.Item>
              <Divider orientation="left" plain>
                Optional
              </Divider>

              <Form.Item label="Password">
                <Controller
                  name="password"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Input.Password autoComplete="new-password" {...field} />
                  )}
                />
                {errors.password && (
                  <p className="error">{errors.password.message} </p>
                )}
              </Form.Item>
              <Form.Item label="Confirm Password">
                <Controller
                  name="confirmPassword"
                  control={control}
                  render={({ field }) => <Input.Password {...field} />}
                />
                {errors.confirmPassword && (
                  <p className="error">{errors.confirmPassword.message}</p>
                )}
              </Form.Item>
              <Form.Item className="text-left">
                <Button className="dark-blue" type="primary" htmlType="submit">
                  Save Settings
                </Button>
              </Form.Item>
            </Form>
          </Row>
        ) : (
          <div justify="center" className="row-form">
            <div>
              <div className="success">
                <i className="checkmark">✓</i>
              </div>
              <h1 className="SuccessH">Success</h1>
              <p className="successp">your setting is change successfully</p>
            </div>
          </div>
        )}
        <ToastContainer />
      </div>
    </LayoutPage>
  );
}


export default SettingPages;