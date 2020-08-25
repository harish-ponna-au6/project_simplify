import React from "react";
import { useQuery } from "react-query";
import { axiosInstance } from "../../httpServices/axiosInstance";
import Loading from "./Loading";
import { Link } from "react-router-dom";
import { EDITOR_REMOVE_CLIENT } from "../../redux/actions/editorActions";
import "../../styles/common/ClientsOrEditors.css";

const fetching = async (route) =>
  await axiosInstance(route, {
    headers: { Authorization: JSON.parse(localStorage.getItem("user")).jwt }
  });

const ClientsOrEditors = (props) => {
  const { route, userType } = props;
  const { data, isLoading, error } = useQuery(route, () => fetching(route));
  if (isLoading) return <Loading />;

  if (error) console.log(error.response);
  if (data) {
    const users = data.data.data.customers || data.data.data.editors;
    return (
      <div className="ClientsOrEditors d-flex flex-wrap justify-content-center align-items-center">
        {users.length === 0 ? (
          <h2 className="text-center mt-5">No Results Found</h2>
        ) : (
          users.map((user) => (
            <div key={user._id} className="card p-4 m-4">
              <p>Name : {user.name}</p>
              <p>Office Name : {user.officeName}</p>
              <p>Mobile : {user.mobile}</p>
              <p>Email : {user.email}</p>
              <p>address : {user.address}</p>
              {userType === "editor" ? (
                <>
                  <Link
                    className="btn"
                    to={`/editor/customer-orders/${user._id}`}
                  >
                    View Orders
                  </Link>
                  <br />
                  <Link
                    className="btn"
                    onClick={(e) => {
                      EDITOR_REMOVE_CLIENT({ customerId: user._id });
                    }}
                    to="#"
                  >
                    Remove Client
                  </Link>
                </>
              ) : null}
            </div>
          ))
        )}
      </div>
    );
  }
};

export default ClientsOrEditors;
