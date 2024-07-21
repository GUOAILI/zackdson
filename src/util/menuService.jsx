import axios from "axios";
import authHeader from "./authHeader";

const API_SUB_URL = "http://localhost:9000/subject/";
const API_BRA_URL = "http://localhost:9000/branch/";
// const API_UPLOAD_URL = "http://localhost:9000/notebook/";

const getAllSubjects = () => {
  return axios.get(API_SUB_URL + "all",{
    headers : authHeader()
  });
};

// const getOneSubject = (subname) => {
//     return axios.post(API_SUB_URL + "one"+`?subname=${subname}`,{
//       headers : authHeader()
//     });
// };

// const updateOneSubject = (updData) => {
//     // return axios.post(API_SUB_URL + "update/one"+`?updData=${updData}`);
//     return axios.post(API_SUB_URL + "update/one",updData,{
//       headers : authHeader()
//     });
// };
// 2024/6/24 add
const getInitDson = () => {
  return axios.get(API_SUB_URL + "initDson",{
    headers : authHeader()
  });
};

const getOneInitDson = (subname) => {
    return axios.post(API_SUB_URL + "initDson/one"+`?subname=${subname}`,null,{
      headers : authHeader()
    });
};

const updateOneInitDson = (updData) => {
    return axios.post(API_SUB_URL + "initDson/update/one",updData,{
      headers : authHeader()
    });
};

const getAllBranches = () => {
  return axios.get(API_BRA_URL + "all",{
    headers : authHeader()
  });
};

// 2024/7/3
const addOneSubject = (subname) => {
  return axios.post(API_SUB_URL + "add/one"+`?subname=${subname}`,null,{
    headers : authHeader()
  });
};
const deleteOneSubject = (subname) => {
  return axios.post(API_SUB_URL + "delete/one"+`?subname=${subname}`,null,{
    headers : authHeader()
  });
};
const addOneBranch = (brhname) => {
  return axios.post(API_BRA_URL + "add/one"+`?brhname=${brhname}`,null,{
    headers : authHeader()
  });
};
const deleteOneBranch = (brhname) => {
  return axios.post(API_BRA_URL + "delete/one"+`?brhname=${brhname}`,null,{
    headers : authHeader()
  });
};


const MenuService = {
  getAllSubjects,
  getAllBranches,
  // 2024/6/24
  getInitDson,
  getOneInitDson,
  updateOneInitDson,
  // 2024/7/3
  addOneSubject,
  deleteOneSubject,
  addOneBranch,
  deleteOneBranch,
};

export default MenuService;