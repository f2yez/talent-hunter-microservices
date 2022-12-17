import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Form, Input, Button, Row } from "antd";
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { changePassword } from "../../utils/validation/yup";
import { newPassword } from "../../apis/regester";

// import "./CompanySignIp.css";

function ChangePasswred() {
  let navigate = useNavigate();
  const params = useParams();
  //onSubmit
  const onSubmit = (data) => {
    const dataa = {
      ...data,
      token: `Bearer ${params.token}`,
    };
    newPassword(dataa)
      .then((data) => {
        toast.success("password change successfully");
        navigate("/SingIn");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(changePassword) });

  return (
    <div className="form-container">
      <Row justify="center" className="row-form">
        <h1>Forgot password</h1>
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
          <Form.Item label="Password">
            <Controller
              name="password"
              control={control}
              rules={{ required: true }}
              render={({ field }) => <Input.Password {...field} />}
            />
            {errors.password && (
              <p className="error">{errors.password.message}</p>
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
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Row>
      <ToastContainer />
    </div>
  );
}

export default ChangePasswred;
