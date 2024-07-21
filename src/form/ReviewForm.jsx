import React,{useRef} from 'react';
import { Form, Input, Button, DatePicker, Select,notification } from 'antd';
import base64ToFile from '../util/ImageTransformService';
import FileService from '../util/fileService';
import UploadMe from '../component/UploadMe';
import {useNavigate} from 'react-router-dom';
import moment from 'moment'; // 日期选择组件需要moment.js来处理日期  
const openNotificationWithIcon = (type, message, description) => notification[type]({message, description});

const { TextArea } = Input;

const ReviewForm = () => {
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
        formData.append('reviewDate', moment(values.examDate).format('YYYY-MM-DD'));  
        formData.append('category', values.category);  
        formData.append('title', values.title);  
        formData.append('detail', values.detail);  
        formData.append('overview', values.overview);  
        // a invisible variable that contains the key info of this page,it's nessessary
        formData.append('subject', localStorage.getItem("branchDetail"));
       
        //send http request to store files & images as well as save other info into database
        async function innerMethod(data){
            try{
                await FileService.uploadFileAndSaveToReviewDb(data);
                openNotificationWithIcon("success","上传成功!")
                navigate('/nav/review/list')
            }catch(ex){
                // console.log("error info is:",ex);
                openNotificationWithIcon("error","上传失败!")
            }
        }    
        innerMethod(formData);
      };
  return (
    <Form 
        layout="vertical"
        onFinish={onFinish}
        scrollToFirstError
        // style={{ maxWidth: '400px' }}  
    >
      <Form.Item name="reviewDate" label={<label style={{color:'blue'}}>复习日</label>}>
        <DatePicker />
      </Form.Item>
      <Form.Item name="category" label={<label style={{color:'blue'}}>分类</label>} required>
        <Select style={{ width: '30%' }}>
          <Select.Option value="随堂复习">随堂复习</Select.Option>
          <Select.Option value="周复习">周复习</Select.Option>
          <Select.Option value="月复习">月复习</Select.Option>
          <Select.Option value="期中复习">期中复习</Select.Option>
          <Select.Option value="期末复习">期末复习</Select.Option>
          <Select.Option value="总复习">总复习</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item name="title" label={<label style={{color:'blue'}}>复习内容概述</label>} required>
        <Input style={{ width: '50%'}}/>
      </Form.Item>
      <Form.Item name="detail" label={<label style={{color:'blue'}}>复习内容详细</label>}>
        <TextArea maxLength={200} placeholder="上限200字" style={{color:'darkgreen'}} />
      </Form.Item>
      <Form.Item name="overview" label={<label style={{color:'blue'}}>个人总结</label>}>
        <TextArea maxLength={100} placeholder="上限100字" style={{color:'darkviolet'}} />
      </Form.Item>
      <UploadMe ref={zpddyz} up_btn_txt="*复习照片或文件上传的话,点击下面按钮" />
      <hr />
      <Form.Item>  
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

export default ReviewForm;
