import axios from 'axios'

const API_LOGIN_URL = 'http://localhost:9000/auth';

export const createuser = (user) => {
    return axios.post(API_LOGIN_URL + '/register/save', user)
}

export const loginuser = (user) => {
    // return axios.post(API_LOGIN_URL + '/login', user,{timeout:10000})
    return axios.post(API_LOGIN_URL + '/login', user)
}

const AuthService = {
    createuser,
    loginuser,
  };
  
  export default AuthService;