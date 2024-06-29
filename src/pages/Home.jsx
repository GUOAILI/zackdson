import { useNavigate,useLoaderData,redirect } from 'react-router-dom';
import { notification,Modal,Form,Button,Select } from "antd";
import GradeService from "../util/gradeService";
import React,{ useState } from 'react';

const openNotificationWithIcon = (type, message, description) => notification[type]({message, description});


export async function loader() {
  try{
    const resData=await GradeService.getGrade();
    const zpddyz=await resData.data;
    if (zpddyz)  {
      localStorage.setItem('grade',zpddyz); //string school, int grade
      // 2024/6/25 first look at the initdson to verify the subject existing status

      return redirect('/nav');
      // return redirect('/nav');
    }

  }catch(err){
    openNotificationWithIcon("error","数据库访问异常，请确认后台已经启动。或者请联系管理员");
    return null;
  }
}


export default function HomePage() {
  const navigate = useNavigate();
  const [visible,setVisible]=useState(true);
  // const [existlmj,setExistlmj]=useState(false);
  // const zpddyz=useLoaderData();
  // if (!zpddyz){
  //   setVisible(true);
  // }else{
  //   // 如果grade db已经登陆，则跳过设定这一步，进入下一页面
  //   setExistlmj(true);
  // }

  // const handleCancel=()=>{
  //     setVisible(false);
  // }

  const onFinish =(values)=>{
      async function updateDb(a,b) {
          try{
              await GradeService.saveGrade(a,b);
              openNotificationWithIcon("success","设定成功。")
              setVisible(false);
              navigate('/nav/manage')
          }catch(err){
              openNotificationWithIcon("error","设定失败!请联系管理员")
              return null;
          }
      }
      console.log('values:',values);
      updateDb(values.school,values.grade);
  }

  return (
    <>
      <h1>蓝城市滨海区初高中学习辅助系统</h1>
      {/* 2024/6/18 此处改成handleclick方法，检索grade db,如果不存在，弹出modal设定 */}
      <Modal 
        title="年级确认"
        open={visible}
        // onCancel={handleCancel}
        footer={null}
        >
            <Form onFinish={onFinish}
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 14,
                }}
                layout="horizontal"
                style={{
                    maxWidth: 600,
                }}
              >
                <Form.Item label="school" name="school">
                <Select>
                    <Select.Option value="primary">小学</Select.Option>
                    <Select.Option value="middle">初中</Select.Option>
                    <Select.Option value="high">高中</Select.Option>
                </Select>
                </Form.Item>
                <Form.Item label="grade" name="grade">
                <Select>
                    <Select.Option value={1}>一年级</Select.Option>
                    <Select.Option value={2}>二年级</Select.Option>
                    <Select.Option value={3}>三年级</Select.Option>
                    <Select.Option value={4}>四年级</Select.Option>
                    <Select.Option value={5}>五年级</Select.Option>
                    <Select.Option value={6}>六年级</Select.Option>
                </Select>
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                        }}
                >
                    <Button type="primary" danger htmlType="submit">
                    提交
                    </Button>
                </Form.Item>
             </Form>            
        </Modal>
        </>
  );
}