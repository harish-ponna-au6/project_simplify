import React, { useState } from "react";
import { useQuery } from "react-query";
import { axiosInstance } from "../../httpServices/axiosInstance";
import Loading from "./Loading";
import "../../styles/common/ViewSingleOrder.css";
import { withRouter } from "react-router-dom";
import {
  EDITOR_UPDATE_ORDER,
  EDITOR_CANCEL_ORDER
} from "../../redux/actions/editorActions";
import { motion } from "framer-motion";
import { containerVariants } from "../../variants/commonVariants";

const fetching = async (route) =>
  await axiosInstance(route, {
    headers: { Authorization: JSON.parse(localStorage.getItem("user")).jwt }
  });

const ViewSingleOrder = (props) => {
  const {
    userType,
    url,
    history: { push }
  } = props;

  const { data, isLoading, error } = useQuery(url, () => fetching(url));

  const [state, setState] = useState({ status: "", isPaymentCompleted: "" });
  const [isloading, setisloading] = useState(false);
  const handleOnChange = (e) =>
    setState({ ...state, [e.target.name]: e.target.value });

  if (isLoading) return <Loading />;
  if (error) console.log(error.response);
  if (data) {
    return (
      <>
        {isloading && <Loading />}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="ViewSingleOrder d-flex justify-content-center align-items-center"
        >
          <div className="card col-md-10  p-3 m-5">
            <h3 className="text-center mb-5">
              <u>Order</u>
            </h3>
            <div className=" d-flex justify-content-center flex-wrap">
              <div className="col-md-6">
                <p>Title Of Order : {data.data.data.order.titleOfOrder}</p>
                <p>Type Of Order : {data.data.data.order.typeOfOrder}</p>
                {userType === "editor" ? (
                  <>
                    <p>
                      Customer Name : {data.data.data.order.customerId.name}
                    </p>
                    <p>
                      Customer Office :{" "}
                      {data.data.data.order.customerId.officeName}
                    </p>
                  </>
                ) : (
                  <>
                    <p>Editor Name : {data.data.data.order.editorId.name}</p>
                    <p>
                      Editor Office : {data.data.data.order.editorId.officeName}
                    </p>
                  </>
                )}
                <p>Description : {data.data.data.order.description}</p>
                <p>Output Format : {data.data.data.order.outPutFormat}</p>
                <p>
                  Estimated Delivery :{" "}
                  {data.data.data.order.estimatedDateOfCompletion}
                </p>
              </div>
              <div className="col-md-6">
                <p>Alloted Employee : {data.data.data.order.allotedEmployee}</p>
                <p>Total Amount : {data.data.data.order.totalAmountInINR}</p>
                <p>
                  Advance Amount Paid :{" "}
                  {data.data.data.order.advanceAmountInINR}
                </p>
                {userType === "customer" ? (
                  <>
                    <p>Status : {data.data.data.order.status}</p>
                    <p>
                      Payment Completed :
                      {data.data.data.order.isPaymentCompleted ? "Yes" : "No"}
                    </p>
                  </>
                ) : (
                  <>
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        EDITOR_UPDATE_ORDER({
                          order: state,
                          push,
                          setisloading,
                          orderId: data.data.data.order._id
                        });
                      }}
                    >
                      <div className="form-group">
                        <label htmlFor="status">Status</label>
                        <select
                          required
                          name="status"
                          onChange={handleOnChange}
                          defaultValue={data.data.data.order.status}
                          className="custom-select form-control"
                          aria-label="Example select with button addon"
                        >
                          <option value="not_started">Not Started</option>
                          <option value="started">Started</option>
                          <option value="completed">Completed</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label htmlFor="isPaymentComplted">
                          Payment Completed?
                        </label>
                        <select
                          required
                          name="isPaymentCompleted"
                          onChange={handleOnChange}
                          defaultValue={data.data.data.order.isPaymentCompleted}
                          className="custom-select"
                          aria-label="Example select with button addon"
                        >
                          <option value="true">Yes</option>
                          <option value="false">No</option>
                        </select>
                      </div>
                      <div className="d-flex justify-content-around flex-wrap ">
                        <button type="submit" className="btn my-2">
                          Update Order
                        </button>
                        <button
                          onClick={() => {
                            EDITOR_CANCEL_ORDER({
                              orderId: data.data.data.order._id,
                              order: {
                                isPaymentCompleted:
                                  data.data.data.order.isPaymentCompleted,
                                status: "cancelled"
                              },
                              setisloading,
                              push
                            });
                          }}
                          type="button"
                          className="btn my-2"
                        >
                          Cancel Order
                        </button>
                      </div>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </>
    );
  }
};

export default withRouter(ViewSingleOrder);
