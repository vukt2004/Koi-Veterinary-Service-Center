import axios from "axios";
const baseUrl = "http://localhost:8080/api";

const config = {
  baseUrl: baseUrl,
};

const api = axios.create(config);

api.defaults.baseURL = baseUrl;


export default api;
