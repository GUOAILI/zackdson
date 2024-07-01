export default function authHeader() {
    // const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');
  
    if (token) {
      // return { Authorization: 'Bearer ' + user.accessToken };
      return { Authorization: 'Bearer ' + token };
    } else {
      return {};
    }
  }