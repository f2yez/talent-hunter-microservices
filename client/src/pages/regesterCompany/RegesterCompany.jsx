import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Form, Input, Button, Row } from "antd";
import { yupResolver } from "@hookform/resolvers/yup";
import { ToastContainer, toast } from "react-toastify";

import { registerAccountSchemaForCompany } from "../../utils/validation/yup";
import { register } from "../../apis/regester";

import "./RegesterCompany.css";

const RegesterCompany = () => {
  const [done, setDone] = useState(true);
  const [disable, setDisable] = useState(false);

  const onSubmit = (data) => {
    setDisable(true);
    const dataWithType = {
      ...data,
      type: "company",
    };
    register(dataWithType)
      .then((data) => {
        toast.success("successful registration  cheek your Email");
        setDone(false);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        setDisable(false);
      });
  };
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(registerAccountSchemaForCompany) });

  return (
    <div className="register-page form-container">
      {done ? (
        <Row justify="center" className="row-form">
          <h1>Sign up into Talent Hanter</h1>
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
            <Form.Item label="Company name">
              <Controller
                name="fullName"
                control={control}
                render={({ field }) => <Input {...field} />}
              />
              {errors.fullName && (
                <p className="error">{errors.fullName.message}</p>
              )}
            </Form.Item>
            <Form.Item label="Business E-mail Address">
              <Controller
                name="email"
                control={control}
                rules={{ required: true }}
                render={({ field }) => <Input {...field} />}
              />
              {errors.email && <p className="error">{errors.email.message} </p>}
            </Form.Item>
            <Form.Item label="Contact person name">
              <Controller
                name="userName"
                control={control}
                render={({ field }) => <Input {...field} />}
              />
              {errors.userName && (
                <p className="error">{errors.userName.message}</p>
              )}
            </Form.Item>

            <Form.Item label="Password">
              <Controller
                name="password"
                control={control}
                rules={{ required: true }}
                render={({ field }) => <Input.Password {...field} />}
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
            <Form.Item>
              <Button disabled={disable} type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Row>
      ) : (
        <div justify="center" className="row-form">
          <div>
            <div className="success">
              <i class="checkmark">✓</i>
            </div>
            <h1 className="SuccessH">Success</h1>
            <p className="successp">
              successful registration <br /> cheek your Email
            </p>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default RegesterCompany;
