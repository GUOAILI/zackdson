import React from 'react';
import { Form, Input, Radio,DatePicker,Select, Button,Image } from 'antd';
import {useNavigate} from 'react-router-dom';

const { TextArea } = Input;

const ExamShow = () => {
  const navigate = useNavigate();

  const cxddyz=JSON.parse(localStorage.getItem('examRecord'));
  return (
    <>
    <Form 
      layout="vertical" 
      disabled
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

export default ExamShow;
