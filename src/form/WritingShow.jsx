import React,{useRef} from 'react';
import { Form, Input, Button, Select,Image } from 'antd';
import {useNavigate} from 'react-router-dom';
import RichText from '../component/RichText';

const { TextArea } = Input;

const WritingShow = () => {
  // const [form] = Form.useForm();
  const navigate = useNavigate();
  const zpddyz=useRef(null);

  const cxddyz=JSON.parse(localStorage.getItem('writingRecord'));
  return (
    <>
    <Form 
      layout="vertical" 
      disabled
      initialValues={{
        title:cxddyz.title,
        topic:cxddyz.topic,
        sample:cxddyz.sample,
        comments:cxddyz.comments
      }}
      >
      <Form.Item name="title"
    //    label="题目"
       label={<label  style={{color:'blue'}}>
            题目
            </label>} 
        >
        <Input style={{color:'#a626aa'}} />
      </Form.Item>
      <Form.Item name="topic"
       label={<label  style={{color:'blue'}}>
            题材
            </label>} >
        <Select  mode="multiple" style={{ width: '30%' }}>  
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
        >
          <RichText ref={zpddyz} content={cxddyz.sample} />
        {/* <TextArea 
            rows={10} 
            style={{color:'#009f4d'}}
            // maxLength={1000} 
             /> */}
      </Form.Item>
      <Form.Item name="comments"
    //    label="点评"
        label={<label  style={{color:'blue'}}>
                点评
                </label>} 
        >
        <TextArea rows={4}
          style={{color:'red'}}
         />
      </Form.Item>
    </Form>
    <hr />
    <ul>
      {cxddyz.mjddyz.length ? 
      cxddyz.mjddyz.map((smap,index)=>(
          <Image key={index} width={480} src={smap} />
              // <li >{smap.id}</li>
      )) 
              :
          <p>没有附加图片</p>
      }
    </ul>
    <hr />
    <div style={{display:'flex',justifyContent:'center', alignItems:'center'}}>
        <Button style={{width:'8rem',marginTop:'1rem',marginBottom:'2rem'}}  type='primary' danger onClick={()=>navigate(-1)} >OK</Button>
    </div>
    </>
  );
};

export default WritingShow;
