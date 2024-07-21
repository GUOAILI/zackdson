import { redirect} from 'react-router-dom';

export function getTokenDuration() {
  const storedExpirationDate = localStorage.getItem('expiration');
  const expirationDate = new Date(storedExpirationDate);
  const now = new Date();
  const duration = expirationDate.getTime() - now.getTime();
  return duration;
}

export function getAuthToken() {
  const token = localStorage.getItem('token');

  if (!token) {
    return null;
  }

  const tokenDuration = getTokenDuration();

  if (tokenDuration < 0) {
    localStorage.removeItem('dpj-sb');
    localStorage.removeItem('long');
    localStorage.removeItem('school');
    localStorage.removeItem('grade');
    localStorage.removeItem("resetGrade");
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');

    localStorage.removeItem("subject");
    localStorage.removeItem("branchDetail");
    localStorage.removeItem("notebookRecord");
    localStorage.removeItem("writingRecord");
    localStorage.removeItem("wrongRecord");
    localStorage.removeItem("examRecord");
    localStorage.removeItem("reviewRecord");
    localStorage.removeItem("extensionRecord");
    
    return redirect('/');
  }

  return token;
}

export function tokenLoader() {
  const token = getAuthToken();
  return token;
}
