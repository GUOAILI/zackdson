import React from 'react';
import { Form, Input, Radio,DatePicker,Select, Button,Image } from 'antd';
import {useNavigate} from 'react-router-dom';

const { TextArea } = Input;

const ExtensionShow = () => {
  const navigate = useNavigate();

  const cxddyz=JSON.parse(localStorage.getItem('extensionRecord'));
  return (
    <>
    <Form 
      layout="vertical" 
      disabled
      initialValues={{
        abs:cxddyz.abs,
        extDate:cxddyz.extDate,
        teacher:cxddyz.teacher,
        easy:cxddyz.easy==='高'?'high':cxddyz.easy==='中'?'medium':'low',
        content:cxddyz.content,
      }}
      >
      <Form.Item  
        name="extDate"
        label={<span style={{ color: 'blue' }}>授课日</span>}  
        // rules={[{ required: true, message: '请选择授课日期!' }]}  
      >  
        <Input type="text" 
            style={{ width: '50%'}}/>  
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
        // rules={[{ required: true, message: '请输入内容关键字!' }]}  
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
        label={<span style={{ color: 'blue' }}>授课内容</span>} 
      >  
        <TextArea  
          // placeholder="上限200字"  
          style={{ color: 'darkgreen' }}  
          maxLength={200}  
          showCount  
          autoSize={{ minRows: 2, maxRows: 4 }}  
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

export default ExtensionShow;
