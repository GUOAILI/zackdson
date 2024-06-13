import axios from "axios";

const API_SUB_URL = "http://localhost:9000/subject/";
const API_BRA_URL = "http://localhost:9000/branch/";

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

const getAllBranches = () => {
  return axios.get(API_BRA_URL + "all");
};


const UserService = {
  getAllSubjects,
  getOneSubject,
  getAllBranches,
  updateOneSubject,
};

export default UserService;