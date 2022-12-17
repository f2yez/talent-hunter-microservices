import React, { useState, useEffect } from "react";
import {
  Modal,
  Button,
  Form,
  Input,
  Checkbox,
  DatePicker,
  InputNumber,
} from "antd";
import { useForm, Controller } from "react-hook-form";
import { DeleteOutlined } from "@ant-design/icons";
import { ToastContainer, toast } from "react-toastify";
import moment from "moment";

import {
  addDataEducation,
  getDataEducation,
  DeleteEducationByID,
} from "../../apis/regester";
import { useGlobalContext } from "../../Context/globalData";
import UpdateEduction from "../UpdateEduction/UpdateEduction";

import "./eduction.css";

const Eduction = () => {
  const { userInformation } = useGlobalContext();

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({});

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [eductionData, setEductionData] = useState([]);
  const [done, setDone] = useState(true);
  const [checked, setChecked] = useState(true);

  function disabledDate(current) {
    return (
      current &&
      current.isBefore(
        moment(watch().startDate !== undefined && watch().startDate).startOf(
          "day"
        )
      )
    );
  }

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

  const newDate = (fullDate) => {
    const date = new Date(fullDate);
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  };

  const onSubmitt = (data) => {
    const dataSent = {
      degree: data.degree,
      startDate: data.startDate._d,
      EndDate: checked ? null : data.EndDate._d,
      university: data.university,
    };

    userInformation &&
      addDataEducation(dataSent, userInformation.token)
        .then((res) => {
          setIsModalVisible(false);
          setDone(!done);
          setValue("degree", "");
          setValue("startDate", "");
          setValue("EndDate", "");
          setValue("university", "");
          
        })
        .catch((error) => {
          toast.error("error");
        });
  };

  const handEducationDelete = async (id) => {
    await DeleteEducationByID(id, userInformation.token);
    const newEductionData = await eductionData.filter((edu) => edu.id !== id);
    setEductionData(newEductionData);
  };

  useEffect(() => {
    userInformation &&
      getDataEducation(userInformation.token)
        .then((res) => {
          setEductionData(res.data);
        })
        .catch((error) => {
          toast.error(error);
        });
  }, [done]);

  return (
    <div className="eduction">
      <div className="text-left">
        <h1>Eduction</h1>
        {eductionData &&
          eductionData.map((data, i) => (
            <div key={i} className="d-flex jus-between m-b position-relative">
              <div>
                <p>degree: {data.degree} %</p>
                <p>university: {data.university}</p>
              </div>
              <div>
                <p>start date: {newDate(data.startDate)}</p>
                {data.EndDate ? (
                  <p>End date: {newDate(data.EndDate)}</p>
                ) : (
                  <p>End date:unit now</p>
                )}
              </div>
              <UpdateEduction id={data.id} done={done} setDone={setDone} />
              <DeleteOutlined onClick={() => handEducationDelete(data.id)} />
            </div>
          ))}
      </div>

      <Button type="primary" onClick={showModal} className="d-flex dark-blue">
        Add Eduction
      </Button>
      <Modal
        title="Add Eduction"
        visible={isModalVisible}
        onOk={null}
        onCancel={null}
        footer={null}
      >
        <Form
          name="basics"
          layout="vertical"
          initialValues={{ remember: true }}
          onSubmitCapture={handleSubmit(onSubmitt)}
          autoComplete="off"
        >
          <Form.Item
            label="Degree"
            rules={[{ required: true, message: "Please input your degree!" }]}
          >
            <Controller
              name="degree"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  autoComplete="off"
                  {...field}
                />
              )}
            />
          </Form.Item>

          <Form.Item
            label="University"
            rules={[
              { required: true, message: "Please input your university!" },
            ]}
          >
            <Controller
              name="university"
              control={control}
              rules={{ required: true }}
              render={({ field }) => <Input autoComplete="off" {...field} />}
            />
          </Form.Item>

          <div className="d-flex jus-between">
            <Form.Item
              label="From Year"
              rules={[
                { required: true, message: "Please input your startDate!" },
              ]}
            >
              <Controller
                name="startDate"
                control={control}
                rules={{ required: true }}
                render={({ field }) => <DatePicker {...field} />}
              />
            </Form.Item>
            {!checked && (
              <Form.Item label="To Year">
                <Controller
                  name="EndDate"
                  control={control}
                  rules={{ required: !checked }}
                  render={({ field }) => (
                    <DatePicker disabledDate={disabledDate} {...field} />
                  )}
                />
              </Form.Item>
            )}
          </div>

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

export default Eduction;
