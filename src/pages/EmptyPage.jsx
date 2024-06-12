import SubjectLayout from "./Subject";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const EmptyLayout = () =>{
    const navigate=useNavigate();

    useEffect(() => {
        navigate('/nav/branch');
      }, []);
}
export default EmptyLayout