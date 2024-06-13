import UserService from "../util/userService";
import { useLoaderData,Form,redirect} from "react-router-dom";
import { useState } from "react";

import { notification } from "antd";
const openNotificationWithIcon = (type, message, description) => notification[type]({message, description});

export async function action({ request }) {
    const formData=await request.formData();
    const updates = Object.fromEntries(formData);
    if (Object.keys(updates).length < 2) {
        openNotificationWithIcon("error","你至少要选择一个子分类!")
        return null;
    }
    // console.log("form data:",updates);
    // 2024/6/13 thera are a lot of code try here to transform a array to anothre format
    // console.log("after reformat of update:",JSON.stringify(updates));
    let arr=[];
    for(let obj in updates){
        arr.push({
            key:updates['subject']+obj,
            label:updates[obj]
        })
    }
    // console.log("object to array:",arr)

    // const requestData=`${arr[0].value}guoaili${JSON.stringify(arr.slice(1))}`
    const requestData={
        subject:updates['subject'],
        allsub:JSON.stringify(arr.slice(1))
    }
    try{
        await UserService.updateOneSubject(requestData);
        openNotificationWithIcon("success","设定成功!")
        return redirect("/nav/");
    }catch{
        openNotificationWithIcon("error","设定失败!请联系管理员")
        return null;
    }
}

export default function SubjectManagement() {
    const {subjects} = useLoaderData();
    const [branches,setBranches]=useState([]);
    const [xiaoguo,setXiaoguo]=useState([]);
    const [submittale,setSubmittale]=useState(true);
    const [ul1enable,setUl1enable]=useState(false);
    const [isSubChecked,setIsSubChecked]=useState(false)
    // console.log(subjects);

    const handleCheckbox = (value) => {
        console.log("checkbox is:",value);
        setSubmittale(false);
    }
    const handleRadioSelect = (value) => {
        async function httpRequestForBranchs(val) {
            try{
                const guoaili=await UserService.getOneSubject(val);
                try{
                    const resBranchs=await UserService.getAllBranches();
                    let zhongguo=await resBranchs.data;
                    const abc=await JSON.parse(guoaili.data.allsub);
                    if (abc){
                        let arrZpd=[];
                        abc.forEach(aili=>{arrZpd.push(aili.label)});
                        let arrLmj=[];
                        zhongguo.forEach(item=>{
                            if(!arrZpd.includes(item.chname)){
                                arrLmj.push(item);
                            }
                        })
                        setXiaoguo(arrLmj);
                        setBranches(abc);
                    }else{
                        console.log('after filter:',zhongguo);
                        setXiaoguo(zhongguo);
                    }
                setIsSubChecked(true);
                setUl1enable(true);
            }
                catch (ex) {
                    alert("子分类查询异常!",ex);
                }
                }
            catch (ex) {
                alert("查询主科目表异常error!"+ex);
            }
        }
        httpRequestForBranchs(value);
    }
    return (
        <>
            <h1>==========   梅花香自苦寒来   ==========</h1>
            <h1 style={{color:'red'}}>
                学科增减管理
            </h1>
            <h2>主学科</h2>
            {subjects.length ? (
                <Form method="post" >
                <ul disabled={ul1enable} style={{listStyle:'none'}}>
                    {subjects.map(sub=> (
                        <li key={sub.name} >
                            <input 
                                type="radio"
                                id={sub.name}
                                name="subject"
                                value={sub.chname}
                                onChange={e=>handleRadioSelect(e.target.value)}
                                 />
                            <label>
                                {sub.chname}
                            </label>
                        </li>
                    ))}
                    <li key="other" >
                            <input 
                                type="radio"
                                id="other"
                                name="subject"
                                value="other"
                                 />
                            <label>
                                其他(自定义)
                            </label>
                    </li>
                </ul>

                {isSubChecked && (<div>

                <hr />
                <h2>子分类</h2>
                <h3>已经选过的子分类</h3>
                {branches.length ? (
                    <div>
                        <ul style={{listStyle:'none'}}>
                          {branches.map( sub => (
                            <li key={sub.label}>
                                <input 
                                    type="checkbox"
                                    id={sub.label}
                                    name={sub.label}
                                    value={sub.label}
                                    onChange={e=>handleCheckbox(e.target.value)}
                                    />
                                <label>
                                    {sub.label}
                                </label>
                            </li>
                          ))}
                        </ul>
                        <hr/>
                    </div>
                ) : (
                    <div>
                    <label style={{color:'red'}}>尚未添加任何子分类</label>
                    <hr />
                    </div>
                )
                }
                <h3>还没有选过的子分类</h3>
                {xiaoguo.length ? 
                    (
                    <ul style={{listStyle:'none'}}>
                        {xiaoguo.map( sub => (
                            <li key={sub.name}>
                                <input 
                                    type="checkbox"
                                    id={sub.chname}
                                    name={sub.chname}
                                    value={sub.chname}
                                    onChange={e=>handleCheckbox(e.target.value)}
                                    />
                                <label>
                                    {sub.chname}
                                </label>
                            </li>
                        )
                        )}
                    </ul>
                    )
                : 
                (<p style={{color:'red'}}>没有尚未添加的子类型了</p>)
                }
                <button type="submit" disabled={submittale} >提交</button>
                </div>)}
                </Form>

            ) : (
                <p style={{color:'red'}}>
                    数据库中没有任何初始化用数据,请联系管理员。
                </p> )
            }
        </>
    );
}
// export default SubjectManagement;

export async function loader(){
    const restData = await UserService.getAllSubjects();
    const subjects = await restData.data;
    // console.log(subjects);
    return {subjects};
}