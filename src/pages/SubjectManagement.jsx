import UserService from "../util/userService";
import { useLoaderData,Form,redirect} from "react-router-dom";
import { useState } from "react";

import { notification } from "antd";
const openNotificationWithIcon = (type, message, description) => notification[type]({message, description});

export async function action({ request }) {
    const formData=await request.formData();
    const updates = Object.fromEntries(formData);
    if (!Object.keys(updates).length > 0) {
        openNotificationWithIcon("error","你至少要选择一个子分类!")
        return null;
    }
    console.log("form data:",updates);
    return redirect("/nav/empty");
}

export default function SubjectManagement() {
    const {subjects} = useLoaderData();
    const [subRadio,setSubRadio]=useState();
    const [ganguo,setganguo]=useState([]);
    const [xiaoguo,setXiaoguo]=useState([]);
    const [submittale,setSubmittale]=useState(true);
    const [ul1enable,setUl1enable]=useState(false);
    // console.log(subjects);

    const handleCheckbox = (value) => {
        console.log("checkbox is:",value);
        setSubmittale(false);
    }
    const handleRadioSelect = (value) => {
        async function httpRequestForBranchs(val) {
            try{
                const guoaili=await UserService.getOneSubject(val);
                if (guoaili.data.allsub) {
                    const abc=await JSON.parse(guoaili.data.allsub);
                    setganguo(abc);
                    setUl1enable(true);
                }
            }
            catch (ex) {
                alert("查询主科目表异常error!"+ex);
            }
            try{
                const resBranchs=await UserService.getAllBranchs();
                let zhongguo=await resBranchs.data;
                if (ganguo.length){
                    ganguo.forEach(aili=>
                        (zhongguo=zhongguo.filter(abc=>abc.name!==aili.name))
                    )
                    console.log('after filter:',zhongguo);
                    setXiaoguo(zhongguo);
                }else{
                    console.log('after filter:',zhongguo);
                    setXiaoguo(zhongguo);
                }
            }
            catch (ex) {
                alert("子分类查询异常!",ex);
            }
        }
        httpRequestForBranchs(value);
    }
    return (
        <>
            <h1 style={{color:'red'}}>
                学科增减管理
            </h1>
            <h2>主学科</h2>
            {subjects.length ? (
                <div>
                <ul disabled={ul1enable}>
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
                <hr />
                <h2>内容分类</h2>
                {xiaoguo.length ? 
                    (
                    <Form method="post">
                    <ul>
                        {xiaoguo.map( sub => (
                            <li key={sub.name}>
                                <input 
                                    type="checkbox"
                                    id={sub.name}
                                    name={sub.name}
                                    value={sub.name}
                                    onChange={e=>handleCheckbox(e.target.value)}
                                    />
                                <label>
                                    {sub.chname}
                                </label>
                            </li>
                        )

                        )}
                    </ul>
                    <button type="submit" disabled={submittale} >提交</button>
                    </Form>
                    )
                : 
                (<p>这里是二级分类,在科目选定后会显示</p>)
                }
                </div>
            ) : (
                <p>
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
