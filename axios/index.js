import axios from "axios";

axios.defaults.baseURL = "https://formidable-back.onrender.com/api";

const back = axios.create({
  baseURL: "https://formidable-back.onrender.com/api",
  withCredentials: true,
});

export default back;
