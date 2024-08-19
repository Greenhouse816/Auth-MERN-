import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });
API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});
export const signIn = (formData) => API.post("/user/signin", formData);
export const signUp = (formData) => API.post("/user/signup", formData);
export const googleLogin = (googleData) =>
  API.post("/user/googleLogin", googleData);

export const setPassword = (formData) =>
  API.post("/user/setPassword", formData);
export const changePassword = (formData) =>
  API.post("/user/changePassword", formData);
