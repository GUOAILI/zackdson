import React, { useState, useEffect } from 'react';  
import { Form, Button, Row, Col, Input,Radio,notification } from 'antd'; 
import MenuService from '../util/menuService';
import {useNavigate} from 'react-router-dom';
import PersistService from '../util/persistService';

const openNotificationWithIcon = (type, message, description) => notification[type]({message, description});
  
const DeserializePage = () => {  
    const navigate = useNavigate();

    const onFinish=(values)=>{
        async function deserialize(branch,filename){
            try{
                await PersistService.deserializeToClass(branch,filename);
                openNotificationWithIcon('success',branch+' 反持久化成功');
                navigate('/nav/empty');
            }catch(ex){
                openNotificationWithIcon('error',branch+' 反持久化失败');
                return null;
            }
        }
        deserialize(values.branch,values.filename)
    }

        
    return (  
        <>  
            <Form
                onFinish={onFinish}
                >  
                <h3 style={{color:'#00008b'}}>表数据本地持久化</h3>  
                <Row gutter={[12,12]}>
                  <Form.Item
                    name='branch'
                    label={<span style={{ color: 'blue'}}>子项目</span>} 
                    rules={[{ required: true, message: '请选择branch' },
                    ]}
                  >
                        <Radio.Group 
                        >  
                            <Radio style={{marginLeft:'2em' }} value="writing">写作</Radio>  
                            <Radio value="notebook">课本</Radio>  
                            <Radio value="review">复习</Radio>  
                            <Radio value="wrong">错题整理</Radio>  
                            <Radio value="extension">课外扩展</Radio>  
                            <Radio value="exam">试卷汇总</Radio>  
                        </Radio.Group>  
                   </Form.Item>  
                </Row>
                <Row gutter={[12,12]}>
                  <Form.Item
                    name='filename'
                    label={<span style={{ color: 'blue'}}>指定文件名</span>} 
                    rules={[{ required: true, message: '请指定文件名' },
                    ]}
                  >
                     <Input />
                   </Form.Item>  
                    </Row>
                    <Row>
                    <Form.Item>
                    <Button type="primary" 
                    style={{marginLeft:'5em'}}
                    danger htmlType="submit" >
                        提交
                    </Button>
                    </Form.Item>
                 </Row>
            </Form>
        </>
    )}
export default DeserializePage;