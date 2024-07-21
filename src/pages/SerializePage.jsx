import React from 'react';  
import { Form, Button, Row, Radio,notification } from 'antd'; 
import {useNavigate} from 'react-router-dom';
import PersistService from '../util/persistService';

const openNotificationWithIcon = (type, message, description) => notification[type]({message, description});
  
const SerializePage = () => {  
    const navigate = useNavigate();

    const onFinish=(values)=>{
        async function serialize(branch){
            try{
                await PersistService.serializeTofile(branch);
                openNotificationWithIcon('success',branch+' 持久化成功');
                navigate('/nav/empty');
            }catch(ex){
                openNotificationWithIcon('error',branch+' 持久化失败');
                return null;
            }
        }
        serialize(values.branch)
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

                    <Button type="primary" 
                    style={{marginLeft:'3em'}}
                    danger htmlType="submit" >
                        提交
                    </Button>
                 </Row>
            </Form>
        </>
    )}
export default SerializePage;