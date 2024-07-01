import React, {useState,useEffect,useRef} from 'react';
import { Form, Input, Button, Select,Image,Checkbox,notification,Radio } from 'antd';
import {useNavigate} from 'react-router-dom';
import UploadMe from '../component/UploadMe';
import TableService from '../util/tableService';
import base64ToFile from '../util/ImageTransformService';
import moment from 'moment';
const openNotificationWithIcon = (type, message, description) => notification[type]({message, description});

const { TextArea } = Input;

const WrongEdit = () => {
  const navigate = useNavigate();
  const [pjddyz,setPjddyz]=useState([]);
  const zpddyz=useRef(null);

  const cxddyz=JSON.parse(localStorage.getItem('wrongRecord'));

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
    formData.append('inputDate', values.inputDate);  
    formData.append('dpjno', values.dpjno);  
    formData.append('back', values.back);  
    formData.append('point', values.point);  
    formData.append('easy', values.easy);  
    formData.append('correct', values.correct);
// 2024/7/1 add for delete images, and subject is not nessesary for update so comment it.
    formData.append('delImages', delImages);
   
    //send http request to store files & images as well as save other info into database
    async function innerMethod(data){
        try{
            await TableService.updateWrongDb(data);
            openNotificationWithIcon("success","错题 数据更新成功!")
            navigate('/nav/wrong/list')
        }catch(ex){
            openNotificationWithIcon("error","错题 数据更新失败!")
        }
    }    
    innerMethod(formData);
  };

  return (
    <>
    <Form 
      layout="vertical" 
      // disabled
      onFinish={onFinish}
      initialValues={{
        dpjno:cxddyz.dpjno,
        inputDate:cxddyz.inputDate,
        back:cxddyz.back,
        easy:cxddyz.easy==='高'?'high':cxddyz.easy==='中'?'medium':'low',
        point:cxddyz.point,
        correct:cxddyz.correct,
      }}
      >
      <Form.Item  
        name="inputDate"
        label={<span style={{ color: 'blue' }}>录入日</span>}  
        // rules={[{ required: true, message: '请选择录入日期!' }]}  
      >  
        <Input type="text" style={{ width: '50%' }}/>   
      </Form.Item>  
      <Form.Item  
        name="dpjno"  
        label={<span style={{ color: 'blue' }}>试题编号(自动生成)</span>} 
        // rules={[{ required: true, message: '请输入本张卷子关键字!' }]}  
      >  
        <Input type="text" 
            disabled 
            style={{ width: '50%',color:'red'}}/>  
      </Form.Item>  
      <Form.Item  
        name="back"  
        label={<span style={{ color: 'blue' }}>出错背景</span>} 
        // rules={[{ required: true, message: '请选择出错背景!' }]}  
      >  
        <Select mode="multiple" style={{ width: '30%' }}>  
          <Select.Option value="随堂测验">随堂测验</Select.Option>  
          <Select.Option value="平时刷题">平时刷题</Select.Option>  
          <Select.Option value="考试">考试</Select.Option>  
          <Select.Option value="其他">其他</Select.Option>  
        </Select>  
      </Form.Item>  
      <Form.Item  
        name="point"  
        label={<span style={{ color: 'blue' }}>考察知识点</span>} 
        // rules={[{ required: true, message: '请输入本张卷子关键字!' }]}  
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
        name="correct"  
        label={<span style={{ color: 'blue' }}>正确答案(照片的话,此处可不填)</span>} 
      >  
        <TextArea  
          // placeholder="上限200字"  
          style={{ color: 'darkgreen' }}  
          maxLength={200}  
          showCount  
          autoSize={{ minRows: 2, maxRows: 6 }}  
        />  
      </Form.Item>  
    {/* </Form> */}
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
        {/* </FormItem> */}
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

export default WrongEdit;
