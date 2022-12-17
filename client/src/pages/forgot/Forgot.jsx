import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Form, Input, Button, Row } from "antd";
import { yupResolver } from "@hookform/resolvers/yup";
import { ToastContainer, toast } from "react-toastify";

import { forgotyup } from "../../utils/validation/yup";
import { forgot } from "../../apis/regester";

// import "./CompanySignIp.css";

function Forgot() {
  const [done, setDone] = useState(true);

  const onSubmit = (data) => {
    forgot(data)
      .then((data) => {
        toast.success("cheek your Email");
        setDone(false);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(forgotyup) });

  return (
    <>
      <div className="form-container">
        {done ? (
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

              <Form.Item>
                <Button type="primary" htmlType="submit">
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
                new Email was sended <br /> cheek your Email
              </p>
            </div>
          </div>
        )}
        <ToastContainer />
      </div>
    </>
  );
}

export default Forgot;
