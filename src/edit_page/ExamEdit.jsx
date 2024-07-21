import React, {useState,useEffect,useRef} from 'react';
import { Form, Input, Button, Select,Image,Checkbox,notification,Radio } from 'antd';
import {useNavigate} from 'react-router-dom';
import UploadMe from '../component/UploadMe';
import TableService from '../util/tableService';
import base64ToFile from '../util/ImageTransformService';
import moment from 'moment';
const openNotificationWithIcon = (type, message, description) => notification[type]({message, description});

const { TextArea } = Input;

const ExamEdit = () => {
  const navigate = useNavigate();
  const [pjddyz,setPjddyz]=useState([]);
  const zpddyz=useRef(null);
  const cxddyz=JSON.parse(localStorage.getItem('examRecord'));

  
  useEffect(()=>{
    setPjddyz(cxddyz.mjddyz.map((zpd)=>{
        return {
            name:zpd,
            value:false
        }
      })
    );
  },[]);


  const onFinish = (values) => {
    // console.log('form data is:',values);
    // console.log('pjddyz:',pjddyz);
    let delImages='';
    for(let i=0;i<pjddyz.length;i++){
      if (pjddyz[i].value===true){
        delImages=delImages + pjddyz[i].name+',';
      }
    }
    // console.log('delImages:',delImages);
    
    // return null;
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
    formData.append('id', cxddyz.id);  
    formData.append('examDate', values.examDate);  
    formData.append('title', values.title);  
    formData.append('easy', values.easy);  
    formData.append('examType', values.examType);  
    formData.append('score', values.score);  
    formData.append('evaluation', values.evaluation);
    formData.append('weakpoint', values.weakpoint);
    formData.append('errsum', values.errsum);
// 2024/7/1 add for delete images, and subject is not nessesary for update so comment it.
    formData.append('delImages', delImages);
    // a invisible variable that contains the key info of this page
    // formData.append('subject', localStorage.getItem("branchDetail"));
   
    //send http request to store files & images as well as save other info into database
    async function innerMethod(data){
        try{
            await TableService.updateExamDb(data);
            openNotificationWithIcon("success","试卷 数据更新成功!")
            navigate('/nav/exam/list')
        }catch(ex){
            openNotificationWithIcon("error","试卷 数据更新失败!")
        }
    }    
    innerMethod(formData);
  };



  return (
    <>
    <Form 
      layout="vertical" 
      onFinish={onFinish}
      initialValues={{
        title:cxddyz.title,
        examDate:cxddyz.examDate,
        easy:cxddyz.easy==='高'?'high':cxddyz.easy==='中'?'medium':'low',
        score:cxddyz.score,
        examType:cxddyz.examType,
        errSum:cxddyz.errSum,
        evaluation:cxddyz.evaluation,
        weakpoint:cxddyz.weakpoint,
      }}
      >
      <Form.Item  
        name="examDate"
        label={<span style={{ color: 'blue' }}>考试日</span>}  
      >  
        <Input type='text' />  
      </Form.Item>  
      <Form.Item  
        name="title"  
        label={<span style={{ color: 'blue' }}>什么卷子</span>} 
      >  
        <Input type="text" />  
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
      >  
        <Select mode="multiple" style={{ width: '100%' }}>  
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
      >  
        <Input type="number" min={0} max={150} />  
      </Form.Item>  
  
      <Form.Item  
        name="evaluation"  
        label={<span style={{ color: 'blue' }}>评价</span>} 
      >  
        <TextArea  
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
          style={{ color: 'darkorange' }}  
          maxLength={200}  
          showCount  
          autoSize={{ minRows: 2, maxRows: 8 }}  
        />  
      </Form.Item>
      <hr />
      <ul>
        {cxddyz.mjddyz.length ? 
        cxddyz.mjddyz.map((smap,index)=>(
          <div key={smap} style={{ display:'flex',alignItems:'center'}}> 
            <Image key={index} width={480} src={smap} />
              <Checkbox 
                // here is bery important
                onChange={(e)=>{
                    setPjddyz((oldzpd)=>{
                      const newzpd=[...oldzpd];
                      newzpd[index].value=!newzpd[index].value;
                      return newzpd;
                    });
                }} 
                style={{marginLeft:'3em',color:'red'}}
                >
                  勾选删除
                </Checkbox> 
          </div>
        )) 
                :
            <p>没有附加图片</p>
        }
      </ul>
      <hr />
      <UploadMe ref={zpddyz} up_btn_txt="*追加文件,图片上传" />
      <hr/>
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
    </Form>
    </>
  );
};

export default ExamEdit;
