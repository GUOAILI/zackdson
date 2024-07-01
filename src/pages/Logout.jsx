import { redirect,useNavigate } from "react-router-dom";
import { useEffect } from "react";

export function loader(){
    localStorage.removeItem("school");
    localStorage.removeItem("grade");
    localStorage.removeItem("subject");
    localStorage.removeItem("branchDetail");
    localStorage.removeItem("notebookRecord");
    localStorage.removeItem("writingRecord");
    localStorage.removeItem("wrongRecord");
    localStorage.removeItem("examRecord");
    localStorage.removeItem("reviewRecord");
    localStorage.removeItem("extensionRecord");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    return null;

}

export default function LogoutPage(){
    const navigate=useNavigate();
    useEffect(()=>{
        navigate('/');
    },[])
}