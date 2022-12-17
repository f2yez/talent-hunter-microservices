import React from 'react';
import {
  AlipayOutlined,
  LockOutlined,
  TaobaoOutlined,
  UserOutlined,
  WeiboOutlined,
} from '@ant-design/icons';
import {
  LoginFormPage,
  ProFormCheckbox,
  ProFormText,
} from '@ant-design/pro-components';
import { Divider, Space, Tabs } from 'antd';
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../apis/regester";
import { ToastContainer, toast } from "react-toastify";
import { useGlobalContext } from "../../Context/globalData";

const iconStyles = {
  color: 'rgba(0, 0, 0, 0.2)',
  fontSize: '18px',
  verticalAlign: 'middle',
  cursor: 'pointer',
};

const SignIn = () => {
  const { setUser } = useGlobalContext();
  const history = useNavigate();
  return (
    <div style={{ backgroundColor: 'white', height: 'calc(100vh - 48px)', margin: -24 }}>
      <LoginFormPage
        backgroundImageUrl="https://gw.alipayobjects.com/zos/rmsportal/FfdJeJRQWjEeGTpqgBKj.png"
        logo="https://github.githubassets.com/images/modules/logos_page/Octocat.png"
        title="Talent Hunter"
        subTitle="Login to your account"
        submitter={{
          searchConfig: {
            submitText: "Login"
          }
        }}
        actions={
          <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <Divider plain>
              <span style={{ color: '#CCC', fontWeight: 'normal', fontSize: 14 }}>
                Login By
              </span>
            </Divider>
            <Space align="center" size={24}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                  height: 40,
                  width: 40,
                  border: '1px solid #D4D8DD',
                  borderRadius: '50%',
                }}
              >
                <AlipayOutlined style={{ ...iconStyles, color: '#1677FF' }} />
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                  height: 40,
                  width: 40,
                  border: '1px solid #D4D8DD',
                  borderRadius: '50%',
                }}
              >
                <TaobaoOutlined style={{ ...iconStyles, color: '#FF6A10' }} />
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                  height: 40,
                  width: 40,
                  border: '1px solid #D4D8DD',
                  borderRadius: '50%',
                }}
              >
                <WeiboOutlined style={{ ...iconStyles, color: '#333333' }} />
              </div>
            </Space>
          </div>
        }
        onFinish={async (data) => {
          login(data)
          .then((res) => {
            const StringData = JSON.stringify(res.data);
            localStorage.setItem("UserInformation", StringData);
            setUser(res.data);
            history("/JobsTalent");
          })
          .catch((error) => {
            toast.error(error.response.data.message);
          });
        }}
      >
        <Tabs
          centered
        >
        </Tabs>
            <ProFormText
              name="email"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className={'prefixIcon'} />,
              }}
              placeholder={'Your Email ...'}
              rules={[
                {
                  required: true,
                  message: 'Email field is required!',
                },
                {
                  type: "email",
                  message: "Invalid email address"
                }
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={'prefixIcon'} />,
              }}
              placeholder={'Your Password ...'}
              rules={[
                {
                  required: true,
                  message: 'Password field is required!',
                },
              ]}
            />
        <div
          style={{
            marginBlockEnd: 24,
          }}
        >
          <ProFormCheckbox noStyle name="autoLogin">
            Remember me?
          </ProFormCheckbox>
          <Link style={{
              float: 'right',
          }} to="/Forgot">
            Forgot password?
          </Link>
        </div>
      </LoginFormPage>
      <ToastContainer />
    </div>
  );
};

export default SignIn;