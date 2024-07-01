import React from 'react';
import { Form, Input, Radio, Button,Image } from 'antd';
import {useNavigate} from 'react-router-dom';

const { TextArea } = Input;

const NotebookShow = () => {
  const navigate = useNavigate();

  const cxddyz=JSON.parse(localStorage.getItem('notebookRecord'));
  console.log("num=",cxddyz.num);
  return (
    <>
    <Form 
      layout="vertical" 
      disabled
      initialValues={{
        num:cxddyz.num,
        keyword:cxddyz.keyword,
        easy:cxddyz.easy==='高'?'high':cxddyz.easy==='中'?'medium':'low',
        point:cxddyz.point,
        teacher:cxddyz.teacher,
        remarks:cxddyz.remarks,
        post:cxddyz.post,
      }}
      >
      <Form.Item >
        <span style={{color: 'blue',marginRight: '8px' }}>第</span>
        <Form.Item name="num" noStyle >
          <Input type="number" style={{ width: '8%',color:'#00ad45' }} />
        </Form.Item>
        <span style={{ color: 'blue',margin: '0 8px' }}>课</span>
      </Form.Item>
      <Form.Item  
        name="keyword"  
        label={<span style={{ color: 'blue' }}>主题</span>} 
      >  
        <Input type="text" 
            style={{ width: '50%',color:'#00ad45'}}/>  
      </Form.Item>  
      <Form.Item name="easy" label={<span style={{ color: 'blue' }}>难易度</span>}
      >
        <Radio.Group>
          <Radio value="high">高</Radio>
          <Radio value="medium">中</Radio>
          <Radio value="low">低</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item name="point" label={<span style={{ color: 'blue' }}>知识点</span>}>
        <TextArea maxLength={100} 
        style={{ color:'#00ad45'}}
        placeholder='上限100字' />
      </Form.Item>
      <Form.Item name="teacher" label={<span style={{ color: 'blue' }}>老师讲解精髓</span>}>
        <TextArea maxLength={100} 
          style={{ color:'#00ad45'}}
          placeholder='上限100字' />
      </Form.Item>
      <Form.Item name="remarks" label={<span style={{ color: 'blue' }}>备注</span>}>
        <TextArea maxLength={100}
          style={{ color:'#00ad45'}}
           placeholder='上限100字' />
      </Form.Item>
      <Form.Item name="post" label={<span style={{ color: 'blue' }}>后期复习记入</span>}>
        <TextArea maxLength={100} style={{ color: 'red' }} placeholder='上限100字' />
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

export default NotebookShow;
