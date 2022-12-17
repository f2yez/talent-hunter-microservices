import React, { useState, useEffect } from "react";
import { Upload } from "antd";
import ImgCrop from "antd-img-crop";
import { ToastContainer, toast } from "react-toastify";

import { useGlobalContext } from "../../Context/globalData";
import { sendImgProfile, updateImgProfile } from "../../apis/regester";

import "./File.css";

const File = (props) => {
  const { userInformation, setUser } = useGlobalContext();

  const [fileList, setFileList] = useState([
    {
      uid: "-1",
      name: "image.png",
      status: "done",
      url: "https://gravatar.com/avatar/92fe478db22bfd80575d2c91c1f064e0?s=400&d=mp&r=x",
    },
  ]);

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const getBase64 = (img) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(img);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const onPreview = async (file) => {
    let src = file?.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file?.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }

    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };

  useEffect(() => {
    props.dataId && setFileList([{ url: props.dataId }]);
  }, [props.dataId]);

  const uploadImage = async (options) => {
    const { onSuccess, onError, file } = options;

    try {
      await getBase64(file).then((res) => {
        const data = {
          name: res,
        };

        if (props.dataId) {
          updateImgProfile(props.imgId, data, userInformation.token)
            .then((res) => {
              onSuccess("Ok");
            })
            .catch((error) => {
              // toast.error(error.response.statusText);
              console.log(error);
            });
        } else {
          sendImgProfile(data, userInformation.token)
            .then((res) => {
              onSuccess("Ok");
              if (localStorage.getItem("UserInformation")) {
                const data = JSON.parse(
                  localStorage.getItem("UserInformation")
                );
                const ImgData = { ...data, image: res.data.id };
                const newData = localStorage.setItem(
                  "UserInformation",
                  JSON.stringify(ImgData)
                );
                setUser(JSON.parse(newData));
              }
              
            })
            .catch((error) => {
              toast.error(error);
            });
        }
      });
    } catch (err) {
      new Error("Some error");
      onError({ err });
    }
  };

  return (
    <>
      <ImgCrop rotate>
        <Upload
          customRequest={uploadImage}
          listType="picture-card"
          fileList={fileList}
          onChange={onChange}
          onPreview={onPreview}
          maxCount={1}
        >
          {fileList.length < 5 && "+ Upload"}
        </Upload>
      </ImgCrop>
      <ToastContainer />
    </>
  );
};

export default File;
