import React, { useState } from "react";
import { useQuery } from "react-query";
import Loading from "../../components/common/Loading";
import { axiosInstance } from "../../httpServices/axiosInstance";
import { ADMIN_UPDATE_EDITOR } from "../../redux/actions/adminAction";
import "../../styles/admin/AdminViewSingleEditor.css";
import { containerVariants } from "../../variants/commonVariants";
import { motion } from "framer-motion";

const fetching = async (url) =>
  await axiosInstance(url, {
    headers: { Authorization: JSON.parse(localStorage.getItem("user")).jwt }
  });

const AdminViewSingleEditor = (props) => {
  const {
    history: { push },
    match: { url }
  } = props;
  const [state, setState] = useState({ status: "" });
  const [isloading, setisloading] = useState(false);

  const { data, isLoading, error } = useQuery(url, () => fetching(url));

  if (isLoading) return <Loading />;
  if (error) console.log(error);
  if (data) {
    return (
      <>
        {isloading && <Loading />}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="AdminViewSingleEditor d-flex justify-content-center"
        >
          <div className="card p-4 m-4">
            <p>Name : {data.data.data.editor.name}</p>
            <p>Office Name : {data.data.data.editor.officeName}</p>
            <p>Mobile : {data.data.data.editor.mobile}</p>
            <p>Email : {data.data.data.editor.email}</p>
            <p>address : {data.data.data.editor.address}</p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                ADMIN_UPDATE_EDITOR({
                  status: state,
                  push,
                  setisloading,
                  editorId: data.data.data.editor._id
                });
              }}
            >
              <div className="form-group">
                <label htmlFor="status">Status</label>
                <select
                  required
                  name="status"
                  onChange={(e) => setState({ status: e.target.value })}
                  defaultValue={data.data.data.editor.status}
                  className="custom-select form-control"
                  aria-label="Example select with button addon"
                >
                  <option value="requested">Requested</option>
                  <option value="active">Activate</option>
                  <option value="blocked">Block</option>
                </select>
              </div>
              <div className="d-flex justify-content-around">
                <button type="submit" className="btn ">
                  Update Status
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </>
    );
  }
};

export default AdminViewSingleEditor;
