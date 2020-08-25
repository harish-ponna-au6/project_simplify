import React from "react";
import { useQuery } from "react-query";
import Loading from "../../components/common/Loading";
import { axiosInstance } from "../../httpServices/axiosInstance";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import "../../styles/admin/AdminHome.css";
import { containerVariants } from "../../variants/commonVariants";

const fetching = async () =>
  await axiosInstance("/admin/count", {
    headers: { Authorization: JSON.parse(localStorage.getItem("user")).jwt }
  });

const AdminHome = () => {
  const { data, isLoading, error } = useQuery("counts", fetching);

  if (error) console.log(error);
  if (isLoading) return <Loading />;
  if (data) {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="AdminHome d-flex justify-content-center align-items-center flex-wrap"
      >
        <div className="card d-flex flex-column justify-content-center align-items-center p-4">
          <h5 className="text-center">Requested Editors</h5>
          <div className="border rounded-circle d-flex justify-content-center align-items-center my-3">
            {data.data.data.requestedEditorsCount}
          </div>

          <Link
            to="/admin/filter-editors?status=requested"
            className={`btn ${
              data.data.data.requestedEditorsCount === 0 && "disabled"
            }`}
          >
            View
          </Link>
        </div>
        <div className="card d-flex flex-column justify-content-center align-items-center p-4">
          <h5 className="text-center">Active Editors</h5>
          <div className="border rounded-circle d-flex justify-content-center align-items-center my-3">
            {data.data.data.activeEditorsCount}
          </div>
          <Link
            className={`btn ${
              data.data.data.activeEditorsCount === 0 && "disabled"
            }`}
            to="/admin/filter-editors?status=active"
          >
            View
          </Link>
        </div>
        <div className="card d-flex flex-column justify-content-center align-items-center p-4">
          <h5 className="text-center">Blocked Editors</h5>
          <div className="border rounded-circle d-flex justify-content-center align-items-center my-3">
            {data.data.data.blockedEditorsCount}
          </div>
          <Link
            className={`btn ${
              data.data.data.blockedEditorsCount === 0 && "disabled"
            }`}
            to="/admin/filter-editors?status=blocked"
          >
            View
          </Link>
        </div>
      </motion.div>
    );
  }
};

export default AdminHome;
