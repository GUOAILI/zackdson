import axios from "axios";

const API_SUB_URL = "http://localhost:9000/subject/";
const API_BRA_URL = "http://localhost:9000/branch/";
const API_UPLOAD_URL = "http://localhost:9000/notebook/";

const getAllSubjects = () => {
  return axios.get(API_SUB_URL + "all");
};

const getOneSubject = (subname) => {
    return axios.post(API_SUB_URL + "one"+`?subname=${subname}`);
};

const updateOneSubject = (updData) => {
    // return axios.post(API_SUB_URL + "update/one"+`?updData=${updData}`);
    return axios.post(API_SUB_URL + "update/one",updData);
};

const getNotebookImageFromDatabase =()=>{
  return axios.get(API_UPLOAD_URL + 'images');
}
const saveNotebookWebcamToDatabase = (feed) => {
    // return axios.post(API_UPLOAD_URL + "webcam",feed
    return axios.post(API_UPLOAD_URL + "webcam",{
      image:feed
    }
  )};
const saveMultiNBWebcamToBackend = (index,feed) => {
    // return axios.post(API_UPLOAD_URL + "webcam",feed
    return axios.post(API_UPLOAD_URL + "webcam/multi",{
      index:index,
      image:feed,
    },
    {
      Headers:{
        'Content-Type': 'application/json;charset=utf-8'
      }
    },
)}
const submitMultiNBWebcamToDatabase = () => {
    return axios.get(API_UPLOAD_URL + "webcam/saveall");
}

const saveNotebookToDatabaseWithPhoto = (data) => {
  // https://www.cnblogs.com/sunxiaopei/p/14023883.html

    // const params = new URLSearchParams();
    // params.append('name', name);
    // params.append('file', file);
    // return axios.post(API_SUB_URL + "update/one"+`?updData=${updData}`);
    return axios.post(API_UPLOAD_URL + "database",data,
      // [
      //   {name:zjd},
      //   {file:data}
      // ],
    {
      Headers:{
        'Content-Type': 'multipart/form-data'
      }}
  // {
  // 	headers: {
  //         'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  //       }  
  // }
    );
    // }
};

const getAllBranches = () => {
  return axios.get(API_BRA_URL + "all");
};


const UserService = {
  getAllSubjects,
  getOneSubject,
  getAllBranches,
  updateOneSubject,
  // 
  saveNotebookToDatabaseWithPhoto,
  getNotebookImageFromDatabase,
  saveNotebookWebcamToDatabase,
  saveMultiNBWebcamToBackend,
  submitMultiNBWebcamToDatabase,
};

export default UserService;