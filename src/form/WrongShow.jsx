import React from 'react';
import { Form, Input, Radio,DatePicker,Select, Button,Image } from 'antd';
import {useNavigate} from 'react-router-dom';

const { TextArea } = Input;

const WrongShow = () => {
  const navigate = useNavigate();

  const cxddyz=JSON.parse(localStorage.getItem('wrongRecord'));
  return (
    <>
    <Form 
      layout="vertical" 
      disabled
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

export default WrongShow;
