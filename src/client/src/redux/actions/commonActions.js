// import axios from "axios";
import { axiosInstance } from "../../httpServices/axiosInstance";
import Joi from "@hapi/joi";
import { toast } from "react-toastify";

const REGISTRATION = (obj) => async () => {
  try {
    const { name, email, password, officeName, mobile, address } = obj.user;
    const Schemavalidation = Joi.object({
      name: Joi.string().min(3).max(30).required(),
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net"] }
        })
        .required(),
      password: Joi.string().min(3).max(30).required(),
      officeName: Joi.string().min(3).max(30).required(),
      mobile: Joi.string().length(10).regex(/^\d+$/).required(),
      address: Joi.string().min(3).max(60).required()
    });
    const { error } = Schemavalidation.validate({
      name,
      email,
      password,
      officeName,
      mobile,
      address
    });
    if (error) {
      return toast.error(error.message);
    }
    obj.setIsLoading(true);
    const { data } = await axiosInstance.post(obj.route, obj.user, {
      headers: {
        Authorization: localStorage.getItem("user")
          ? JSON.parse(localStorage.getItem("user")).jwt
          : null
      }
    });
    obj.setIsLoading(false);
    toast.success(data.success.message);
    if (obj.userType) {
      return obj.push("/editor/activate-account");
    } else {
      return obj.push("/editor/home");
    }
  } catch (error) {
    obj.setIsLoading(false);
    if (error.response) toast.error(error.response.data.error.message);
    else console.log(error.message);
  }
};

const LOGIN = (obj) => async (dispatch) => {
  try {
    const { email, password } = obj.user;
    const Schemavalidation = Joi.object({
      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] }
      }),
      password: Joi.string().min(3).max(30).required()
    });
    const { error } = Schemavalidation.validate({
      email,
      password
    });
    if (error) {
      return toast.error(error.message);
    }
    obj.IS_LOADING();
    const { data } = await axiosInstance.post(obj.route, obj.user);
    obj.IS_LOADING();
    localStorage.setItem(
      "user",
      JSON.stringify({
        role: obj.userType,
        jwt: data.data.jsonWebToken,
        name: data.data.name,
        isLoggedIn: true
      })
    );
    dispatch({
      type: "LOGIN",
      payload: {
        role: obj.userType,
        jwt: data.data.jsonWebToken,
        name: data.data.name,
        isLoggedIn: true
      }
    });
    toast.success("Logged in successfully");
    obj.push(`/${obj.userType}/home`);
  } catch (error) {
    obj.IS_LOADING();
    if (error.response) toast.error(error.response.data.error.message);
    else console.log(error.message);
  }
};

const LOGOUT = (obj) => async (dispatch) => {
  try {
    obj.IS_LOADING();
    console.log("hitting logout");
    const { data } = await axiosInstance.delete(obj.route, {
      headers: {
        Authorization: JSON.parse(localStorage.getItem("user")).jwt
      }
    });
    obj.IS_LOADING();
    localStorage.removeItem("user");
    dispatch({
      type: "LOGOUT",
      payload: null
    });
    toast.success(data.message);
    obj.push("/");
  } catch (error) {
    obj.IS_LOADING();
    localStorage.removeItem("user");
    dispatch({
      type: "LOGOUT",
      payload: null
    });
    obj.push("/");
  }
};

const CHANGE_PASSWORD = async (obj) => {
  try {
    obj.setisloading(true);
    const { data } = await axiosInstance.patch(
      obj.changePasswordRoute,
      obj.state,
      {
        headers: {
          Authorization: JSON.parse(localStorage.getItem("user")).jwt
        }
      }
    );
    obj.setisloading(false);
    toast.success(data.success.message);
  } catch (error) {
    obj.setisloading(false);
    console.log(error.response);
    if (error.response) toast.error(error.response.data.error.message);
  }
};

const FORGOT_PASSWORD = async (obj) => {
  try {
    const { email, newPassword, otp, mobile } = obj.user;
    if (!obj.state.submitted || obj.reSubmitted) {
      const Schemavalidation = Joi.object({
        email: Joi.string()
          .email({
            minDomainSegments: 2,
            tlds: { allow: ["com", "net"] }
          })
          .required(),
        mobile: Joi.string().length(10).regex(/^\d+$/).required()
      });
      const { error } = Schemavalidation.validate({
        email,
        mobile
      });
      if (error) return toast.error(error.message);
    } else {
      const Schemavalidation = Joi.object({
        otp: Joi.string().length(4).regex(/^\d+$/).required(),
        newPassword: Joi.string().required()
      });
      const { error } = Schemavalidation.validate({
        otp,
        newPassword
      });
      if (error) return toast.error(error.message);
    }

    obj.setLoading(true);
    const { data } = await axiosInstance.patch(obj.route, obj.user, {
      headers: { "Content-Type": "application/json" }
    });
    obj.setLoading(false);
    toast.success(data.success.message);
    obj.setState({ ...obj.state, submitted: true });
    if (obj.to) obj.push(obj.to);
  } catch (error) {
    obj.setLoading(false);
    console.log(error.response);
    if (error.response) toast.error(error.response.data.error.message);
  }
};

const IS_LOADING = () => ({ type: "IS_LOADING", payload: null });
export {
  REGISTRATION,
  LOGIN,
  LOGOUT,
  IS_LOADING,
  CHANGE_PASSWORD,
  FORGOT_PASSWORD
};
