import React,{useRef} from 'react';
import { Form, Input, Radio, Button,notification } from 'antd';
import base64ToFile from '../util/ImageTransformService';
import FileService from '../util/fileService';
import UploadMe from '../component/UploadMe';
import moment from 'moment';
import {useNavigate} from 'react-router-dom';

const openNotificationWithIcon = (type, message, description) => notification[type]({message, description});

const { TextArea } = Input;

const NotebookForm = () => {
  const navigate = useNavigate();
  const zpddyz=useRef(null);
  const onFinish = (values) => {
    const formData=new FormData();
    zpddyz.current.files.forEach((file)=>{
        formData.append('files',file.originFileObj);
    });

    const today=moment(new Date()).format("YYYY-MM-DD-hh-mm-ss");
    zpddyz.current.images.forEach((image)=>{
        const zpd_andom=today + '-' + Math.random().toString(18).substring(2);
        formData.append('files',base64ToFile(image.url),zpd_andom);
    });
    // 添加其他字段  
    formData.append('num', values.num);  
    formData.append('keyword', values.keyword);  
    formData.append('easy', values.easy);  
    formData.append('point', values.point);  
    formData.append('teacher', values.teacher);  
    formData.append('remarks', values.remarks);
    formData.append('post', values.post);
    // a invisible variable that contains the key info of this page
    formData.append('subject', localStorage.getItem("branchDetail"));
   
    //send http request to store files & images as well as save other info into database
    async function innerMethod(data){
        try{
            await FileService.uploadFileAndSaveToNotebookDb(data);
            openNotificationWithIcon("success","上传成功!")
            navigate('/nav/notebook/list')
        }catch(ex){
            // console.log("error info is:",ex);
            openNotificationWithIcon("error","上传失败!")
        }
    }    
    innerMethod(formData);
  };

  return (
    <Form
      name="notebook_form"
      layout="vertical"
      initialValues={{ easy: 'medium' }}
      onFinish={onFinish}
      scrollToFirstError
    >
      <Form.Item >
        <span style={{color: 'blue',marginRight: '8px' }}>第</span>
        <Form.Item name="num" noStyle rules={[{ required: true, message: '请输入课数!' }]}>
          <Input type="number" style={{ width: '8%' }} />
        </Form.Item>
        <span style={{ color: 'blue',margin: '0 8px' }}>章(课)</span>
      </Form.Item>
      <Form.Item  
        name="keyword"  
        label={<span style={{ color: 'blue' }}>主题</span>} 
        rules={[{ required: true, message: '请输入本章主题!' }]}  
      >  
        <Input type="text" 
            style={{ width: '50%'}}/>  
      </Form.Item>  
      <Form.Item name="easy" label={<span style={{ color: 'blue' }}>难易度</span>}
        rules={[{ required: true, message: '请选择难易度!' }]}
      >
        <Radio.Group>
          <Radio value="high">高</Radio>
          <Radio value="medium">中</Radio>
          <Radio value="low">低</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item name="point" label={<span style={{ color: 'blue' }}>知识点</span>}>
        <TextArea maxLength={200} placeholder='上限200字' />
      </Form.Item>
      <Form.Item name="teacher" label={<span style={{ color: 'blue' }}>老师讲解精髓</span>}>
        <TextArea maxLength={200} placeholder='上限200字' />
      </Form.Item>
      <Form.Item name="remarks" label={<span style={{ color: 'blue' }}>备注</span>}>
        <TextArea maxLength={200} placeholder='上限200字' />
      </Form.Item>
      <Form.Item name="post" label={<span style={{ color: 'blue' }}>后期复习记入</span>}>
        <TextArea maxLength={200} style={{ color: 'darkgreen' }} placeholder='上限200字' />
      </Form.Item>
      {/* make the upload functionability to be a common component */}
      <UploadMe ref={zpddyz} up_btn_txt="*关联题型,课堂笔记等照片或文件上传的话,点击下面按钮" />
      <hr />
      <Form.Item >
      <div style={{display:'flex',justifyContent:'center',paddingTop:'2em'}}>
        <Button type="primary" danger htmlType="submit" style={{ fontSize:'18px',width: '30%' }}>
            提交
          </Button>
        <Button type="primary"
          style={{ fontSize:'18px',width: '30%' ,marginLeft:'1em'}}
          onClick={()=>navigate(-1)}
          >
            取消
          </Button>
      </div>
      </Form.Item>
    </Form>
  );
};

export default NotebookForm;
