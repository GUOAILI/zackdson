import React, { useRef } from 'react';
import { Form, Input, Button, notification,Select } from 'antd';
import UploadMe from '../component/UploadMe';
import RichText from '../component/RichText';
import FileService from '../util/fileService';
import base64ToFile from '../util/ImageTransformService';
import moment from 'moment';
import {useNavigate} from 'react-router-dom';

const openNotificationWithIcon = (type, message, description) => notification[type]({message, description});
const { TextArea } = Input;

const WritingForm = () => {
  const [form] = Form.useForm();
  const zpddyz=useRef(null);
  const cxddyz=useRef(null);
  const navigate = useNavigate();
  // const [uploadedFiles, setUploadedFiles] = useState([]);
  // const [uploadedImages, setUploadedImages] = useState([]);

  // Form submit handler
  const onFinish = (values) => {
    // Here you can handle form submission logic, e.g., send data to server
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
    formData.append('imp', values.imp);  
    formData.append('title', values.title);  
    formData.append('topic', values.topic);  
    // formData.append('sample', values.sample);  
    formData.append('sample', cxddyz.current.richtext);  
    formData.append('comments', values.comments);
    // a invisible variable that contains the key info of this page
    formData.append('subject', localStorage.getItem("branchDetail"));
   
    //send http request to store files & images as well as save other info into database
    async function innerMethod(data){
        try{
            await FileService.uploadFileAndSaveToWritingDb(data);
            openNotificationWithIcon("success","上传成功!")
            navigate('/nav/writing/list')
        }catch(ex){
            openNotificationWithIcon("error","上传失败!")
        }
    }    
    innerMethod(formData);
  };

  return (
    <Form form={form} 
      layout="vertical" 
      onFinish={onFinish}
      scrollToFirstError
      >
      <Form.Item
        // label="重要度" 
        label={<label  style={{color:'blue'}}>
                重要度
                </label>} 
        name="imp"  
        rules={[{ required: true, message: '请选择重要度!' }]}  
      >  
        <Select placeholder="请选择重要度" style={{ width: '30%' }}>  
          <Select.Option value={3}>高</Select.Option>  
          <Select.Option value={2}>中</Select.Option>  
          <Select.Option value={1}>低</Select.Option>  
        </Select>  
      </Form.Item>        
      <Form.Item name="title"
       label={<label  style={{color:'blue'}}>
            题目
            </label>} 
        rules={[{ required: true, message: '请输入题目' }]}>
        <Input placeholder='输入作文题目' style={{ width: '30%' }} />
      </Form.Item>
      <Form.Item name="topic"
       label={<label  style={{color:'blue'}}>
            题材
            </label>} 
        rules={[{ required: true, message: '请输入题材' }]}>
        <Select mode="multiple" style={{ width: '30%' }}>  
          <Select.Option value="记叙文">记叙文</Select.Option>  
          <Select.Option value="说明文">说明文</Select.Option>  
          <Select.Option value="抒情文">抒情文</Select.Option>  
          <Select.Option value="议论文">议论文</Select.Option>  
          <Select.Option value="应用文">应用文</Select.Option>  
        </Select>  
      </Form.Item>
      <Form.Item name="sample" 
        // label="范文" 
        label={<label  style={{color:'blue'}}>
                范文
                </label>} 
        // rules={[{ required: true, message: '请输入范文' }]}
        >
        <RichText ref={cxddyz} />
        {/* <TextArea rows={20} 
            maxLength={2000} 
            showCount
            // autoSize={{ minRows: 2, maxRows: 30 }}  
              placeholder='手工输入,或者从网页上黏贴过来,上限2000字'
             /> */}
      </Form.Item>
      <Form.Item name="comments"
    //    label="点评"
        label={<label  style={{color:'blue'}}>
                点评
                </label>} 
        // rules={[{ required: true, message: '请输入点评' }]}
        >
        <TextArea rows={2} maxLength={100} placeholder='上限100字' />
      </Form.Item>
      <UploadMe ref={zpddyz} up_btn_txt="*范文上传(比如手机照片)" />
      <hr/>
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

export default WritingForm;
