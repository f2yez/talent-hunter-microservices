import React from "react";
import { Button, Space, Tag } from 'antd';
import { ProList } from '@ant-design/pro-components';
import LayoutPage from "../layout/LayoutPage";
import "./JobsTalent.css";

const dataSource = [
  {
    name: 'Full Stack Developer',
    image:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    desc: 'A full stack developer is a web developer or engineer who works with both the front and back ends of a website or application. In this sense, they provide an end-to-end service, and can be involved in projects that involve databases and building user-facing websites.',
  },
  {
    name: 'React developer',
    image:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    desc: 'A React developer is responsible for the design and implementation of user interfaces (UIs) and UI components using React, a front-end JavaScript library. They develop and maintain UIs for web and mobile apps.',
  },
  {
    name: 'Android developer',
    image:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    desc: 'An Android developer is responsible for developing applications for devices powered by the Android operating system. Due to the fragmentation of this ecosystem, an Android developer must pay special attention to the applications compatibility with multiple versions of Android and device types.',
  },
  {
    name: 'iOS developers',
    image:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    desc: "iOS developers design and build applications for mobile devices running Apple's iOS operating software. They are responsible for designing and coding the base application, ensuring the quality of the application, fixing application bugs, maintaining the code, and implementing application updates",
  },
];

const JobsTalent = (props) => (
  <LayoutPage>
      <ProList
        style={{ maxWidth: '1250px', margin: 'auto', textAalign: 'left' }}
        toolBarRender={() => {
          return [
            <Button key="add" type="primary">
              Apply for job
            </Button>,
          ];
        }}
        onRow={(record) => {
          return {
            onClick: () => {
              console.log(record);
            },
          };
        }}
        search={{
          searchText: "Search",
          resetText: "Reset",
          submittext: "Search",

        }}
        rowKey="name"
        headerTitle="All Job"
        tooltip="You can make filter for results"
        dataSource={dataSource}
        showActions="hover"
        showExtra="hover"
        metas={{
          title: {
            dataIndex: 'name',
          },
          avatar: {
            dataIndex: 'image',
            search: false,
          },
          description: {
            dataIndex: 'desc',
            search: false,
          },
          subTitle: {
            render: () => {
              return (
                <Space size={0}>
                  <Tag color="blue">web</Tag>
                  <Tag color="#5BD8A6">html</Tag>
                </Space>
              );
            },
            search: false,
          },
          actions: {
            render: (text, row) => [
              <a href={row.html_url} target="_blank" rel="noopener noreferrer" key="link">
                Apply for Job
              </a>,
              // <a href={row.html_url} target="_blank" rel="noopener noreferrer" key="warning">
              //   报警
              // </a>,
              // <a href={row.html_url} target="_blank" rel="noopener noreferrer" key="view">
              //   查看
              // </a>,
            ],
            search: false,
          },
        }}
      />
  </LayoutPage>
)

export default JobsTalent;