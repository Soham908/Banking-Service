import axios from "axios";

const url = process.env.REACT_APP_BACKEND_PORT_URL + "/api/auth";

export const userLoginAction = async (data) => {
  const login = await axios.post(url + "/login", data);
  return login.data;
};

export const userRegisterAction = async (data) => {
  const register = await axios.post(url + "/register", data);
  return register.data;
};
