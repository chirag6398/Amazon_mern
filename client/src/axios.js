import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5001/challenge-57e90/us-central1/api",
});

export default instance;
