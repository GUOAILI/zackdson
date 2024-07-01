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

const getOneSubject = (subname) => {
    return axios.post(API_SUB_URL + "one"+`?subname=${subname}`,{
      headers : authHeader()
    });
};

const updateOneSubject = (updData) => {
    // return axios.post(API_SUB_URL + "update/one"+`?updData=${updData}`);
    return axios.post(API_SUB_URL + "update/one",updData,{
      headers : authHeader()
    });
};
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

// const createOneInitDson = (updData) => {
//     return axios.post(API_SUB_URL + "initDson/create/one",updData);
// };
// ================

// const getNotebookImageFromDatabase =()=>{
//   return axios.get(API_UPLOAD_URL + 'images',{
//     headers : authHeader()
//   });
// }
// const saveNotebookWebcamToDatabase = (feed) => {
//     return axios.post(API_UPLOAD_URL + "webcam",{
//       image:feed
//     }
//   )};
// const saveMultiNBWebcamToBackend = (index,feed) => {
//     return axios.post(API_UPLOAD_URL + "webcam/multi",{
//       index:index,
//       image:feed,
//     },
//     {
//       Headers:{
//         'Content-Type': 'application/json;charset=utf-8'
//       }
//     },
// )}
// const submitMultiNBWebcamToDatabase = () => {
//     return axios.get(API_UPLOAD_URL + "webcam/saveall");
// }

// const saveNotebookToDatabaseWithPhoto = (data) => {
//   // https://www.cnblogs.com/sunxiaopei/p/14023883.html

//     return axios.post(API_UPLOAD_URL + "database",data,
//     {
//       Headers:{
//         'Content-Type': 'multipart/form-data'
//       }}
//     );
// };

const getAllBranches = () => {
  return axios.get(API_BRA_URL + "all",{
    headers : authHeader()
  });
};

const UserService = {
  getAllSubjects,
  getOneSubject,
  getAllBranches,
  updateOneSubject,
  // 
  // saveNotebookToDatabaseWithPhoto,
  // getNotebookImageFromDatabase,
  // saveNotebookWebcamToDatabase,
  // saveMultiNBWebcamToBackend,
  // submitMultiNBWebcamToDatabase,

  // 2024/6/24
  getInitDson,
  getOneInitDson,
  updateOneInitDson,
};

export default UserService;