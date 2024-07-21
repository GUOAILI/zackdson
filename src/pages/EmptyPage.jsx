import { useNavigate } from "react-router-dom";
import React,{ useEffect } from "react";
const EmptyLayout = () =>{
    const navigate=useNavigate();
    let 江珊=localStorage.getItem("branchDetail").slice(2);

    useEffect(() => {
      switch (江珊) {
        case '课本':
          navigate('/nav/notebook/list');
          break;
        case '课外扩展':
          navigate('/nav/extension/list');
          break;
        case '写作':
          navigate('/nav/writing/list');
          // navigate('/nav/richtext');
          break;
        case '错题积累':
          navigate('/nav/wrong/list');
          break;
        case '复习':
          navigate('/nav/review/list');
          break;
        case '试卷汇总':
          navigate('/nav/exam/list');
          break;
        case '苹静':
          navigate('/nav/subject');
          break;
        default:
      }      }, []);
      return (
        <>
          <h1 style={{color:'#e32636'}}>
            这是一门新的还没有响应页面的子分类,请联系管理员。
          </h1>
          <button onClick={()=>navigate('/nav')}>返回上一页面</button>
        </>
      )

}
export default EmptyLayout