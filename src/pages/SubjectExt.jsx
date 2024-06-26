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
import React from 'react';
// import CustomWebcam from '../util/CustomWebcam';


const { RangePicker } = DatePicker;
const { TextArea } = Input;
const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};


export default function SubjectExtLayout() {
    const shiyu = localStorage.getItem('branchDetail');
    // const subkey2 = localStorage.getItem('subkey2');
    return (
        <div>
            <h1>
               {/* {`${sub1.filter((item)=>item.type===subkey1)[0].desc} ${sub2.filter((item)=>item.type===subkey2)[0].desc}`}  */}
               ========   百尺竿头 更进一步  ========
            </h1>
            <h2 style={{color:'blue'}}>{shiyu}&nbsp;&nbsp;&nbsp;往期记录一栏</h2>
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
                <Form.Item label="Checkbox" name="disabled" valuePropName="checked">
                    <Checkbox>Checkbox</Checkbox>
                </Form.Item>
                <Form.Item label="Radio">
                    <Radio.Group>
                        <Radio value="apple"> Apple </Radio>
                        <Radio value="pear"> Pear </Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item label="Input">
                    <Input />
                </Form.Item>
                <Form.Item label="Select">
                    <Select>
                        <Select.Option value="demo">Demo</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label="TreeSelect">
                <TreeSelect
                    treeData={[
                    {
                        title: 'Light',
                        value: 'light',
                        children: [
                        {
                            title: 'Bamboo',
                            value: 'bamboo',
                        },
                        ],
                    },
                    ]}
                />
                </Form.Item>
                <Form.Item label="Cascader">
                <Cascader
                    options={[
                    {
                        value: 'zhejiang',
                        label: 'Zhejiang',
                        children: [
                        {
                            value: 'hangzhou',
                            label: 'Hangzhou',
                        },
                        ],
                    },
                    ]}
                />
                </Form.Item>
                <Form.Item label="DatePicker">
                    <DatePicker />
                </Form.Item>
                <Form.Item label="RangePicker">
                    <RangePicker />
                </Form.Item>
                <Form.Item label="InputNumber">
                    <InputNumber />
                </Form.Item>
                <Form.Item label="TextArea">
                    <TextArea rows={4} />
                </Form.Item>
                <Form.Item label="Switch" valuePropName="checked">
                    <Switch />
                </Form.Item>
                <Form.Item label="Upload" valuePropName="fileList" getValueFromEvent={normFile}>
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
                <Form.Item label="Button">
                    <Button>Button</Button>
                </Form.Item>
                <Form.Item label="Slider">
                    <Slider />
                </Form.Item>
                <Form.Item label="ColorPicker">
                    <ColorPicker />
                </Form.Item>
            </Form>
            {/* 2024/06/12 */}
            {/* <CustomWebcam /> */}
        </div>
    );
}

// export default SubjectLayout;