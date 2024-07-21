import axios from "axios";
import authHeader from "./authHeader";

const API_USR_URL = "http://localhost:9000/user/";


const getCurrentUser = () => {
    return axios.get(API_USR_URL + "current",{
      headers : authHeader()
    });
};

const UserService = {
    getCurrentUser,
  };
  
  export default UserService;
