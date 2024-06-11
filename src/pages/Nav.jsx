import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
const { Header, Content, Sider,Footer } = Layout;
import {AppstoreOutlined, MailOutlined  } from '@ant-design/icons';
import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const items = [
    {
      key: 'ma',
      icon: <MailOutlined />,
      label: '数学',
      children: [
        {
          key: 'ma_nb',
          label: '课本',
        },
        {
          key: 'ma_ext',
          label: '课外课',
        },
        {
          key: 'ma_rev',
          label: '复习'
        },
      ],      
    },
    {
      key: 'ch',
      icon: <AppstoreOutlined />,
      label: '语文',
      children: [
        {
          key: 'ch_nb',
          label: '课本',
        },
        {
          key: 'ch_ext',
          label: '课外课',
        },
        {
          key: 'ch_wri',
          label: '作文'
        },
        {
          key: 'ch_rev',
          label: '复习'
        },
      ],
    },
    {
      key: 'en',
      icon: <AppstoreOutlined />,
      label: '英语',
      children: [
        {
          key: 'en_nb',
          label: '课本',
        },
        {
          key: 'en_ext',
          label: '课外课',
        },
        {
          key: 'en_wri',
          label: '作文'
        },
        {
          key: 'en_rev',
          label: '复习'
        },
      ],
    },
];
const getLevelKeys = (items1) => {

  const key = {};
    const func = (items2, level = 1) => {
      items2.forEach((item) => {
        if (item.key) {
          key[item.key] = level;
        }
        if (item.children) {
          func(item.children, level + 1);
        }
      });
    };
    func(items1);
    return key;
};
  
const levelKeys = getLevelKeys(items);

const Nav = () => {
  const navigate = useNavigate();
  const [stateOpenKeys, setStateOpenKeys] = useState(['2', '23']);
  const [beforeSubject, setBeforeSubject] = useState(true);
  const handleGuoailiBeigan =({key, keyPath, domEvent }) => {
      
      const zpd=key.split('_');
      localStorage.setItem("subkey1",zpd[0]);
      localStorage.setItem("subkey2",zpd[1]);
      setBeforeSubject(false);
      navigate('/导航/空');
  };
  const onOpenChange = (openKeys) => {
  const currentOpenKey = openKeys.find((key) => stateOpenKeys.indexOf(key) === -1);
  // open
  if (currentOpenKey !== undefined) {
    const repeatIndex = openKeys
      .filter((key) => key !== currentOpenKey)
      .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey]);
    setStateOpenKeys(
      openKeys
        // remove repeat key
        .filter((_, index) => index !== repeatIndex)
        // remove current level all child
        .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey]),
    );
    } else {
      // close
      setStateOpenKeys(openKeys);
    }       
  };    
  return (
        <Layout>
        <Sider width={256} style={{ minHeight: '100vh' }}>
          <div style={{ height: '32px', background: 'rgba(255,255,255,.2)', margin: '16px' }} />
          <Menu theme='dark'
            mode="inline"
            defaultSelectedKeys={['231']}
            openKeys={stateOpenKeys}
            onOpenChange={onOpenChange}
            onClick={handleGuoailiBeigan}
            style={{
                width: 256,
                }}
            items={items} >
          </Menu>
        </Sider>
        <Layout >
          <Header style={{ background: '#fff', textAlign: 'center', padding: 0,color:'red' }}>我曾经看过山和大海，也穿过人山人海</Header>
          <Content style={{ margin: '24px 16px 0' }}>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              {beforeSubject && <div>日夜脑未停留,心力用尽学丘</div>}
              {/* <main style={{fontSize:'5em'}}> */}
                <Outlet />
                
              {/* </main> */}
            </div>
            {/* <RootLayout /> */}
          </Content>
          <Footer style={{ textAlign: 'center' }}>蚂蚁设计赋能©2024 Created by zackdson</Footer>
        </Layout>
      </Layout>
  )
};
export default Nav;