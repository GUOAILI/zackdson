import axios from "axios";

const API_FILE_URL = "http://localhost:9000/localupload/";

const getAllFiles = () => {
  return axios.get(API_FILE_URL + "files");
};

const getOneFile= (filename) => {
    return axios.post(API_FILE_URL + "files/"+`${filename}`);
};

const uploadFile = (updData) => {
    return axios.post(API_FILE_URL + "upload",updData);
};


const FileService = {
  getAllFiles,
  getOneFile,
  uploadFile,
};

export default FileService;