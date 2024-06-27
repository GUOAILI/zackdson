import { Form, Button, Upload ,Input,notification,Image} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import FileService from '../util/fileService';
import { useState,useRef} from 'react';
import CustomWebcam from '../util/CustomWebcam';
import base64ToFile from '../util/ImageTransformService';
// add date processing api from external package
// npm i moment
// 2024/6/17
import moment from 'moment';

const openNotificationWithIcon = (type, message, description) => notification[type]({message, description});

  
const normFile = (e) => {
    // console.log('Upload event:', e);

    // setShowUpload(true);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
};


const DemoLayout003 = (props,ref) => {
    const [img,setImg]=useState([]);
    // const [showUpload,setShowUpload]=useState(true);
    const zpddyz=useRef(null);

    const onFinish = (values) => {
      // console.log('Received values of form: ', values);
      if (!values.upload){
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
          console.log("the success response is:",resData);
          openNotificationWithIcon("success","上传资料成功");
          // setShowUpload(false);

        }catch(err){
          // alert(err.response.data.message);
          console.log('error=',err);
          openNotificationWithIcon("error","上传图片资料失败",err.response.data.message);
        }
      }
      sendfile(formData);

    };

    const wangwanqing = ({file,fileList}) =>{
      // console.log("before upload hook,filelist array is:",fileList)
      // setShowUpload(true);
      console.log("before upload hook,file status is:",file.status)
      return false;
    }

    const handleImgGetClick = () => {
      async function getImgfile() {
        try {
          const resData=await FileService.getAllFiles();
          // console.log('resData:',resData);
        //   console.log('photo before tranform:',resData.data[0].image);
          setImg(resData.data);
          openNotificationWithIcon("success","获取文件成功");

          }catch(ex){
          openNotificationWithIcon("error","获取文件失败",ex);
          }
        }
      getImgfile();
    
    }
// 2024/6/17 add
    const handleSendImageClick = () => {
      async function sendImage() {
        try {
          const today=moment(new Date()).format("YYYY-MM-DD-hh-mm-ss");
          const zpd_andom=today + '-' + Math.random().toString(18).substring(2);
          const formData = new FormData();
          // formData.append('file',new Blob([zpddyz.current.mjddyz], { type: 'image/jpeg' }));
          formData.append('file',base64ToFile(zpddyz.current.mjddyz),zpd_andom);
          const resData=await FileService.uploadFile(formData);
          openNotificationWithIcon("success","上传文件成功");

          }catch(ex){
          openNotificationWithIcon("error","获取文件失败",ex.response.data.message);
          }
        }
        sendImage();
    
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
            // showUploadList={showUpload}
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

      <hr />
      <hr />
      <CustomWebcam ref={zpddyz} />
      <Button type='primary' danger onClick={handleSendImageClick} >图片上传保存</Button>
      
      </>

    );
}

export default DemoLayout003;