const AUTH_KEY = "kanban_a";

export const saveToken = (value: string) => {
  localStorage.setItem(AUTH_KEY, value);
};

export const getToken = () => {
  return localStorage.getItem(AUTH_KEY);
};

export const removeToken = () => {
  localStorage.removeItem(AUTH_KEY);
};

export const getAuthHeader = () => {
  return { Authorization: `Bearer ${getToken()}` };
};
