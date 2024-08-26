import axios from "axios";

const api = axios.create({
  baseURL: "http://3.39.56.63:3000",
});

export default api;
