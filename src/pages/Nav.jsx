import React, { useState } from 'react';
import { Layout, Menu,Button,Tooltip,Modal,Form,Input,Popconfirm } from 'antd';
const { Header, Content, Sider,Footer } = Layout;
import { Outlet,useNavigate,useLoaderData,redirect } from 'react-router-dom';
import MenuService from '../util/menuService';
import { notification } from "antd";
import { tokenLoader } from '../util/authentication';
import { LogoutOutlined,UserOutlined,
  ToolOutlined,CheckCircleOutlined,
  ArrowDownOutlined,ArrowUpOutlined,
  AppstoreOutlined } from '@ant-design/icons';
import GradeService from '../util/gradeService';
import UserService from '../util/userService';

const openNotificationWithIcon = (type, message, description) => notification[type]({message, description});

export async function loader(){
    // look if the token is expired!
    tokenLoader();
    try {
      // 2024/6/24 此处需要修改，根据年级抽取科目getInitSetting()
        // const restData = await MenuService.getAllSubjects();
        const restData = await MenuService.getInitDson();
        const subjects = await restData.data;
        // console.log('=nav=,subjects=',subjects);
        let guoaili=subjects.filter(xg=>xg.allsub !== null && xg.allsub.length>2);
        // console.log('=nav=guoaili length:',guoaili.length);

        // 2024/6/24 if no subject and subtype available,go to the congfig page.
        // there is an infinite loop when the bellow code runs.
        // I think the logic is 'if the father page (nav) is not renderd, then
        // there is no possible of diving into its son page firstly.
        // if(guoaili.length===0) return redirect('/nav/manage');
        if(guoaili.length===0){
          openNotificationWithIcon('warning',"您还设定没有科目，请首先点击左上方的【学科管理】按钮");
        }else{
          // 2024/7/3 add for subject and branch table curd request
          localStorage.setItem('dpj-sb',JSON.stringify(guoaili.map((ini)=>ini.chname)));
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
        // console.log("=nav=after transformming of subject and subtype,items=",items);
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
  const handleUserInfo=async ()=>{
    try{
      const resData =await UserService.getCurrentUser();
      const username= await resData.data.username;
      setZpddyz(()=> {
        const mjddyz={
          // 2024/7/4 here the username should get from backend,not saved in local for security reason.
          // username:localStorage.getItem('user'),
          username:username,
          school:localStorage.getItem('school')==='primary'?'小学'
                :localStorage.getItem('school')==='middle'?'初中':'高中',
          grade:localStorage.getItem('grade') }
        return mjddyz;
      });
      setVisible(true);
      }catch(ex){
      openNotificationWithIcon("error","后台取得用户异常");
      return null;
    }
  }
  // 2024/7/2
  const handlerChangeGrade = () => {
    async function delGrade() {
      try{
          await GradeService.deleteGrade();
          localStorage.setItem('resetGrade','yes');
          localStorage.removeItem('school'); 
          localStorage.removeItem('grade');
          navigate('/home')
      }catch(err){
          openNotificationWithIcon("error","年级变更处理后台异常!请联系管理员")
          return null;
      }
    }
    delGrade();
  }

  // const handleSubjectEdit = ()

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
            <Popconfirm
              title="变更年级"
              onConfirm={handlerChangeGrade}
              description="您确认要变更吗？请注意变更后现有的数据都会暂时不可见，直到把年级重新变回来。"
              okText="是的，我要变更"
              cancelText="取消变更"
            >
              <Button type="primary" 
                shape="circle" icon={<ToolOutlined />} 
                style={{ marginRight: '10px',backgroundColor:'#2529d8' }}
              />
            </Popconfirm>
            </Tooltip>
            {/* 2024/6/24 add */}
            <Tooltip title="编辑科目及子分类">
              <Button type="primary"  
                      onClick={()=>navigate('/nav/subject')}
                      shape="circle" icon={<CheckCircleOutlined />} 
                      style={{ marginRight: '10px',backgroundColor:'#2529d8' }}
              />
            </Tooltip>
            <Tooltip title="从本地文件导入数据">
              <Button type="primary"  
                      onClick={()=>navigate('/nav/deserialize')}
                      shape="circle" icon={<ArrowUpOutlined />} 
                      style={{ marginRight: '10px',backgroundColor:'#ffa700' }}
              />
            </Tooltip>
            {localStorage.getItem('long')==='donglai' && 
            <Tooltip title="表数据本地持久化">
              <Button type="primary"  
                      onClick={()=>navigate('/nav/serialize')}
                      shape="circle" icon={<ArrowDownOutlined />} 
                      style={{ marginRight: '10px',backgroundColor:'red' }}
              />
            </Tooltip>
            }
            <Tooltip title="退出当前登录状态">
            <Popconfirm
              title="退出确认"
              onConfirm={()=>navigate('/logout')}
              description="您确认要退出吗？请确认已经提交了写好的数据。"
              okText="是的，退出"
              cancelText="不退了"
            >
                <Button type="primary"  shape="circle" icon={<LogoutOutlined />} 
                  style={{ marginRight: '10px',backgroundColor:'#848482' }}
                  // onClick={()=>navigate('/logout')}
                />
            </Popconfirm>
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