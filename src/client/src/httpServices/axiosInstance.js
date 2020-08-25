import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://simplify-2021.herokuapp.com/api",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
});



export { axiosInstance };
