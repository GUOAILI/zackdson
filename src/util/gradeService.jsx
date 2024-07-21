import axios from "axios";
import authHeader from "./authHeader";

const API_GRADE_URL = "http://localhost:9000/grade/";

const getGrade = () => {
  return axios.get(API_GRADE_URL + "get",{
    headers : authHeader()
  });
};

const saveGrade= (school,grade) => {
    return axios.post(API_GRADE_URL + "save"+`?school=${school}&grade=${grade}`,null,{
      headers : authHeader()
    });
};

const deleteGrade= () => {
    return axios.get(API_GRADE_URL + "delete",{
      headers : authHeader()
    });
};

const GradeService = {
  getGrade,
  saveGrade,
  deleteGrade,
};

export default GradeService;