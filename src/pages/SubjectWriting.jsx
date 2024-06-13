import { PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Cascader,
  Checkbox,
  ColorPicker,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Slider,
  Switch,
  TreeSelect,
  Upload,
} from 'antd';
import CustomWebcam from '../util/CustomWebcam';
import { Form as FormZpd } from 'react-router-dom';

const { TextArea } = Input;
const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  
export async function action({request}){
    const formData=await request.formData();
    const updates = Object.fromEntries(formData);
    console.log('what is the output of webcam?',updates)
    return null;
}

export default function SubjectWritingLayout() {
    const shiyu = localStorage.getItem('branchDetail');
    // const subkey2 = localStorage.getItem('subkey2');
    return (
        <div>
            <h1>
               {/* {`${sub1.filter((item)=>item.type===subkey1)[0].desc} ${sub2.filter((item)=>item.type===subkey2)[0].desc}`}  */}
               ========   百尺竿头 更进一步  ========
            </h1>
            <h2 style={{color:'blue'}}>{shiyu}&nbsp;&nbsp;&nbsp;往期记录一栏</h2>
            <FormZpd method='post'>
              <Form
                labelCol={{
                span: 4,
                }}
                wrapperCol={{
                span: 14,
                }}
                layout="horizontal"
                style={{
                maxWidth: 600,
                }}
              >
                <Form.Item name='title' label="标题">
                    <Input />
                </Form.Item>
                <Form.Item name='backgroud' label="背景">
                    <Input />
                </Form.Item>
                <Form.Item name='comment' label="备注">
                    <TextArea rows={10} />
                </Form.Item>
                <Form.Item name='loadpicture' label="Upload" valuePropName="fileList" getValueFromEvent={normFile}>
                    <Upload action="/upload.do" listType="picture-card">
                    <button
                    style={{
                        border: 0,
                        background: 'none',
                    }}
                    type="button"
                    >
                    <PlusOutlined />
                    <div
                        style={{
                        marginTop: 8,
                        }}
                    >
                        Upload
                    </div>
                    </button>
                    </Upload>
                </Form.Item>
              </Form>
            {/* 2024/06/13 */}
              <CustomWebcam />
              <button type='submit'>提交</button>
            </FormZpd>
        </div>
    );
}

// export default SubjectLayout;