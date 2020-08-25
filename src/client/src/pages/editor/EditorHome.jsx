import React from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import Loading from "../../components/common/Loading";
import { axiosInstance } from "../../httpServices/axiosInstance";
import { Link } from "react-router-dom";

import "../../styles/editor/EditorHome.css";
import { containerVariants } from "../../variants/commonVariants";
import { motion } from "framer-motion";

const fetching = async () =>
  await axiosInstance("/editor/count", {
    headers: { Authorization: JSON.parse(localStorage.getItem("user")).jwt }
  });

const EditorHome = () => {
  const { data, isLoading, error } = useQuery("counts", fetching);

  if (error) {
    if (error.response) {
      toast.error(error.response.data.error.message);
      return <h1>Error</h1>;
    }
    toast.error(error.message);
    return <h1>Error</h1>;
  }
  if (isLoading) return <Loading />;
  if (data) {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="EditorHome d-flex justify-content-center align-items-center flex-wrap mt-5"
      >
        <div className="card d-flex flex-column justify-content-center align-items-center p-4 ">
          <h5 className="text-center">Orders to get started</h5>
          <div className="border rounded-circle d-flex justify-content-center align-items-center my-3">
            {data.data.data.notStartedCount}
          </div>

          <Link
            to="/editor/filter-orders?status=not_started"
            className={`btn ${
              data.data.data.notStartedCount === 0 && "disabled"
            }`}
          >
            View Orders
          </Link>
        </div>
        <div className="card d-flex flex-column justify-content-center align-items-center p-4">
          <h5 className="text-center">Pending Orders</h5>
          <div className="border rounded-circle d-flex justify-content-center align-items-center my-3">
            {data.data.data.startedCount}
          </div>
          <Link
            className={`btn ${data.data.data.startedCount === 0 && "disabled"}`}
            to="/editor/filter-orders?status=started"
          >
            View Orders
          </Link>
        </div>
        <div className="card d-flex flex-column justify-content-center align-items-center p-4">
          <h5 className="text-center">Orders ready to deliver</h5>
          <div className="border rounded-circle d-flex justify-content-center align-items-center my-3">
            {data.data.data.completedCount}
          </div>
          <Link
            className={`btn ${
              data.data.data.completedCount === 0 && "disabled"
            }`}
            to="/editor/filter-orders?status=completed"
          >
            View Orders
          </Link>
        </div>
        <div className="card d-flex flex-column justify-content-center align-items-center p-4">
          <h5 className="text-center mb-4 ">Total Customers</h5>
          <div className="border rounded-circle d-flex justify-content-center align-items-center my-3">
            {data.data.data.customersCount}
          </div>
          <Link
            className={`btn w-100 ${
              data.data.data.customersCount === 0 && "disabled"
            }`}
            to="/editor/all-customers"
          >
            View
          </Link>
        </div>
        <div className="card d-flex flex-column justify-content-center align-items-center p-4">
          <h5 className="text-center mb-4">Total Orders</h5>
          <div className="border rounded-circle d-flex justify-content-center align-items-center my-3">
            {data.data.data.totalOrdersCount}
          </div>
          <Link
            className={`btn ${
              data.data.data.totalOrdersCount === 0 && "disabled"
            }`}
            to="/editor/view-all-orders"
          >
            View Orders
          </Link>
        </div>
      </motion.div>
    );
  }
};

export default EditorHome;
