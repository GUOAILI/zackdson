import { Form, Button, Upload ,Input,notification,Image} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import UserService from '../util/userService';
import CustomWebcam from '../util/CustomWebcam';
import { useState,useRef } from 'react';

const openNotificationWithIcon = (type, message, description) => notification[type]({message, description});

  
const normFile = (e) => {
    console.log('Upload event:', e);

    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
};


const DemoLayout002 = (props,ref) => {
    const webFeed1=useRef(null);
    const webFeed2=useRef(null);
    const [img,setImg]=useState([]);

    const handleSaveImagesClick=()=>{
      async function savefile(data){
        try {
          const resData=await UserService.submitMultiNBWebcamToDatabase();
          openNotificationWithIcon("success","webcam入库成功",resData);

        }catch(ex){
          openNotificationWithIcon("error","webcam入库失败",ex);
        }
      }
      savefile();
    }

    async function sendfile(idx,data){
      try {
        const resData=await UserService.saveMultiNBWebcamToBackend(idx,data);
        openNotificationWithIcon("success","上传webcam成功",resData);

      }catch(ex){
        openNotificationWithIcon("error","上传webcam失败",ex);
      }
    }

    const handleImgSendClick1 = () =>{
        sendfile(1,webFeed1.current.mjddyz);
    }

    const handleImgSendClick2 = () =>{
        sendfile(2,webFeed2.current.mjddyz);
    }

    const handleImgGetClick = () => {
      async function getImgfile() {
        try {
          const resData=await UserService.getNotebookImageFromDatabase();
        //   console.log('resData:',resData);
        //   console.log('photo before tranform:',resData.data[0].image);
          setImg(resData.data);
          openNotificationWithIcon("success","获取图片成功");

          }catch(ex){
          openNotificationWithIcon("error","获取图片资料失败",ex);
          }
        }
      getImgfile();
    
    }
    return (
      <>
      <hr />
      <div>
        {img.length ? 
        img.map(smap=>(
            <Image width={720} src={smap.image} />
                // <li >{smap.id}</li>
        )) 
                :
            <p>没有附加图片</p>
        }
      </div>
      <hr />
      <Button type='primary' danger onClick={handleImgGetClick} >后端求取图片</Button>
      
      <hr />
      <h3>自己拍照1</h3>
      {/* <CustomWebcam lmj={callbackOfMain}/> */}
      <CustomWebcam ref={webFeed1} />
      <Button type='primary' danger onClick={handleImgSendClick1} >发送图片</Button>

      <hr />
      <h3>自己拍照2</h3>
      {/* <CustomWebcam lmj={callbackOfMain}/> */}
      <CustomWebcam ref={webFeed2} />
      <Button type='primary' danger onClick={handleImgSendClick2} >发送图片</Button>

      <hr />
      <hr />
      <hr />
      <Button type='primary' danger onClick={handleSaveImagesClick} >提交上传的所有图片</Button>
      </>

    );
}

export default DemoLayout002;
