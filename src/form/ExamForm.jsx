import React,{useRef} from 'react';  
import { Form, Input, DatePicker, Radio,Select, Button,notification } from 'antd'; 
import base64ToFile from '../util/ImageTransformService';
import FileService from '../util/fileService';
import UploadMe from '../component/UploadMe';
import {useNavigate} from 'react-router-dom';
import moment from 'moment'; // 日期选择组件需要moment.js来处理日期  

const openNotificationWithIcon = (type, message, description) => notification[type]({message, description});
const { TextArea } = Input;
  
const ExamForm = () => {  
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
        formData.append('examDate', moment(values.examDate).format('YYYY-MM-DD'));  
        formData.append('title', values.title);  
        formData.append('easy', values.easy);  
        formData.append('examType', values.examType);  
        formData.append('score', values.score);  
        formData.append('evaluation', values.evaluation);
        formData.append('weakpoint', values.weakpoint);
        formData.append('errsum', values.errsum);
        // a invisible variable that contains the key info of this page,it's nessessary
        formData.append('subject', localStorage.getItem("branchDetail"));
       
        //send http request to store files & images as well as save other info into database
        async function innerMethod(data){
            try{
                await FileService.uploadFileAndSaveToExamDb(data);
                openNotificationWithIcon("success","上传成功!")
                navigate('/nav/exam/list')
            }catch(ex){
                // console.log("error info is:",ex);
                openNotificationWithIcon("error","上传失败!")
            }
        }    
        innerMethod(formData);
      };
      
  return (  
    <Form  
      name="exam_form"
      layout="vertical"
      initialValues={{ easy: 'medium' }}  
      onFinish={onFinish}
      scrollToFirstError
    //   style={{ maxWidth: '400px' }}  
    >  
      <Form.Item  
        name="examDate"
        label={<span style={{ color: 'blue' }}>考试日</span>}  
        // label="考试日"  
        rules={[{ required: true, message: '请选择考试日期!' }]}  
      >  
        <DatePicker  />  
      </Form.Item>  
      <Form.Item  
        name="title"  
        label={<span style={{ color: 'blue' }}>什么卷子</span>} 
        rules={[{ required: true, message: '请输入本张卷子关键字!' }]}  
      >  
        <Input type="text" style={{ width: '50%' }}/>  
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
        name="examType"  
        label={<span style={{ color: 'blue' }}>考试分类</span>} 
        rules={[{ required: true, message: '请选择考试分类!' }]}  
      >  
        <Select mode="multiple" style={{ width: '30%' }}>  
          <Select.Option value="随堂">随堂</Select.Option>  
          <Select.Option value="自测">自测</Select.Option>  
          <Select.Option value="期中">期中</Select.Option>  
          <Select.Option value="期末">期末</Select.Option>  
          <Select.Option value="月考">月考</Select.Option>  
        </Select>  
      </Form.Item>  
  
      <Form.Item  
        name="score"  
        label={<span style={{ color: 'blue' }}>成绩</span>} 
        rules={[{ required: true, message: '请输入成绩!' }]}  
      >  
        <Input type="number" min={0} max={150} />  
      </Form.Item>  
  
      <Form.Item  
        name="evaluation"  
        label={<span style={{ color: 'blue' }}>评价</span>} 
      >  
        <TextArea  
          placeholder="上限100字"  
          style={{ color: 'darkgreen' }}  
          maxLength={100}  
          showCount  
          autoSize={{ minRows: 2, maxRows: 4 }}  
        />  
      </Form.Item>  
  
      <Form.Item  
        name="weakpoint"  
        label={<span style={{ color: 'blue' }}>暴露不足点</span>} 
      >  
        <TextArea  
          placeholder="上限100字"  
          style={{ color: 'darkpurple' }}  
          maxLength={100}  
          showCount  
          autoSize={{ minRows: 2, maxRows: 4 }}  
        />  
      </Form.Item>  
  
      <Form.Item  
        name="errsum"  
        label={<span style={{ color: 'blue' }}>错题总结</span>} 
      >  
        <TextArea  
          placeholder="上限200字"  
          style={{ color: 'darkorange' }}  
          maxLength={200}  
          showCount  
          autoSize={{ minRows: 2, maxRows: 8 }}  
        />  
      </Form.Item>
      {/* make the upload functionability to be a common component */}
      <UploadMe ref={zpddyz} up_btn_txt="*试卷照片或文件上传的话,点击下面按钮" />
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
  
export default ExamForm;