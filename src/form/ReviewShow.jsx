import React from 'react';
import { Form, Input, Radio,DatePicker,Select, Button,Image } from 'antd';
import {useNavigate} from 'react-router-dom';

const { TextArea } = Input;

const ReviewShow = () => {
  const navigate = useNavigate();

  const cxddyz=JSON.parse(localStorage.getItem('reviewRecord'));
  return (
    <>
    <Form 
      layout="vertical" 
      disabled
      initialValues={{
        title:cxddyz.title,
        reviewDate:cxddyz.reviewDate,
        category:cxddyz.category,
        detail:cxddyz.detail,
        overview:cxddyz.overview,
      }}
      >
      <Form.Item name="reviewDate" label={<label style={{color:'blue'}}>复习日</label>}>
        <Input type='text' />
      </Form.Item>
      <Form.Item name="category" label={<label style={{color:'blue'}}>分类</label>} >
        <Select style={{ width: '30%' }}>
          <Select.Option value={1}>随堂复习</Select.Option>
          <Select.Option value={2}>周复习</Select.Option>
          <Select.Option value={3}>月复习</Select.Option>
          <Select.Option value={4}>期中复习</Select.Option>
          <Select.Option value={5}>期末复习</Select.Option>
          <Select.Option value={6}>总复习</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item name="title" label={<label style={{color:'blue'}}>复习内容概述</label>}>
        <Input style={{ width: '50%'}}/>
      </Form.Item>
      <Form.Item name="detail" label={<label style={{color:'blue'}}>复习内容详细</label>}>
        <TextArea maxLength={200}  style={{color:'darkgreen'}} />
      </Form.Item>
      <Form.Item name="overview" label={<label style={{color:'blue'}}>个人总结</label>}>
        <TextArea maxLength={100} style={{color:'darkviolet'}} />
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

export default ReviewShow;
