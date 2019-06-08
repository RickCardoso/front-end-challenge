export interface User {
  firstName: string;
}

const USER_KEY = 'USER_KEY';

function setUser(user: User) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

function getUser(): User | null {
  const data = localStorage.getItem(USER_KEY);
  if (!data) {
    return null;
  }
  return JSON.parse(data);
}

function logout() {
  localStorage.removeItem(USER_KEY);
}

function isAuthenticated() {
  try {
    return !!getUser();
  } catch (e) {
    return false;
  }
}

export default {
  setUser,
  getUSer: getUser,
  logout,
  isAuthenticated,
};
