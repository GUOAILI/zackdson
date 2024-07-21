import React, { useState,useImperativeHandle,forwardRef } from 'react';
import { Form, Button } from 'antd';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const RichText = (props,ref) => {
//   const [form] = Form.useForm();
  const [content, setContent] = useState('');

  const modules = {
    toolbar: [
        [{ 'header': [1, 2, false] }],
        ['bold', 'italic', 'underline','strike', 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
        ['link', 'image'],
        [{ 'color': [] }, { 'background': [] }], // this is the color picker
        [{ 'size': ['small', false, 'large', 'huge'] }], // this is the font size picker
        ['clean']
      ],
    };
    const formats = [
      'header',
      'bold', 'italic', 'underline', 'strike', 'blockquote',
      'list', 'bullet', 'indent',
      'link', 'image',
      'color', 'background', // include color and background in the formats
      'size' // include size in the formats
    ];
//   const handleSubmit = () => {
//     // Save data to backend
//     axios.post('http://localhost:9000/rich/save', { content })
//       .then(response => {
//         console.log('Data saved successfully');
//       })
//       .catch(error => {
//         console.log('Error saving data', error);
//       });
//   };


//   useEffect(()=>{
//     axios.get('http://localhost:9000/rich/restore')
//       .then(response => {
//         console.log(response.data);
//         setContent(response.data.content);
//       })
//       .catch(error => {
//         console.log('Error fetching data', error);
//       });
//   },[content])

//   const handleRestore = () => {
//     // Fetch data from backend
//     axios.get('http://localhost:9000/rich/restore')
//       .then(response => {
//         console.log(response.data);
//         // setContent(response.data.content);
//         form.setFieldValue('content',response.data.content);
//       })
//       .catch(error => {
//         console.log('Error fetching data', error);
//       });
//   };

//   const handleSubjectButtonClick=(button)=>{
//     form.setFieldValue('content',button);
// }
useImperativeHandle(ref,()=>{
    return {
        richtext:content,
    }
  });


  return (
    // <Form initialValues={{content:props.content}}>
      <Form.Item name="content" initialValue={props.content}>
        <ReactQuill
        //   key={content}
          theme="snow"
        //   value={props.content}
          onChange={setContent}
          modules={modules}
          formats={formats}
        //   dangerouslySetInnerHTML={{ __html: content }} // add this line
          />
    </Form.Item>
    // </Form>
  );
};

export default forwardRef(RichText);
