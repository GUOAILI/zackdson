import React,{useRef} from 'react';  
import { Form, Input, DatePicker, Radio,Select, Button,notification } from 'antd'; 
import base64ToFile from '../util/ImageTransformService';
import FileService from '../util/fileService';
import UploadMe from '../component/UploadMe';
import {useNavigate} from 'react-router-dom';
import moment from 'moment'; // 日期选择组件需要moment.js来处理日期  

const openNotificationWithIcon = (type, message, description) => notification[type]({message, description});
const { TextArea } = Input;
  
const ExtensionForm = () => {  
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
        formData.append('extDate', moment(values.extDate).format('YYYY-MM-DD'));  
        formData.append('teacher', values.teacher);  
        formData.append('abs', values.abs);  
        formData.append('easy', values.easy); 
        formData.append('content', values.content);
        // a invisible variable that contains the key info of this page,it's nessessary
        formData.append('subject', localStorage.getItem("branchDetail"));
       
        //send http request to store files & images as well as save other info into database
        async function innerMethod(data){
            try{
                await FileService.uploadFileAndSaveToExtDb(data);
                openNotificationWithIcon("success","上传成功!")
                navigate('/nav/extension/list')
            }catch(ex){
                // console.log("error info is:",ex);
                openNotificationWithIcon("error","上传失败!")
            }
        }    
        innerMethod(formData);
      };
      
  return (  
    <Form  
      name="extension_form"  
      layout="vertical"
      // initialValues={{ back: '随堂测验',dpjno:localStorage.getItem('branchDetail')+'-'+moment(new Date()).format("YYYY-MM-DD-hh-mm-ss") }}  
      onFinish={onFinish}
      scrollToFirstError
    //   style={{ maxWidth: '400px' }}  
    >  
      <Form.Item  
        name="extDate"
        label={<span style={{ color: 'blue' }}>授课日</span>}  
        rules={[{ required: true, message: '请选择授课日期!' }]}  
      >  
        <DatePicker  />  
      </Form.Item>  
      <Form.Item  
        name="teacher"  
        label={<span style={{ color: 'blue' }}>授课老师</span>} 
        // rules={[{ required: true, message: '请输入本张卷子关键字!' }]}  
      >  
        <Input type="text" 
            style={{ width: '50%'}}/>  
      </Form.Item>  
      <Form.Item  
        name="abs"  
        label={<span style={{ color: 'blue' }}>内容摘要</span>} 
        rules={[{ required: true, message: '请输入内容关键字!' }]}  
      >  
        <Input type="text" 
            style={{ width: '50%'}}/>  
      </Form.Item>  
  
      <Form.Item  
        name="easy"
        label={<span style={{ color: 'blue' }}>难易度</span>} 
      >  
        <Radio.Group>  
          <Radio value="high">高</Radio>  
          <Radio value="medium">中</Radio>  
          <Radio value="low">低</Radio>  
        </Radio.Group>  
      </Form.Item>  
  
      <Form.Item  
        name="content"  
        label={<span style={{ color: 'blue' }}>授课内容(贴照片的话,此处可不填)</span>} 
      >  
        <TextArea  
          placeholder="上限200字"  
          style={{ color: 'darkgreen' }}  
          maxLength={200}  
          showCount  
          autoSize={{ minRows: 2, maxRows: 4 }}  
        />  
      </Form.Item>  
      {/* make the upload functionability to be a common component */}
      <UploadMe ref={zpddyz} up_btn_txt="*课外课笔记照片或文件上传的话,点击下面按钮" />
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
  
export default ExtensionForm;