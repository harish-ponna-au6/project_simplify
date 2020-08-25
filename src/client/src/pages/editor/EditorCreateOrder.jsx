import React, { useState } from "react";
import Input from "../../components/common/Input";
import "../../styles/editor/EditorCreateOrder.css";
import { useQuery } from "react-query";
import { axiosInstance } from "../../httpServices/axiosInstance";
import Loading from "../../components/common/Loading";
import { EDITOR_CREATE_ORDER } from "../../redux/actions/editorActions";
import { containerVariants } from "../../variants/commonVariants";
import { motion } from "framer-motion";

const fetching = async () =>
  await axiosInstance("/editor/get-customer-ids", {
    headers: {
      Authorization: JSON.parse(localStorage.getItem("user")).jwt
    }
  });

const EditorCreateOrder = (props) => {
  const {
    history: { push }
  } = props;
  const { data, isLoading, error } = useQuery("clientsIds", fetching);
  console.log("data", data);
  console.log("error", error);

  const [state, setState] = useState({
    customerId: "chooseCustomer",
    titleOfOrder: "",
    typeOfOrder: "",
    description: "",
    outPutFormat: "",
    estimatedDateOfCompletion: "",
    allotedEmployee: "",
    totalAmountInINR: "",
    advanceAmountInINR: "",
    isPaymentCompleted: "paymentCompleted?"
  });
  const handleOnChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const [isloading, setisloading] = useState(false);

  return isLoading ? (
    <Loading />
  ) : (
    <>
      {isloading && <Loading />}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="EditorCreateOrder d-flex justify-content-center align-items-center"
      >
        <div className="col-md-10 my-5 bg-light px-4 py-3 rounded">
          <form
            className="d-flex justify-content-ceneter flex-column"
            onSubmit={(e) => {
              e.preventDefault();
              console.log(state);
              EDITOR_CREATE_ORDER({ order: state, setisloading, push });
            }}
          >
            <h2 className="text-center mb-5">
              <u>Create Order</u>
            </h2>
            <div className="d-flex flex-wrap justify-content-center">
              <div className="col-md-6">
                {" "}
                <div className="input-group mb-2">
                  <select
                    required
                    name="customerId"
                    onChange={handleOnChange}
                    defaultValue={state.customerId}
                    className="custom-select"
                    id="Client"
                    aria-label="Example select with button addon"
                  >
                    <option value="chooseCustomer" disabled>
                      Choose Customer
                    </option>
                    {data.data.data.customers.map((customer) => (
                      <option key={customer._id} value={customer._id}>
                        {customer.officeName}
                      </option>
                    ))}
                  </select>
                </div>
                <Input
                  label="Title Of Order"
                  name="titleOfOrder"
                  type="text"
                  value={state.titleOfOrder}
                  handleOnChange={handleOnChange}
                  placeholder="Enter title of order"
                />
                <Input
                  label="Type Of Order"
                  name="typeOfOrder"
                  type="text"
                  value={state.typeOfOrder}
                  handleOnChange={handleOnChange}
                  placeholder="Enter type of order"
                />
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <textarea
                    required
                    className="form-control"
                    name="description"
                    id="description"
                    value={state.description}
                    placeholder="Enter description of order"
                    onChange={handleOnChange}
                    cols=""
                    rows="4"
                  />
                </div>
                <div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="outPutFormat"
                      id="inlineRadio1"
                      value="4k"
                      checked={state.outPutFormat === "4k"}
                      onChange={handleOnChange}
                    />
                    <label className="form-check-label" htmlFor="inlineRadio1">
                      4K
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="outPutFormat"
                      id="inlineRadio2"
                      value="Pendrive"
                      checked={state.outPutFormat === "Pendrive"}
                      onChange={handleOnChange}
                    />
                    <label className="form-check-label" htmlFor="inlineRadio2">
                      Pendrive
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      value="Blu-ray"
                      className="form-check-input"
                      type="radio"
                      name="outPutFormat"
                      id="inlineRadio3"
                      checked={state.outPutFormat === "Blu-ray"}
                      onChange={handleOnChange}
                    />
                    <label className="form-check-label" htmlFor="inlineRadio3">
                      Blu-ray
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      value="HD"
                      className="form-check-input"
                      type="radio"
                      name="outPutFormat"
                      id="inlineRadio3"
                      checked={state.outPutFormat === "HD"}
                      onChange={handleOnChange}
                    />
                    <label className="form-check-label" htmlFor="inlineRadio3">
                      HD
                    </label>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <Input
                  label="Estimated Date Of Completion"
                  name="estimatedDateOfCompletion"
                  type="date"
                  value={state.estimatedDateOfCompletion}
                  handleOnChange={handleOnChange}
                  placeholder="Estimated date of completion"
                />
                <Input
                  label="Alloted Employee"
                  name="allotedEmployee"
                  type="text"
                  value={state.allotedEmployee}
                  handleOnChange={handleOnChange}
                  placeholder="Enter alloted employee"
                />
                <Input
                  label="Total Amount"
                  name="totalAmountInINR"
                  type="number"
                  value={state.totalAmountInINR}
                  handleOnChange={handleOnChange}
                  placeholder="Enter total amount"
                />
                <Input
                  label="Advance Amount"
                  name="advanceAmountInINR"
                  type="number"
                  value={state.advanceAmountInINR}
                  handleOnChange={handleOnChange}
                  placeholder="Enter advance amount"
                />
                <select
                  required
                  name="isPaymentCompleted"
                  onChange={handleOnChange}
                  defaultValue={state.isPaymentCompleted}
                  className="custom-select"
                  id="Client"
                  aria-label="Example select with button addon"
                >
                  <option value="paymentCompleted?" disabled>
                    Payment Completed?
                  </option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
                <br />
                <br />
                <div className="d-flex">
                  <button type="submit" className="btn ml-auto">
                    Create
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </motion.div>
    </>
  );
};

export default EditorCreateOrder;
