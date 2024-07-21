import React, { useState, useEffect } from 'react';  
import { Form, Button, Row, Col, Input,Radio,notification } from 'antd'; 
import MenuService from '../util/menuService';
import {useNavigate} from 'react-router-dom';

const openNotificationWithIcon = (type, message, description) => notification[type]({message, description});
  
const SubjectEdit = () => {  
    const navigate = useNavigate();
    const [form_sad] = Form.useForm(); //subject add
    const [form_cad] = Form.useForm(); //category add
    // const [xiaofang,setXiaofang]=useState(false);
    const [subjects,setSubjects]=useState([]);
    const [subCategories,setSubcategories]=useState([]);
    //   here are just two counter for caculating the subjects and subcategory only 
    // const [filledSlots, setFilledSlots] = useState({ subjects: 0, 
    //     subCategories: 0 });  
    localStorage.setItem('branchDetail','东珠苹静')
    const sub_name = Form.useWatch('subject_ad', form_sad);
    const sad = Form.useWatch('sad', form_sad);
    const branch_name = Form.useWatch('branch_ad', form_cad);
    const cad = Form.useWatch('cad', form_cad);
    const dpj=JSON.parse( localStorage.getItem('dpj-sb'));
    const onFinish=()=>{
        // console.log('subname:',sub_name);
        async function addSub(subname){
            try{
                await MenuService.addOneSubject(subname);
                openNotificationWithIcon('success',subname+'追加成功');
                // form_sad.resetFields('subject_ad','');
                // setXiaofang(!xiaofang);
                navigate('/nav/empty');
            }catch(ex){
                openNotificationWithIcon('error',subname+'追加失败');
                return null;
            }
        }
        async function delSub(subname){
            try{
                await MenuService.deleteOneSubject(subname);
                openNotificationWithIcon('success',subname+'删除成功');
                navigate('/nav/empty');
                // form_sad.resetFields();
                // setXiaofang(!xiaofang);
                // navigate('/nav/subject');
            }catch(ex){
                openNotificationWithIcon('error',subname+'删除失败');
                return null;
            }
        }

        if(sad==='追加'){
            if(subjects.includes(sub_name)){
                openNotificationWithIcon('error',sub_name+' 已经存在');
                return null;
            }
            // send the httprequest to add a subject
            addSub(sub_name);
        }else{
            if(!subjects.includes(sub_name)){
                openNotificationWithIcon('error','你要删除的科目['+sub_name+']不存在');
                return null;
            }else if(dpj.includes(sub_name)){
                openNotificationWithIcon('error','你要删除的科目['+sub_name+']在左侧的菜单中仍在使用中，暂时无法删除');
                return null;
            }
            delSub(sub_name);
        }
    }

    const onFinish1=(values)=>{
        async function addbranch(brhname){
            try{
                await MenuService.addOneBranch(brhname);
                openNotificationWithIcon('success',brhname+'追加成功');
                // form_sad.resetFields('subject_ad','');
                // setXiaofang(!xiaofang);
                navigate('/nav/empty');
            }catch(ex){
                openNotificationWithIcon('error',brhname+'追加失败');
                return null;
            }
        }
        async function delbranch(brhname){
            try{
                await MenuService.deleteOneBranch(brhname);
                openNotificationWithIcon('success',brhname+'删除成功');
                navigate('/nav/empty');
                // form_sad.resetFields();
                // setXiaofang(!xiaofang);
                // navigate('/nav/subject');
            }catch(ex){
                openNotificationWithIcon('error',brhname+'删除失败');
                return null;
            }
        }

        if(cad==='追加'){
            if(subCategories.includes(branch_name)){
                openNotificationWithIcon('error',branch_name+' 已经存在');
                return null;
            }
            // send the httprequest to add a subject
            addbranch(branch_name);
        }else{
            if(!subCategories.includes(branch_name)){
                openNotificationWithIcon('error','你要删除的自费类['+sub_name+']不存在');
                return null;
            }
            delbranch(branch_name);
        }
    }

    const handleSubjectButtonClick=(button)=>{
        form_sad.setFieldValue('subject_ad',button);
    }

    const handleSubCategoryButtonClick=(button)=>{
        form_cad.setFieldValue('branch_ad',button);
    }

    useEffect(()=>{
        const abc =async ()=>{
            const resData=await MenuService.getAllSubjects();
            setSubjects(resData.data.map(sub=>sub.chname));
            const resData1=await MenuService.getAllBranches();
            setSubcategories(resData1.data.map(sub=>sub.chname));
        }
        abc();
    },[]);
        
    return (  
        <div>  
        <Row gutter={[24, 24]}>  
            <Col span={12}>  
            <h3>已有学科(点击自动写入输入框)</h3>  
            <div>  
                {subjects.map((subject, index) => (  
                <Button type='primary' ghost key={index} 
                    style={{marginRight:'1em',marginBottom:'1em'}}
                    onClick={() => handleSubjectButtonClick(subject)}
                    >  
                    {subject}
                </Button>  
                ))}  
            </div>  
            </Col>  
            <Col span={12}>  
            <h3>已有子分类(6个,普通用户暂不支持变更)</h3>  
            <div>  
                {subCategories.map((subCategory, index) => (  
                <Button key={index} 
                    type='primary' ghost
                    style={{marginRight:'1em',marginBottom:'1em'}}
                     onClick={() => handleSubCategoryButtonClick(subCategory)}
                >  
                    {subCategory}  
                </Button>  
                ))}  
            </div>  
            </Col>  
        </Row>  
    
        <Row gutter={[24, 24]}>  
          <Col span={12}> 
            <Form
                onFinish={onFinish}
                form={form_sad}
                name='form_sad'
                rest
                >  
                <h3 style={{color:'#00008b'}}>学科追加(必须是2个汉字)</h3>  
                <Row gutter={[12,12]}>
                  <Col span={10} >
                  <Form.Item
                    name='subject_ad'
                    label={<span style={{ color: 'blue' }}>科目</span>} 
                    rules={[{ required: true, message: '请填写学科名' },
                            { len:2,message:'字数只能是2个'},
                            { pattern: /[\u4e00-\u9fa5]/g,message:'只接受汉字'}
                    ]}
                  >
                    {/* <Input value={valueS} onChange={handleSubChange} />  */}
                    <Input /> 
                  </Form.Item>
                  </Col>
                  <Col span={8}>
                   <Form.Item  
                        name="sad"
                        rules={[{ required: true, message: '请选择追加还是删除' }]}
                            >  
                        <Radio.Group>  
                            <Radio value="追加">追加</Radio>  
                            <Radio value="删除">删除</Radio>  
                        </Radio.Group>  
                   </Form.Item>  

                   </Col>
                    <Button type="primary" danger htmlType="submit" >
                        提交
                    </Button>
                 </Row>
            </Form>
           </Col>
           {localStorage.getItem('long')==='donglai' && 
           
           <Col span={12}>  
            <Form 
                onFinish={onFinish1}
                form={form_cad}
                name='form_cad' >
                <h3 style={{color:'#00008b'}}>子分类追加(字数不限)</h3>  
                <Row gutter={[12,12]}>
                  <Col span={10} >
                  <Form.Item
                            name='branch_ad'
                            label={<span style={{ color: 'blue' }}>子分类</span>} 
                            rules={[{ required: true, message: '请填写子分类名' },
                                { pattern: /[\u4e00-\u9fa5]/g,message:'只接受汉字'}
                            ]}
                                >
                    <Input /> 
                  </Form.Item>
                  </Col>
                  <Col span={8}>
                   <Form.Item  
                        name="cad"
                        rules={[{ required: true, message: '请选择追加还是删除' }]}
                     >  
                        <Radio.Group>  
                            <Radio value="追加">追加</Radio>  
                            <Radio value="删除">删除</Radio>  
                        </Radio.Group>  
                   </Form.Item>  

                   </Col>
                    <Button type="primary" danger htmlType="submit" >
                        提交
                    </Button>
                 </Row>
            </Form>
            </Col>
           }
           </Row>
        </div>
    )}
export default SubjectEdit;