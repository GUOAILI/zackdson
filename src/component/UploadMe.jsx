import React, { useRef,useState,useImperativeHandle,forwardRef } from 'react';
import { Form,Button, Upload, message } from 'antd';
import { UploadOutlined,CloseOutlined } from '@ant-design/icons';
import Webcam from 'react-webcam';
import ButtonZpd from './ButtonZpd';
import ButtonColor from './colorButton';

const UploadMe=(props,ref) =>{
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);

  // Handle file upload
  const handleFileUpload = (info) => {
    let fileList = [...info.fileList];
    fileList = fileList.slice(-12); // Limit to 5 files
    fileList = fileList.map((file) => ({
      ...file,
      status: 'done',
    }));
    setUploadedFiles(fileList);
  };
  // Handle image capture
  const webcamRef = useRef(null);
  const handleImageCapture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      const newImage = {
        uid: Date.now(),
        name: `photo-${uploadedImages.length + 1}.png`,
        status: 'done',
        url: imageSrc,
      };
      setUploadedImages([...uploadedImages, newImage]);
    } else {
      message.error('Failed to capture image.');
    }
  };
  // Handle image deletion  
  const handleImageDelete = (uid) => {  
    setUploadedImages(uploadedImages.filter(image => image.uid !== uid));  
  };  

  useImperativeHandle(ref,()=>{
    return {
        files:uploadedFiles,
        images:uploadedImages
    }
  });

  return (
    <>
    <Form.Item name="fileUpload"
//    label="范文上传"
        label={<label  style={{color:'#00C9A7'}}>
        {props.up_btn_txt}
        </label>} 
    >
    <Upload
      fileList={uploadedFiles}
      onChange={handleFileUpload}
      multiple={true}
      beforeUpload={() => false} // To prevent default upload behavior
    >
      <Button icon={<UploadOutlined />} multiple={true}>指定上传文件(每次最多12个文件)</Button>
    </Upload>
    </Form.Item>
    <Form.Item name="photoUpload"
    //    label="拍照上传">
    label={<label  style={{color:'#00C9A7'}}>
            *或者将资料对准电脑摄像头,现在就可以拍照上传
            </label>} >
    <div>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/png"
        style={{ width: '100%', maxWidth: '640px' }}
      />
    </div>
    <div style={{ marginTop: '10px' }}>
    {/* <Button type='primary' danger style={{marginBottom:'1em'}} onClick={handleImageCapture}>拍照</Button> */}
        <ButtonZpd title='拍照' onClick={handleImageCapture} colorZpd={ButtonColor.colors4} />
        {uploadedImages.map((image) => (
        <>
            <div key={image.uid} style={{ position: 'relative', display: 'inline-block' }}>  
                <img key={image.uid} src={image.url} alt={image.name} style={{ width: '100px', marginRight: '10px' }} />
            
                {/* 使用 CloseOutlined 图标作为删除按钮，并镶嵌在图片右上角 */}  
                <CloseOutlined  
                    style={{  
                        position: 'absolute',  
                        top: '5px', // 根据需要调整位置  
                        right: '10px', // 根据需要调整位置  
                        cursor: 'pointer',  
                        color: 'red', // 假设图片背景色较深，可以用白色图标  
                        fontSize: '16px', // 根据需要调整图标大小  
                        zIndex: 1, // 确保图标在图片之上  
                    }}  
                    onClick={() => handleImageDelete(image.uid)}  
                />  
            </div>    
        </>    
      ))}
    </div>
    </Form.Item>
  </>
 )
}
export default forwardRef(UploadMe);