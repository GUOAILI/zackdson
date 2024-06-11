import { PlusOutlined } from '@ant-design/icons';
import { useState } from 'react';
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


const { RangePicker } = DatePicker;
const { TextArea } = Input;
const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};
const sub1 =[
    {
        type:'ch',
        desc:'语文'
    },
    {
        type:'en',
        desc:'英语'
    },
    {
        type:'ma',
        desc:'数学'
    },
    {
        type:'ph',
        desc:'物理'
    },
    {
        type:'ch',
        desc:'化学'
    },
]
const sub2 =[
    {
        type:'nb',
        desc:'课本知识记录'
    },
    {
        type:'ext',
        desc:'课外知识点记录'
    },
    {
        type:'wri',
        desc:'作文点滴'
    },
    {
        type:'rev',
        desc:'知识回顾'
    },
]
const SubjectLayout=() =>{
    const subkey1 = localStorage.getItem('subkey1');
    const subkey2 = localStorage.getItem('subkey2');
    return (
        <div>
            <h1>
               {`${sub1.filter((item)=>item.type===subkey1)[0].desc} ${sub2.filter((item)=>item.type===subkey2)[0].desc}`} 
            </h1>
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

        </div>
    );
}

export default SubjectLayout;