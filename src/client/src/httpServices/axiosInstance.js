import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://simplify-2021.herokuapp.com/api",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
});

axiosInstance.interceptors.response.use(res=>res, (error) => {
  if (error.response.status === 401) {
    localStorage.removeItem("user");
    window.location = "/";
  }
});

export { axiosInstance };
