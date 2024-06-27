import React from 'react';
import { Form, Input, Button, Select,Image } from 'antd';
import {useNavigate} from 'react-router-dom';

const { TextArea } = Input;

const WritingShow = () => {
  // const [form] = Form.useForm();
  const navigate = useNavigate();

  const cxddyz=JSON.parse(localStorage.getItem('writingRecord'));
  return (
    <>
    <Form 
      layout="vertical" 
      // disabled
      initialValues={{
        title:cxddyz.title,
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
        <Input />
      </Form.Item>
      <Form.Item name="sample" 
        // label="范文" 
        label={<label  style={{color:'blue'}}>
                范文
                </label>} 
        >
        <TextArea 
            rows={10} 
            // maxLength={1000} 
             />
      </Form.Item>
      <Form.Item name="comments"
    //    label="点评"
        label={<label  style={{color:'blue'}}>
                点评
                </label>} 
        >
        <TextArea rows={4}
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
