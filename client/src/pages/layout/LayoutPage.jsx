import React, { useState, useEffect } from "react";
import { Layout, Menu, Dropdown, Button, ConfigProvider } from "antd";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../Context/globalData";
import { getImgProfile } from "../../apis/regester";
import enGBIntl from 'antd/es/locale/en_GB';

import "./layoutPage.css";

const LayoutPage = (props) => {
  const [image, setImage] = useState(
    "https://gravatar.com/avatar/92fe478db22bfd80575d2c91c1f064e0?s=400&d=mp&r=x"
  );
  const { userInformation, logout, socket } = useGlobalContext();

  const { Header, Content, Footer } = Layout;

  //menu
  const menu = (
    <Menu mode="horizontal">
      <Menu.Item key={1}>
        <Link to="/SettingPages">Setting Pages</Link>
      </Menu.Item>
      <Menu.Item key={2}>
        <Link to="/UpDateUser">Update User</Link>
      </Menu.Item>
      <Menu.Item key={3} onClick={logout}>
        <span>Logout</span>
      </Menu.Item>
    </Menu>
  );
  //menu

  useEffect(() => {
    userInformation &&
      userInformation.image &&
      getImgProfile(userInformation.image)
        .then((res) => {
          setImage(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
  }, [userInformation]);

  useEffect(() => {
    socket.on("test", (data) => {
      console.log(data);
      toast.info(data);
    });
  }, [socket]);


  return <ConfigProvider locale={enGBIntl}>
    <Layout className="layout">
      <Header className="headerStyle">
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['t-1']}
        >
          {userInformation && userInformation.type === "company" && (
              <>
                <Menu.Item key={"c-1"}>
                  <Link to={"/addJob"}>Add Job</Link>
                </Menu.Item>
                <Menu.Item key={"c-2"}>
                  <Link to={`/AllJobs`}>All Jobs</Link>
                </Menu.Item>
              </>
            )}
            {userInformation && userInformation.type === "admin" && (
              <Menu.Item key={"a-1"}>
                <Link to={"/JobsAdmin"}>All Jobs admin</Link>
              </Menu.Item>
            )}
            {userInformation && userInformation.type === "talent" && (
                <Menu.Item key={"t-1"}>
                  <Link to={"/JobsTalent"}>Jobs</Link>
                </Menu.Item>
            )}
          </Menu>
          <Dropdown overlay={menu} placement="bottomLeft">
            <Button className="bottumDrob">
              <img src={image} className="profileImg" alt="profile" />{" "}
              {userInformation && userInformation.fullName}
            </Button>
          </Dropdown>
      </Header>
      <Content style={{ padding: '0 50px', marginTop: '2rem' }}>
        <div className="site-layout-content" style={{ textAlign: 'center' }}>{ props.children }</div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Talent Hunter</Footer>
    </Layout>
  </ConfigProvider>
};

export default LayoutPage;
