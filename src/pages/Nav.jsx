import React, { useState } from 'react';
import { Layout, Menu,Button,Tooltip,Modal,Form,Input } from 'antd';
const { Header, Content, Sider,Footer } = Layout;
import { Outlet,useNavigate,useLoaderData,redirect } from 'react-router-dom';
import UserService from '../util/userService';
import { notification } from "antd";
import { tokenLoader } from '../util/authentication';
import { LogoutOutlined,UserOutlined,ToolOutlined,CheckCircleOutlined,AppstoreOutlined } from '@ant-design/icons';

const openNotificationWithIcon = (type, message, description) => notification[type]({message, description});

export async function loader(){
    // look if the token is expired!
    tokenLoader();
    try {
      // 2024/6/24 此处需要修改，根据年级抽取科目getInitSetting()
        // const restData = await UserService.getAllSubjects();
        const restData = await UserService.getInitDson();
        const subjects = await restData.data;
        console.log('=nav=,subjects=',subjects);
        let guoaili=subjects.filter(xg=>xg.allsub !== null && xg.allsub.length>2);
        console.log('=nav=guoaili length:',guoaili.length);

        // 2024/6/24 if no subject and subtype available,go to the congfig page.
        // there is an infinite loop when the bellow code runs.
        // I think the logic is 'if the father page (nav) is not renderd, then
        // there is no possible of diving into its son page firstly.
        // if(guoaili.length===0) return redirect('/nav/manage');
        if(guoaili.length===0){
          openNotificationWithIcon('warning',"您还设定没有科目，请首先点击左上方的【学科管理】按钮");
        }

        let items=[];
        items=guoaili.map((xxg)=>{
            return {
                // key: xxg.name,
                key: xxg.chname,
                icon: <AppstoreOutlined />,
                label: xxg.chname,
                children:JSON.parse(xxg.allsub),           
            }
        });
        console.log("=nav=after transformming of subject and subtype,items=",items);
        return items;

    }catch(ex){
        // alert("主科目取得异常,请检查后端是否开启");
        // openNotificationWithIcon("error","主科目取得异常,请联系管理员");
        openNotificationWithIcon("error","令牌过期，请重新登录");
        return redirect('/');
    }
}


export default function Nav () {
    const items=useLoaderData();
    if(!items){
        // alert("main主科目取得异常,请检查后端是否开启");
        // openNotificationWithIcon("error","主科目取得异常,请联系管理员",ex);
      return null;
    }

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
    // console.log('items main=',items);
    const levelKeys = getLevelKeys(items);
    const navigate = useNavigate();
    const [stateOpenKeys, setStateOpenKeys] = useState([]);
    // 导航页面nav显示时，显示 【日夜脑未停留,心力用尽学丘】用
    const [beforeSubject, setBeforeSubject] = useState(true);
    const [visible,setVisible]=useState(false);
    const [zpddyz,setZpddyz]=useState({});

  const handleGuoailiBeigan =({key }) => {
    // 20240614 add here temporary for testing upload files and images
    // navigate('/nav/demo3');
    // navigate('/nav/demo2');
    // navigate('/nav/demo');
    // return null;

    setBeforeSubject(false);
    // let 江珊=String(key).slice(2);
    // console.log('江珊=',江珊);
    localStorage.setItem("branchDetail",key);
      navigate('/nav/empty');
  };

  const handelSubjectManamementButton = () => {
    setBeforeSubject(false);
    navigate('/nav/manage');
  }

  // 2024/6/29
  const handleUserInfo=()=>{
    setZpddyz(()=> {
      const mjddyz={
        username:localStorage.getItem('user'),
        school:localStorage.getItem('school')==='primary'?'小学'
              :localStorage.getItem('school')==='middle'?'初中':'高中',
        grade:localStorage.getItem('grade') }
      return mjddyz;
    });
    setVisible(true);
  }

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
          {/* <div style={{ height: '32px', background: 'rgba(255,255,255,.2)', margin: '16px' }} /> */}
          <Button 
            style={{ width:'80%', height: '32px', background: 'rgba(255,255,255,.2)', margin: '16px',color:'yellow',fontSize:'18px' }}
            type='text' onClick={handelSubjectManamementButton}
             >学科管理</Button>
          <Menu theme='dark'
            mode="inline"
            // defaultSelectedKeys={['231']}
            openKeys={stateOpenKeys}
            onOpenChange={onOpenChange}
            onClick={handleGuoailiBeigan}  //important, the main work flows are here!
            style={{
                width: 256,
                }}
            items={items} >
          </Menu>
        </Sider>
        <Layout >
          <Header style={{ 
                background: '#0066a1', 
                // background: '#008000', 
                textAlign: 'center', 
                padding: 0,
                color:'white', 
                fontSize:'26px'
            }}
          >
            {/* 我曾经看过山和大海，也穿过人山人海 */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ fontSize: '28px', marginLeft:'1em' }}>我曾经看过山和大海，也穿过人山人海</span>
          </div>
          <div>
            <Tooltip title="当前用户信息">
              <Button type="primary"  shape="circle" icon={<UserOutlined />} 
              style={{ marginRight: '10px',backgroundColor:'#2529d8' }} 
              onClick={handleUserInfo}
              />
            </Tooltip>
            <Tooltip title="修改年级">
              <Button type="primary"  shape="circle" icon={<ToolOutlined />} style={{ marginRight: '10px',backgroundColor:'#2529d8' }} />
            </Tooltip>
            {/* 2024/6/24 add */}
            <Tooltip title="编辑科目及子分类">
              <Button type="primary"  shape="circle" icon={<CheckCircleOutlined />} style={{ marginRight: '10px',backgroundColor:'#2529d8' }} />
            </Tooltip>
            <Tooltip title="退出当前登录状态">
              <Button type="primary"  shape="circle" icon={<LogoutOutlined />} 
                style={{ marginRight: '10px',backgroundColor:'#2529d8' }}
                onClick={()=>navigate('/logout')}
              />
            </Tooltip>
          </div>
        </div>
          </Header>
          <Content style={{ margin: '24px 16px 0' }}>
            <div style={{ padding: 12, background: '#fff', minHeight: 360 }}>
              {beforeSubject && <div>
                  <h1>
                  ==========    日夜脑未停留,心力用尽学丘    ==========
                  </h1>
                </div>}
              {/* <main style={{fontSize:'5em'}}> */}
                <Outlet />
                
              {/* </main> */}
            </div>
            {/* <RootLayout /> */}
          </Content>
          <Footer style={{ textAlign: 'center' }}>蚂蚁设计赋能©2024 Created by zackdson</Footer>
          <Modal  
            title="用户信息"  
            open={visible} 
            destroyOnClose
            onCancel={()=>setVisible(false)}  
            footer={null}  
          >  
            <Form  
              name="userInfo"
              initialValues={zpddyz}
            >  
              <Form.Item
                name="username"
                label="用户名"
              >
                <Input style={{color:'blue'}}  />
              </Form.Item>

              <Form.Item
                name="school"
                label="学校"
              >
                <Input  style={{color:'blue'}}  />
              </Form.Item>

              <Form.Item
                name="grade"
                label="年级"
              >
                <Input style={{color:'blue'}}/>
              </Form.Item>
                <Form.Item>  
                  <Button type="primary" danger 
                    style={{marginLeft:'15em'}}
                    onClick={()=>setVisible(false)} >  
                  OK
                </Button>  
              </Form.Item>  
            </Form>  
          </Modal>             
        </Layout>
      </Layout>
  )
};
// export default Nav;