import React from "react";
import { useQuery } from "react-query";
import { axiosInstance } from "../../httpServices/axiosInstance";
import Loading from "./Loading";
import { Link } from "react-router-dom";
import "../../styles/common/ViewOrders.css";
import { motion } from "framer-motion";
import { containerVariants } from "../../variants/commonVariants";

const fetching = async (route) =>
  await axiosInstance(route, {
    headers: {
      Authorization: JSON.parse(localStorage.getItem("user")).jwt
    }
  });

const ViewOrders = (props) => {
  const { route } = props;
  const { data, isLoading, error } = useQuery(route, () => fetching(route));
  if (isLoading) return <Loading />;
  if (error) console.log(error);
  if (data) {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <h3 className="text-center mt-5">
          <u>Orders</u>
        </h3>
        <div className="ViewOrders d-flex flex-wrap justify-content-center align-items-center">
          {data.data.data.orders.length === 0 ? (
            <h2 className="text-center mt-5">No Results Found</h2>
          ) : (
            data.data.data.orders.map((order) => (
              <div
                key={order._id}
                className="card d-flex flex-column justify-content-center  p-4 m-5 mt-3"
              >
                <p>Title of Order : {order.titleOfOrder}</p>
                <p>Type of Order : {order.typeOfOrder}</p>
                {props.userType === "editor" && (
                  <>
                    <p>Customer Name : {order.customerId.name}</p>
                    <p>Customer Office : {order.customerId.officeName}</p>
                  </>
                )}
                {props.userType === "customer" && (
                  <>
                    <p>Editor Name : {order.editorId.name}</p>
                    <p>Editor Office : {order.editorId.officeName}</p>
                  </>
                )}
                <p>Alloted Employee : {order.allotedEmployee}</p>
                <p>
                  Total Amount : <b>₹</b>
                  {order.totalAmountInINR}
                </p>
                <p>Status : {order.status}</p>
                <Link
                  to={`/${props.userType}/view-single-order/${order._id}`}
                  className="btn"
                >
                  View Order
                </Link>
              </div>
            ))
          )}
        </div>
      </motion.div>
    );
  }
};

export default ViewOrders;
