import SubjectLayout from "./Subject";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const EmptyLayout = () =>{
    const navigate=useNavigate();

    useEffect(() => {
        navigate('/导航/分学科');
      }, []);
}
export default EmptyLayout