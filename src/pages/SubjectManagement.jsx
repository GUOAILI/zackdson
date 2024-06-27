import { useState,useEffect } from "react";
import { useLoaderData,Form,redirect} from "react-router-dom";
import UserService from "../util/userService";
import { notification } from "antd";

const openNotificationWithIcon = (type, message, description) => notification[type]({message, description});

export async function action({ request }) {
    const formData=await request.formData();
    const updates = Object.fromEntries(formData);
    const subject = localStorage.getItem('subject');
    console.log("form data:",updates);
    if (Object.keys(updates).length < 1) {
        openNotificationWithIcon("error","你至少要选择一个子分类!")
        return null;
    }
    // 2024/6/13 thera are a lot of code try here to transform a array to anothre format
    // console.log("after reformat of update:",JSON.stringify(updates));
    let arr=[];
    for(let obj in updates){
        arr.push({
            key:subject+obj,
            // key:updates['subject']+obj,
            label:updates[obj]
        })
    }
    // console.log("object to array:",arr)

    // const requestData=`${arr[0].value}guoaili${JSON.stringify(arr.slice(1))}`
    const requestData={
        subject:subject,
        // subject:updates['subject'],
        // allsub:JSON.stringify(arr.slice(1))
        // 2024/6/26 add
        allsub:JSON.stringify(arr),
    }
    try{
        // await UserService.updateOneSubject(requestData);
        await UserService.updateOneInitDson(requestData);
        openNotificationWithIcon("success","设定成功!")
        return redirect("/nav/");
    }catch{
        openNotificationWithIcon("error","设定失败!请联系管理员")
        return null;
    }
}


export default function SubjectManagement() {
    const [subjects,setSubject]=useState([]);
    // const {subjects} = useLoaderData();
    const [branches,setBranches]=useState([]);
    const [xiaoguo,setXiaoguo]=useState([]);
    const [nosubmit,setNoSubmit]=useState(true);
    const [zpddyz,setZpddyz]=useState(false);
    const [isSubChecked,setIsSubChecked]=useState(false);

    useEffect( ()=>{
        async function zpd(){
            try{
                const restData = await UserService.getAllSubjects();
                const zpddyz = await restData.data;
                setSubject(zpddyz);
                // console.log(subjects);
                // return {subjects};
            }catch(ex){
                openNotificationWithIcon('error','后台获取学科信息失败，请检查后台是否启动，或者联系管理员');
                // return null;
            }
        }
        zpd();
    },[]);

    const handleCheckbox = (value) => {
        console.log("=SubjectManagment=checkbox is:",value);
        setNoSubmit(false);
    }
    const handleRadioSelect = (value) => {
        async function httpRequestForBranchs(val) {
            try{
                // const guoaili=await UserService.getOneSubject(val);
                const guoaili=await UserService.getOneInitDson(val);
                try{
                    const resBranchs=await UserService.getAllBranches();
                    let zhongguo=await resBranchs.data;
                    let abc=null;
                    if (guoaili.data) abc=await JSON.parse(guoaili.data.allsub);
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
                        // setIsSubChecked(true);
                        console.log('=SubjectManagment=after filter:',zhongguo);
                    }else{
                        console.log('=SubjectManagment=no existing subject for ',val);
                        setXiaoguo(null);
                        setXiaoguo(zhongguo);
                    }
                    setIsSubChecked(true);
                }
                catch (ex) {
                    // alert("子分类查询异常!",ex);
                    openNotificationWithIcon("error","子分类查询异常!请联系管理员")
                }
            }
            catch (ex) {
                // alert("查询主科目表异常error!"+ex);
                openNotificationWithIcon("error","查询主科目表异常!请联系管理员")
            }
        }
        httpRequestForBranchs(value);
        localStorage.setItem('subject',value);
        setZpddyz(true);
}
    // const handleRadioSelect = (value) => {
    //     setZpddyz(true);
    // }
    return (
        <>
            <h1>==========   梅花香自苦寒来   ==========</h1>
            <h1 style={{color:'red'}}>
                学科增减管理
            </h1>
            <h2>主学科</h2>
            {subjects.length ? (
              <Form method="post" >
                  <ul style={{listStyle:'none'}}>
                    {subjects.map(sub=> (
                        <li key={sub.name} >
                            <input 
                                type="radio"
                                // at last,2024/6/25, the only correct disable way is here!
                                disabled={zpddyz}
                                id={sub.name}
                                name="subject"
                                value={sub.chname}
                                onChange={e=>handleRadioSelect(e.target.value)}
                                 />
                            <label htmlFor={sub.name}>
                                {sub.chname}
                            </label>
                        </li>
                    ))}
                    {/* <li key="other" >
                            <input 
                                type="radio"
                                id="other"
                                name="subject"
                                value="other"
                                 />
                            <label htmlFor='other'>
                                其他(自定义)
                            </label>
                    </li> */}
                  </ul>
                  {isSubChecked && (
                  <div>
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
                                    checked
                                    onChange={e=>{
                                        e.target.checked=!e.target.checked
                                        // setSubmittale(false);
                                    }}
                                    />
                                <label  htmlFor={sub.label}>
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
                            <li key={sub.chname}>
                                <input 
                                    type="checkbox"
                                    id={sub.chname}
                                    name={sub.chname}
                                    value={sub.chname}
                                    onChange={e=>handleCheckbox(e.target.value)}
                                    />
                                <label  htmlFor={sub.chname}>
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
                <button type="submit" disabled={nosubmit} >提交</button>
                </div>
                )}
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

// export async function loader(){
//     try{
//         const restData = await UserService.getAllSubjects();
//         const subjects = await restData.data;
//         // console.log(subjects);
//         return {subjects};
//     }catch(ex){
//         openNotificationWithIcon('error','后台获取学科信息失败，请检查后台是否启动，或者联系管理员');
//         return null;
//     }
// }