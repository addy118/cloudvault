import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  baseURL: "https://cloudvaultt.netlify.app/",
  withCredentials: true,
});

export default api;
