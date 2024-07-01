import axios from "axios";
import authHeader from "./authHeader";

const API_FILE_URL = "http://localhost:9000/localupload/";

// const getAllFiles = () => {
//   return axios.get(API_FILE_URL + "files");
// };

// const getOneFile= (filename) => {
//     return axios.post(API_FILE_URL + "files/"+`${filename}`);
// };

// const uploadFile = (updData) => {
//     return axios.post(API_FILE_URL + "upload",updData,
//       {
//         Headers:{
//           'Content-Type': 'multipart/form-data',
//         }
//       }
// )};
const uploadFileAndSaveToWritingDb = (updData) => {
    return axios.post(API_FILE_URL + "baiduwenxin/writing",updData,{
    //   headers: {  
    //     'Content-Type': 'multipart/form-data'  
    // }  
    headers : authHeader()
  }
)};

const uploadFileAndSaveToNotebookDb = (updData) => {
    return axios.post(API_FILE_URL + "baiduwenxin/notebook",updData,{
      headers : authHeader()
    //   headers: {  
    //     'Content-Type': 'multipart/form-data',
    // }  
  }
)};
const uploadFileAndSaveToExamDb = (updData) => {
    return axios.post(API_FILE_URL + "baiduwenxin/exam",updData,{
      headers : authHeader()
  }
)};
const uploadFileAndSaveToReviewDb = (updData) => {
    return axios.post(API_FILE_URL + "baiduwenxin/review",updData,{
      headers : authHeader() 
  }
)};

const uploadFileAndSaveToWrongDb = (updData) => {
    return axios.post(API_FILE_URL + "baiduwenxin/wrong",updData,{
      headers : authHeader()
  }
)};

const uploadFileAndSaveToExtDb = (updData) => {
    return axios.post(API_FILE_URL + "baiduwenxin/extension",updData,{
      headers : authHeader()
  }
)};


const FileService = {
  // getAllFiles,
  // getOneFile,
  // uploadFile,
  uploadFileAndSaveToWritingDb,
  uploadFileAndSaveToNotebookDb,
  uploadFileAndSaveToExamDb,
  uploadFileAndSaveToReviewDb,
  uploadFileAndSaveToWrongDb,
  uploadFileAndSaveToExtDb,
};

export default FileService;