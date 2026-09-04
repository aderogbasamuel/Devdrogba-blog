
import axios from "axios";

const api = axios.create({
  baseURL: "https://blogsite-bdkx.onrender.com/api",
});

export default api;
