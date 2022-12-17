import React, { useCallback, useState } from "react";
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
import { EditOutlined } from "@ant-design/icons";
import { ToastContainer, toast } from "react-toastify";
import moment from "moment";

import { useGlobalContext } from "../../Context/globalData";
import { updateDataEducation, getDataEducationByID } from "../../apis/regester";

function UpdateEduction(props) {
  const { userInformation } = useGlobalContext();

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({});

  const [isModalVisible, setIsModalVisible] = useState(false);
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

  const showModal = useCallback(() => {
    setIsModalVisible(true);
    userInformation &&
      getDataEducationByID(props.id, userInformation.token)
        .then((res) => {
          setValue("degree", res.data[0].degree);
          setValue("university", res.data[0].university);
          setValue("startDate", moment(res.data[0].startDate));
          res.data[0].EndDate &&
            setValue("EndDate", moment(res.data[0].EndDate));
          res.data[0].EndDate && setChecked(false);
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

  const UpdateEductionSubmit = (data) => {
    const dataSent = {
      degree: data.degree,
      startDate: data.startDate._d,
      EndDate: checked ? null : data.EndDate?._d,
      university: data.university,
    };

    userInformation &&
      updateDataEducation(props.id, dataSent, userInformation.token)
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
        title="Add Eduction"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          name="basics"
          layout="vertical"
          initialValues={{ remember: true }}
          onSubmitCapture={handleSubmit(UpdateEductionSubmit)}
          autoComplete="off"
        >
          <Form.Item
            label="degree"
            rules={[{ required: true, message: "Please input your degree!" }]}
          >
            <Controller
              name="degree"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <InputNumber
                  min="50"
                  style={{ width: "100%" }}
                  max="100"
                  autoComplete="off"
                  {...field}
                />
              )}
            />
          </Form.Item>

          <Form.Item
            label="university"
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
                  render={({ field }) => (
                    <DatePicker
                      disabledDate={disabledDate}
                      disabled={checked}
                      {...field}
                    />
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
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <ToastContainer />
    </>
  );
}

export default UpdateEduction;
