import { axiosInstance } from "../../httpServices/axiosInstance";
import { toast } from "react-toastify";

const EDITOR_CREATE_ORDER = async (obj) => {
  try {
    obj.setisloading(true);
    const { data } = await axiosInstance.post(
      "/editor/create-order",
      obj.order,
      {
        headers: {
          Authorization: JSON.parse(localStorage.getItem("user")).jwt
        }
      }
    );
    obj.setisloading(false);
    toast.success(data.success.message);
    obj.push("/editor/home");
  } catch (error) {
    obj.setisloading(false);
    console.log("error", error);
    if (error.response) toast.error(error.response.data.error.message);
    console.log("errorResponse", error.response);
  }
};

const EDITOR_UPDATE_ORDER = async (obj) => {
  try {
    obj.setisloading(true);
    const { data } = await axiosInstance.patch(
      `/editor/update-order/${obj.orderId}`,
      obj.order,
      {
        headers: {
          Authorization: JSON.parse(localStorage.getItem("user")).jwt
        }
      }
    );
    obj.setisloading(false);
    toast.success(data.success.message);
    obj.push("/editor/home");
  } catch (error) {
    obj.setisloading(false);
    console.log(error);
  }
};

const EDITOR_REMOVE_CUSTOMER = async (obj) => {
  try {
    const { data } = await axiosInstance.delete(
      `/editor/remove-customer/${obj.customerId}`,
      {
        headers: {
          Authorization: JSON.parse(localStorage.getItem("user")).jwt
        }
      }
    );
    toast.success(data.success.message);
  } catch (error) {
    console.log("error", error);
    console.log("errorResponse", error.response);
  }
};

const EDITOR_CANCEL_ORDER = async (obj) => {
  try {
    obj.setisloading(true);
    await axiosInstance.patch(
      `/editor/update-order/${obj.orderId}`,
      obj.order,
      {
        headers: {
          Authorization: JSON.parse(localStorage.getItem("user")).jwt
        }
      }
    );
    obj.setisloading(false);
    toast.success("Order Cancelled");
    obj.push("/editor/home");
  } catch (error) {
    obj.setisloading(false);
    console.log("here", error.response);
  }
};
export {
  EDITOR_CREATE_ORDER,
  EDITOR_UPDATE_ORDER,
  EDITOR_REMOVE_CUSTOMER,
  EDITOR_CANCEL_ORDER
};
