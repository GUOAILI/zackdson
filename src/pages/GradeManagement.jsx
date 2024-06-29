import { useLoaderData,Form,redirect} from "react-router-dom";
import React, { useState } from "react";
import { notification,Select } from "antd";
import GradeService from "../util/gradeService";
const openNotificationWithIcon = (type, message, description) => notification[type]({message, description});

export async function action({ request }) {
    const formData=await request.formData();
    const updates = Object.fromEntries(formData);
    // if (Object.keys(updates).length < 2) {
    //     openNotificationWithIcon("error","你至少要选择一个子分类!")
    //     return null;
    // }
    const requestData={
        school:updates['subject'],
        grade:JSON.stringify(arr.slice(1))
    }
    try{
        await GradeService.updateGrade(requestData);
        openNotificationWithIcon("success","设定成功!")
        return redirect("/nav/");
    }catch{
        openNotificationWithIcon("error","设定失败!请联系管理员")
        return null;
    }
}

export default function GradeManagement() {
    return (
        <>
            <h1>==========   宝剑锋从磨砺出   ==========</h1>
            <h1 style={{color:'red'}}>
                年级管理
            </h1>
            <Form method="post" 
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
                <Form.Item label="School">
                <Select>
                    <Select.Option value="primary">小学</Select.Option>
                    <Select.Option value="middle">初中</Select.Option>
                    <Select.Option value="high">高中</Select.Option>
                </Select>
                </Form.Item>
                <Form.Item label="Grade">
                <Select>
                    <Select.Option value={1}>一年级</Select.Option>
                    <Select.Option value={2}>二年级</Select.Option>
                    <Select.Option value={3}>三年级</Select.Option>
                    <Select.Option value={4}>四年级</Select.Option>
                    <Select.Option value={5}>五年级</Select.Option>
                    <Select.Option value={6}>六年级</Select.Option>
                </Select>
                </Form.Item>

                <button type="submit" disabled={submittale} >提交</button>
            </Form>
        </>
    );
}
// export default SubjectManagement;

export async function loader(){
    try{

        const restData = await GradeService.getGrade();
        const gradeJson = await restData.data;
        // console.log(subjects);
        return {gradeJson};
    }catch(err){
        openNotificationWithIcon("error","年级获取异常，请重试，或者联系管理员")
        return null;
    }
}