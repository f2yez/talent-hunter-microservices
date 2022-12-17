import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Input, Checkbox, DatePicker } from "antd";
import { useForm, Controller } from "react-hook-form";
import { EditOutlined } from "@ant-design/icons";
import { ToastContainer, toast } from "react-toastify";

import { useGlobalContext } from "../../Context/globalData";
import "./UpdateExperience.css";
import {
  getDataExperienceBYId,
  UpdateExperienceBYId,
} from "../../apis/regester";
import { useCallback } from "react";
import moment from "moment";

const UpdateExperience = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [checked, setChecked] = useState(true);

  const toggleChecked = () => {
    setChecked(!checked);
  };

  const { userInformation } = useGlobalContext();

  const { TextArea } = Input;

  function disabledDate(current) {
    return (
      current &&
      current.isBefore(
        moment(
          watch().startYearDate !== undefined && watch().startYearDate
        ).startOf("day")
      )
    );
  }

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({});

  const showModal = useCallback(() => {
    setIsModalVisible(true);
    userInformation &&
      getDataExperienceBYId(props.id, userInformation.token)
        .then((res) => {
          setValue("company", res.data[0].company);
          setValue("position", res.data[0].position);
          setValue("Description", res.data[0].Description);
          setValue("startMonthDate", moment(res.data[0].startMonthDate));
          setValue("startYearDate", moment(res.data[0].startYearDate));
          res.data[0].EndMonthDate &&
            setValue("EndMonthDate", moment(res.data[0].EndMonthDate));
          res.data[0].EndMonthDate && setChecked(false);
          res.data[0].EndYearDate &&
            setValue("EndYearDate", moment(res.data[0].EndYearDate));
        })
        .catch((error) => {
          toast.error(error);
        });
  }, [props.id]);

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onUpdateSubmitt = (data) => {
    const dataSent = {
      company: data.company,
      position: data.position,
      EndMonthDate: checked ? null : data.EndMonthDate._d,
      EndYearDate: checked ? null : data.EndYearDate._d,
      startMonthDate: data.startMonthDate._d,
      startYearDate: data.startYearDate._d,
      Description: data.Description,
    };

    userInformation &&
      UpdateExperienceBYId(props.id, userInformation.token, dataSent)
        .then((res) => {
          setIsModalVisible(false);
          props.setDone(!props.done);
        })
        .catch((error) => {
          toast.error(error);
        });
  };

  return (
    <>
      <EditOutlined
        type="primary"
        onClick={showModal}
        className="updateExIcon"
      />
      <Modal
        title="Add Experience"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          name="basics"
          layout="vertical"
          initialValues={{ remember: true }}
          onSubmitCapture={handleSubmit(onUpdateSubmitt)}
          autoComplete="off"
        >
          <Form.Item
            label="company"
            rules={[{ required: true, message: "Please input your company!" }]}
          >
            <Controller
              name="company"
              control={control}
              rules={{ required: true }}
              render={({ field }) => <Input autoComplete="off" {...field} />}
            />
          </Form.Item>

          <Form.Item
            label="position"
            rules={[{ required: true, message: "Please input your position!" }]}
          >
            <Controller
              name="position"
              control={control}
              rules={{ required: true }}
              render={({ field }) => <Input autoComplete="off" {...field} />}
            />
          </Form.Item>
          <Form.Item
            label="Description"
            rules={[
              { required: true, message: "Please input your Description!" },
            ]}
          >
            <Controller
              name="Description"
              control={control}
              rules={{ required: true }}
              render={({ field }) => <TextArea rows={4} {...field} />}
            />
          </Form.Item>

          <div className="d-flex jus-between">
            <Form.Item
              label="Month"
              rules={[
                {
                  required: true,
                  message: "Please input your Month!",
                },
              ]}
            >
              <Controller
                name="startMonthDate"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <DatePicker picker="month" format={"MM"} {...field} />
                )}
              />
            </Form.Item>
            <Form.Item
              label="Year"
              rules={[
                { required: true, message: "Please input your EndDate!" },
              ]}
            >
              <Controller
                name="startYearDate"
                control={control}
                rules={{ required: true }}
                render={({ field }) => <DatePicker picker="year" {...field} />}
              />
            </Form.Item>
          </div>
          {/* // */}
          {!checked && (
            <>
              <p>To</p>
              <div className="d-flex jus-between">
                <Form.Item label="Month">
                  <Controller
                    name="EndMonthDate"
                    control={control}
                    rules={{ required: !checked }}
                    render={({ field }) => (
                      <DatePicker picker="month" format={"MM"} {...field} />
                    )}
                  />
                </Form.Item>
                <Form.Item label="Year">
                  <Controller
                    name="EndYearDate"
                    control={control}
                    rules={{ required: !checked }}
                    render={({ field }) => (
                      <DatePicker
                        disabledDate={disabledDate}
                        picker="year"
                        {...field}
                      />
                    )}
                  />
                </Form.Item>
              </div>
            </>
          )}

          <Form.Item name="remember" wrapperCol={{ span: 16 }}>
            <Controller
              name="remember"
              control={control}
              render={({ field }) => (
                <Checkbox checked={checked} onClick={toggleChecked} {...field}>
                  Still unit now
                </Checkbox>
              )}
            />
          </Form.Item>

          <Form.Item wrapperCol={{ span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <ToastContainer />
    </>
  );
};

export default UpdateExperience;
