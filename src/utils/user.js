export const getUser = () => JSON.parse(window.sessionStorage.getItem("token"));

export const setUser = (token) =>
  window.sessionStorage.setItem("token", JSON.stringify(token));

export const removeUser = () => window.sessionStorage.removeItem("token");
