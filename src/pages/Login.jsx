import React, { useState } from 'react';  
import { Modal, Form, Input, Button,notification } from 'antd';
import Container from '../util/Container';
import AuthService from '../util/authService';
import {useNavigate} from 'react-router-dom';
  
const openNotificationWithIcon = (type, message, description) => notification[type]({message, description});
// 登录功能组件  
const LoginForm = () => { 
  const [visible,setVisible]=useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  
  // 处理注册Modal的显示与隐藏  
  const showRegisterModal = () => {  
    setVisible(true);  
  };  
  
  // 处理注册Modal的关闭  
  const handleRegisterCancel = () => {  
    setVisible(false);  
  };  
  
  // 处理注册表单的提交（这里仅作演示，实际应发送请求到服务器）  
  const handleRegisterFinish = values => {  
    // console.log('Received values of register form:', values);  
    async function register(val) {
        try {
          await AuthService.createuser({
            username:val.username,
            password:val.password,
          });
          // const rtn = await res.data;
          form.resetFields();
          openNotificationWithIcon('success','同学注册成功!')
          setVisible(false);
          // console.log('the return value: ', res);
        }catch(err){
            openNotificationWithIcon('error','同学注册失败!请联系管理员')
        }
      };
    register(values);
  };  
//   登录服务请求
  const onFinish = async (values) => {
    try {
      const res = await AuthService.loginuser({
        username:values.username,
        password:values.password,
      });
      openNotificationWithIcon('success',values.username+' 同学登录成功');
      form.resetFields();
      // console.log('the return value: ', res);
    //   the token is saved in the ruturn password 2024/6/29
      localStorage.setItem('token', res.data.password);
      // localStorage.setItem('user',res.data.username);  //2024/5/9
      if(res.data.username){
        localStorage.setItem('long',"donglai");  //2024/7/4
      }else{
        localStorage.setItem('long',"dongqiang");  //2024/7/4
      }
      const expiration = new Date();
      expiration.setMinutes(expiration.getMinutes() + 60);
      localStorage.setItem('expiration', expiration);
      navigate('/home');
    }catch(err){
      // console.log(err);
      if(err.response.status===404){
          openNotificationWithIcon('error',values.username+' 同学身份验证失败，用户不存在或者密码错误');
      }else{
          openNotificationWithIcon('error',values.username+' 同学登录失败',err.response.data.message);
      }
      // console.log('err!',err);
    }
  };


  return (  
    <>
      <h1 style={{textAlign:'center'}}>蓝城市滨海新区初高中学习辅助系统</h1>
      <h2 style={{textAlign:'center',color:'blue'}}>同学请登录</h2>
      <Container>
        <Form  
            name="login"  
            initialValues={{ remember: true }}  
            onFinish={onFinish}
            // 这里可以添加onFinish来处理登录表单的提交  
        >  
            <Form.Item  
            name="username"  
            label="用户名"  
            rules={[{ required: true, message: '请输入用户名!' }]}  
            >  
            <Input />  
            </Form.Item>  
    
            <Form.Item  
            name="password"  
            label="密码"  
            rules={[{ required: true, message: '请输入密码!' }]}  
            >  
            <Input.Password />  
            </Form.Item>  
    
            <Form.Item>  
            <Button type="primary" htmlType="submit"
                style={{marginLeft:'5em'}}
            >  
                登录  
            </Button>  
            <Button type="link" onClick={showRegisterModal}>  
                注册新用户  
            </Button>  
            </Form.Item>  
        </Form>  
      </Container>
  
      {/* 注册Modal */}  
    <Modal  
      title="注册新用户"  
      open={visible} 
      destroyOnClose
      onCancel={()=>setVisible(false)}  
      footer={null}  
    >  
      <Form  
        form={form}  
        name="register"  
        onFinish={handleRegisterFinish}  
      >  
        {/* 表单项，如姓名、电子邮件、密码等 */}  

      <Form.Item
        name="username"
        label="用户名"
        rules={[
          {
            required: true,
            message: 'Please input your username',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label="密码"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="密码确认"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The new password that you entered do not match!'));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
        <Form.Item>  
          <Button type="primary" danger htmlType="submit" style={{marginLeft:'10em',marginRight:'2em'}}>  
            注册  
          </Button>  
          <Button type="primary" onClick={handleRegisterCancel} >  
            取消
          </Button>  
        </Form.Item>  
      </Form>  
    </Modal>   
    </> 
  );  
};  
  
export default LoginForm;