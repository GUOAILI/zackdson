import axios from "axios";

const API_GRADE_URL = "http://localhost:9000/grade/";

const getGrade = () => {
  return axios.get(API_GRADE_URL + "get");
};

const saveGrade= (school,grade) => {
    return axios.post(API_GRADE_URL + "save"+`?school=${school}&grade=${grade}`);
};

const updateGrade= (school,grade) => {
    return axios.post(API_GRADE_URL + "update/"+`?school=${school}&grade=${grade}`);
};

const GradeService = {
  getGrade,
  saveGrade,
  updateGrade,
};

export default GradeService;