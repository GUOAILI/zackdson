import axios from "axios";

const API_TABLE_URL = "http://localhost:9000/table/";


const getAllWriting = (subject) => {
  return axios.get(API_TABLE_URL + "writing"+`?subject=${subject}`);
};

const delOneWriting = (id) => {
  return axios.put(API_TABLE_URL + "writing/delete"+`?id=${id}`);
  // return axios.put(API_TABLE_URL + "writing/delete",
  //   {
  //     params:{id:id}
  //   }
  // );
};

const getAllNotebook = (subject) => {
  return axios.get(API_TABLE_URL + "notebook"+`?subject=${subject}`);
};

const delOneNotebook = (id) => {
  return axios.put(API_TABLE_URL + "notebook/delete"+`?id=${id}`);
};
// 2024/6/25
const getAllExam = (subject) => {
  return axios.get(API_TABLE_URL + "exam"+`?subject=${subject}`);
};

const delOneExam = (id) => {
  return axios.put(API_TABLE_URL + "exam/delete"+`?id=${id}`);
};
// 
const getAllReview = (subject) => {
  return axios.get(API_TABLE_URL + "review"+`?subject=${subject}`);
};

const delOneReview = (id) => {
  return axios.put(API_TABLE_URL + "review/delete"+`?id=${id}`);
};

const TableService = {
    getAllWriting,
    getAllNotebook,
    delOneWriting,
    delOneNotebook,
    getAllExam,
    delOneExam,
    getAllReview,
    delOneReview,
};

export default TableService;