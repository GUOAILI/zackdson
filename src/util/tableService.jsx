import axios from "axios";
import authHeader from "./authHeader";

const API_TABLE_URL = "http://localhost:9000/table/";


const getAllWriting = (subject) => {
  return axios.get(API_TABLE_URL + "writing"+`?subject=${subject}`,{
    headers : authHeader()
  });
};

const delOneWriting = (id) => {
  return axios.post(API_TABLE_URL + "writing/delete"+`?id=${id}`,null,{
    headers : authHeader()
  });
  // return axios.put(API_TABLE_URL + "writing/delete",
  //   {
  //     params:{id:id}
  //   }
  // );
};

const getAllNotebook = (subject) => {
  return axios.get(API_TABLE_URL + "notebook"+`?subject=${subject}`,{
    headers : authHeader()
  });
};

const delOneNotebook = (id) => {
  // return axios.put(API_TABLE_URL + "notebook/delete"+`?id=${id}`,null,{
  return axios.post(API_TABLE_URL + "notebook/delete"+`?id=${id}`,null,{
    headers : authHeader()
  });
};
// 2024/6/25
const getAllExam = (subject) => {
  return axios.get(API_TABLE_URL + "exam"+`?subject=${subject}`,{
    headers : authHeader()
  });
};

const delOneExam = (id) => {
  return axios.post(API_TABLE_URL + "exam/delete"+`?id=${id}`,null,{
    headers : authHeader()
  });
};
// 
const getAllReview = (subject) => {
  return axios.get(API_TABLE_URL + "review"+`?subject=${subject}`,{
    headers : authHeader()
  });
};

const delOneReview = (id) => {
  return axios.post(API_TABLE_URL + "review/delete"+`?id=${id}`,null,{
    headers : authHeader()
  });
};
// 2023/6/29
const getAllWrong = (subject) => {
  return axios.get(API_TABLE_URL + "wrong"+`?subject=${subject}`,{
    headers : authHeader()
  });
};

const delOneWrong = (id) => {
  return axios.post(API_TABLE_URL + "wrong/delete"+`?id=${id}`,null,{
    headers : authHeader()
  });
};
// 2023/6/29 night
const getAllExt = (subject) => {
  return axios.get(API_TABLE_URL + "extension"+`?subject=${subject}`,{
    headers : authHeader()
  });
};

const delOneExt = (id) => {
  return axios.post(API_TABLE_URL + "extension/delete"+`?id=${id}`,null,{
    headers : authHeader()
  });
};
// 2024/7/1 add 
const updateWritingDb = (formData) => {
  return axios.post(API_TABLE_URL + "writing/update",formData,{
    headers : authHeader()
  });
};
const updateWrongDb = (formData) => {
  return axios.post(API_TABLE_URL + "wrong/update",formData,{
    headers : authHeader()
  });
};
const updateExamDb = (formData) => {
  return axios.post(API_TABLE_URL + "exam/update",formData,{
    headers : authHeader()
  });
};
const updateReviewDb = (formData) => {
  return axios.post(API_TABLE_URL + "review/update",formData,{
    headers : authHeader()
  });
};
const updateNotebookDb = (formData) => {
  return axios.post(API_TABLE_URL + "notebook/update",formData,{
    headers : authHeader()
  });
};
const updateExtensionDb = (formData) => {
  return axios.post(API_TABLE_URL + "extension/update",formData,{
    headers : authHeader()
  });
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
    getAllWrong,
    delOneWrong,
    getAllExt,
    delOneExt,
  // 2024/7/1 for update respective subject data
    updateWritingDb,
    updateWrongDb,
    updateExamDb,
    updateNotebookDb,
    updateReviewDb,
    updateExtensionDb
};

export default TableService;