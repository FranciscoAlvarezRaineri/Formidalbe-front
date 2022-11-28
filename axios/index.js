import axios from "axios";

axios.defaults.baseURL = "https://localhost:3001/api";

const back = axios.create({
  baseURL: "http://localhost:3001/api",
});

export default back;
