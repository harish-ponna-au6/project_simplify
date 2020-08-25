import React, { useState } from "react";
import { useQuery } from "react-query";
import { axiosInstance } from "../../httpServices/axiosInstance";
import Loading from "./Loading";
import "../../styles/common/Profile.css";
import Input from "./Input";
import { CHANGE_PASSWORD } from "../../redux/actions/commonActions";
import { motion } from "framer-motion";
import { containerVariants } from "../../variants/commonVariants";

const fetching = async (route) =>
  await axiosInstance(route, {
    headers: {
      Authorization: JSON.parse(localStorage.getItem("user")).jwt
    }
  });

const Profile = (props) => {
  const { route, userType } = props;
  const [state, setState] = useState({ currentPassword: "", newPassword: "" });
  const [isloading, setisloading] = useState(false);
  const handleOnChange = (e) =>
    setState({ ...state, [e.target.name]: e.target.value });
  const { data, isLoading, error } = useQuery(route, () => fetching(route));

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
          className="Profile mt-5 d-flex flex-wrap justify-content-around"
        >
          <div className="card p-4 m-3">
            <p>Name : {data.data.data.user.name}</p>
            <p>Office Name : {data.data.data.user.officeName}</p>
            <p>Mobile : {data.data.data.user.mobile}</p>
            <p>Email : {data.data.data.user.email}</p>
            <p>Address : {data.data.data.user.address}</p>
          </div>
          <div className="card m-3 p-4">
            <h5 className="text-center mb-4">
              <u>Update Password ?</u>
            </h5>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const changePasswordRoute = `/${userType}/change-password`;

                CHANGE_PASSWORD({ state, changePasswordRoute, setisloading });
                setState({ currentPassword: "", newPassword: "" });
              }}
            >
              <Input
                label="Current Password"
                name="currentPassword"
                type="password"
                value={state.oldPassword}
                handleOnChange={handleOnChange}
                placeholder="Enter your current password"
              />
              <Input
                label="New Password"
                name="newPassword"
                type="password"
                value={state.newPassword}
                handleOnChange={handleOnChange}
                placeholder="Enter your new password"
              />
              <button type="submit" className="btn">
                Update Password
              </button>
            </form>
          </div>
        </motion.div>
      </>
    );
  }
};
export default Profile;
