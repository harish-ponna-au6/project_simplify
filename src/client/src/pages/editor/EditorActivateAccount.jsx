import React, { useState } from "react";
import "../../styles/editor/EditorActivateAccount.css";
import Input from "../../components/common/Input";
import { axiosInstance } from "../../httpServices/axiosInstance";
import Loading from "../../components/common/Loading";
import CommonNav from "../../components/common/CommonNav";
import { toast } from "react-toastify";
import { containerVariants } from "../../variants/commonVariants";
import { motion } from "framer-motion";

const EditorActivateAccount = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useState({
    email: "",
    amountInPaise: 1000000,
    currency: "INR",
    amount: ""
  });
  return (
    <>
      {isLoading && <Loading />}
      <CommonNav />
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="EditorActivateAccount d-flex justify-content-center"
      >
        <div className="card mt-5 p-3">
          <h3 className="text-center mb-5">
            <u>Activate Account</u>
          </h3>

          {!state.orderId ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                (async () => {
                  try {
                    setIsLoading(true);
                    const { data } = await axiosInstance.post(
                      "/editor/razorpay-order-create",
                      {
                        email: state.email,
                        amountInPaise: state.amountInPaise,
                        currency: state.currency
                      },
                      { headers: { "Content-Type": "application/json" } }
                    );
                    console.log(data);
                    setIsLoading(false);
                    setState({
                      ...state,
                      amount: data.data.amount,
                      orderId: data.data.orderId
                    });
                    console.log("State", state);
                    console.log("data", data);
                  } catch (error) {
                    setIsLoading(false);
                    console.log("error", error);
                    if (error.response)
                      toast.error(error.response.data.error.message);
                  }
                })();
              }}
            >
              <Input
                label="Email"
                name="email"
                type="email"
                value={state.email}
                handleOnChange={(e) =>
                  setState({ ...state, email: e.target.value })
                }
                placeholder="Enter your email"
              />
              <div className="d-flex justify-content-center">
                <button className="btn">Make Payment</button>
              </div>
            </form>
          ) : (
            <>
              <p>Email : {state.email}</p>
              <p>Amount : {state.amount}</p>
              <p>Order Id : {state.orderId}</p>
              <div className="d-flex justify-content-center">
                <button
                  className="btn"
                  onClick={() => {
                    const checkoutObject = {
                      key: "rzp_test_S4LCNBUEIdWFQb",
                      amount: state.amountInPaise,
                      currency: "INR",
                      name: state.email,
                      order_id: state.orderId,
                      handler: async ({
                        razorpay_order_id,
                        razorpay_payment_id,
                        razorpay_signature
                      }) => {
                        try {
                          await axiosInstance.post(
                            "/editor/razorpay-order-verify",
                            {
                              razorpay_order_id,
                              razorpay_payment_id,
                              razorpay_signature,
                              amount: state.amountInPaise,
                              currency: "INR"
                            }
                          );
                          toast.success("Payment successful");
                          props.history.push("/editor/login");
                        } catch (error) {
                          toast.error(error.response.data.message);
                        }
                      }
                    };
                    const razorpay = new window.Razorpay(checkoutObject);
                    razorpay.open();
                  }}
                >
                  Proceed to Pay
                </button>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </>
  );
};

export default EditorActivateAccount;
