import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { Form, Input, Button, Row } from "antd";
import { yupResolver } from "@hookform/resolvers/yup";

import { registerAccountSchemaForTalent } from "../../utils/validation/yup";
import { register } from "../../apis/regester";

import "./Resgesteroftilent.css";

const Resgesteroftilent = () => {
  const [done, setDone] = useState(true);
  const [disable, setDisable] = useState(false);

  const onSubmit = (data) => {
    setDisable(true);
    const dataWithType = {
      ...data,
      type: "talent",
    };
    register(dataWithType)
      .then((data) => {
        toast.success("successful registration  cheek your Email");
        setDone(false);
        setDisable(false);
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
  } = useForm({ resolver: yupResolver(registerAccountSchemaForTalent) });

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
            <Form.Item label="FullName">
              <Controller
                name="fullName"
                control={control}
                render={({ field }) => <Input {...field} />}
              />
              {errors.fullName && (
                <p className="error">{errors.fullName.message}</p>
              )}
            </Form.Item>

            <Form.Item label="E-Mail Address">
              <Controller
                name="email"
                control={control}
                rules={{ required: true }}
                render={({ field }) => <Input {...field} />}
              />
              {errors.email && <p className="error">{errors.email.message} </p>}
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
            <Form.Item label="confirm-Password">
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
              <Button
                type="primary"
                htmlType="submit"
                disabled={disable}
                className="submitButton"
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
          {/* <button onClick={github}> github</button> */}
          {/* <a
            className="github"
            href="https://github.com/login/oauth/authorize?client_id=314a4d1f1ebab3e7242d&scope=user:email"
          >
            {" "}
            github
          </a> */}
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

export default Resgesteroftilent;
