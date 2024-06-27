import SubjectLayout from "./SubjectBook";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const EmptyLayout = () =>{
    const navigate=useNavigate();
    let 江珊=localStorage.getItem("branchDetail").slice(2);

    useEffect(() => {
      switch (江珊) {
        case '课本':
          navigate('/nav/notebook/list');
          break;
        case '课外扩展':
          navigate('/nav/branch2');
          break;
        case '写作':
          navigate('/nav/writing/list');
          break;
        case '错题积累':
          navigate('/nav/branch4');
          break;
        case '复习':
          navigate('/nav/review/list');
          break;
        case '试卷汇总':
          navigate('/nav/exam/list');
          break;
        default:
          return (
            <>
              <h1>
                这是一门新的还没有写入后台的子分类,请联系管理员。
              </h1>
            </>
          )
    }      }, []);
}
export default EmptyLayout