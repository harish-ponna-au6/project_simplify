import { axiosInstance } from "../../httpServices/axiosInstance";
import { toast } from "react-toastify";

const ADMIN_UPDATE_EDITOR = async (obj) => {
  try {
    obj.setisloading(true);
    const { data } = await axiosInstance.patch(
      `/admin/update-editor/${obj.editorId}`,
      obj.status,
      {
        headers: {
          Authorization: JSON.parse(localStorage.getItem("user")).jwt
        }
      }
    );
    obj.setisloading(false);
    toast.success(data.success.message);
    obj.push("/admin/home");
  } catch (error) {
    obj.setisloading(false);
    console.log(error);
  }
};

export { ADMIN_UPDATE_EDITOR };
