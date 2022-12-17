import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Input, Checkbox, DatePicker } from "antd";
import { useForm, Controller } from "react-hook-form";
import { DeleteOutlined } from "@ant-design/icons";
import { ToastContainer, toast } from "react-toastify";

import {
  addDataExperience,
  DeleteExperienceBYId,
  getDataExperience,
} from "../../apis/regester";
import { useGlobalContext } from "../../Context/globalData";

import "./experience.css";
import moment from "moment";
import UpdateExperience from "../updateExperience/UpdateExperience";

const Experience = () => {
  const { userInformation } = useGlobalContext();

  const { TextArea } = Input;

  const { control, handleSubmit, setValue, watch } = useForm({});

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [experienceData, setExperienceData] = useState([]);
  const [done, setDone] = useState(true);
  const [checked, setChecked] = useState(true);

  const toggleChecked = () => {
    setChecked(!checked);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

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

  const newDate = (fullDate) => {
    const date = new Date(fullDate);
    return `${date.getFullYear()} / ${
      date.getMonth() + 1
    } /  ${date.getDate()}`;
  };

  const onSubmitt = (data) => {
    const dataSent = {
      company: data.company,
      position: data.position,
      EndMonthDate: checked ? undefined : data.EndMonthDate?._d,
      EndYearDate: checked ? undefined : data.EndYearDate?._d,
      startMonthDate: data.startMonthDate._d,
      startYearDate: data.startYearDate._d,
      Description: data.Description,
    };

    userInformation &&
      addDataExperience(dataSent, userInformation.token)
        .then((res) => {
          setIsModalVisible(false);
          setDone(!done);

          setValue("company", "");
          setValue("EndMonthDate", "");
          setValue("EndYearDate", "");
          setValue("position", "");
          setValue("startMonthDate", "");
          setValue("startYearDate", "");
          setValue("Description", "");
        })
        .catch((error) => {
          toast.error(error);
        });
  };

  const handExperienceDelete = async (id) => {
    await DeleteExperienceBYId(id, userInformation.token);
    const newExperience = await experienceData.filter((ex) => ex.id !== id);
    setExperienceData(newExperience);
  };

  useEffect(() => {
    userInformation &&
      getDataExperience(userInformation.token)
        .then((res) => {
          setExperienceData(res.data);
        })
        .catch((error) => {
          toast.error(error);
        });
  }, [done]);

  return (
    <div className="experience">
      <div className="text-left">
        <h1 className="mt-20">Experience</h1>
        {experienceData &&
          experienceData.map((data, i) => (
            <div key={i} className="d-flex jus-between m-b position-relative">
              <div>
                <p>company: {data.company}</p>
                <p>position: {data.position}</p>
              </div>
              <div>
                <p>
                  start date:{" "}
                  {`${moment(data.startMonthDate).format("MMMM")}-${moment(
                    data.startYearDate
                  ).format("YYYY")}`}
                </p>
                {data.EndMonthDate ? (
                  <p>
                    End date:{" "}
                    {`${moment(data.EndMonthDate).format("MMMM")}-${moment(
                      data.EndYearDate
                    ).format("YYYY")}`}
                  </p>
                ) : (
                  <p> End date: unit now</p>
                )}
              </div>
              <UpdateExperience id={data.id} done={done} setDone={setDone} />
              <DeleteOutlined onClick={() => handExperienceDelete(data.id)} />
            </div>
          ))}
      </div>

      <Button type="primary" onClick={showModal} className="d-flex dark-blue">
        Add Experience
      </Button>
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
          onSubmitCapture={handleSubmit(onSubmitt)}
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
            <Form.Item label="Month">
              <Controller
                name="startMonthDate"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <DatePicker format={"MM"} picker="month" {...field} />
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
                        picker="year"
                        disabledDate={disabledDate}
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
            <Button type="primary" htmlType="submit" className="dark-blue">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <ToastContainer />
    </div>
  );
};

export default Experience;
