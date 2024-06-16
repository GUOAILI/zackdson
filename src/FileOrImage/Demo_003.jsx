import { Form, Button, Upload ,Input,notification,Image} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import FileService from '../util/fileService';
import { useState } from 'react';

const openNotificationWithIcon = (type, message, description) => notification[type]({message, description});

  
const normFile = (e) => {
    console.log('Upload event:', e);

    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
};


const DemoLayout003 = (props,ref) => {
    const [img,setImg]=useState([]);

    const onFinish = (values) => {
      console.log('Received values of form: ', values);
      if (!values.Upload){
        openNotificationWithIcon("error","没有指定上传文件(最少一个)")
      }
      if (!values.zpd){
        openNotificationWithIcon("error","没写文字描述")
      }

      const { upload } = values;
      const formData = new FormData();
      upload.forEach((item, index) => {
        formData.append('file', item.originFileObj);    	
        })

      async function sendfile(data){
        try {
          const resData=await FileService.uploadFile(data);
          openNotificationWithIcon("success","上传资料成功".resData);

        }catch(err){
          // alert(err.response.data.message);
          // console.log('error=',err);
          openNotificationWithIcon("error","上传图片资料失败",err.response.data.message);
        }
      }
      sendfile(formData);

    };

    const wangwanqing = ({file,fileList}) =>{
      // console.log("before upload hook,filelist array is:",fileList)
      console.log("before upload hook,file status is:",file.status)
      return false;
    }

    const handleImgGetClick = () => {
      async function getImgfile() {
        try {
          const resData=await FileService.getAllFiles();
        //   console.log('resData:',resData);
        //   console.log('photo before tranform:',resData.data[0].image);
          setImg(resData.data);
          openNotificationWithIcon("success","获取文件成功");

          }catch(ex){
          openNotificationWithIcon("error","获取文件失败",ex);
          }
        }
      getImgfile();
    
    }

    return (
      <>

      <Form
        name="validate_other"
        onFinish={onFinish}
        initialValues={{
          'zpd':'zpddyz',
          'input-number': 3,
          'checkbox-group': ['A', 'B'],
          rate: 3.5,
        }}
      >
        <Form.Item label='随便写点什么' name='zpd' >
          <Input />
        </Form.Item>
        <Form.Item
          name="upload"
          label="Upload"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload name="logo"
            beforeUpload={wangwanqing}
            onChange={wangwanqing}
            // action="/upload.do" 
            listType="picture">
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button htmlType='submit' type='primary' danger >submit</Button>
        </Form.Item>
      </Form>
      <hr />
      <ul>
        {img.length ? 
        img.map(smap=>(
            <Image width={720} src={smap.url} />
                // <li >{smap.id}</li>
        )) 
                :
            <p>没有附加图片</p>
        }
      </ul>
      <hr />
      <Button type='primary' danger onClick={handleImgGetClick} >后端求取图片</Button>
      </>

    );
}

export default DemoLayout003;
