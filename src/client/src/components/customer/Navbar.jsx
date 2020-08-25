import React, { useState } from "react";
import "../../styles/common/Navbar.css";
import { Link, withRouter } from "react-router-dom";
import ScrollTop from "../common/ScrollTop";
import { connect } from "react-redux";
import { LOGOUT, IS_LOADING } from "../../redux/actions/commonActions";
import { navVariants } from "../../variants/commonVariants";
import { motion } from "framer-motion";

const Navbar = (props) => {
  const {
    user,
    LOGOUT,
    IS_LOADING,
    history: { push }
  } = props;
  const [state, setState] = useState({ order: "", client: "" });
  return user.role === "customer" ? (
    <>
      <motion.nav
        id="nav"
        variants={navVariants}
        initial="hidden"
        animate="visible"
        className="navbar navbar-expand-lg navbar-dark px-4"
      >
        <Link className="navbar-brand" to="#">
          Simplify
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/customer/home">
                Home <span className="sr-only">(current)</span>
              </Link>
            </li>
          </ul>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (state.order === "") return;
              push(
                `/customer/search/orders-by-title?titleOfOrder=${state.order}`
              );
              setState({ order: "", client: "" });
            }}
            className="form-inline my-2 my-lg-0"
          >
            <input
              onChange={(e) => setState({ ...state, order: e.target.value })}
              value={state.order}
              className="form-control mr-sm-2 "
              type="search"
              placeholder="Search Orders(title)"
              aria-label="Search Orders"
            />
          </form>

          <div className="btn-group account" role="group">
            <button
              id="btnGroupDrop1"
              type="button"
              className="btn btn-secondary dropdown-toggle"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="user-circle"
                className="svg-inline--fa fa-user-circle fa-w-16"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 496 512"
                height="25"
                width="25"
              >
                <path
                  fill="currentColor"
                  d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 96c48.6 0 88 39.4 88 88s-39.4 88-88 88-88-39.4-88-88 39.4-88 88-88zm0 344c-58.7 0-111.3-26.6-146.5-68.2 18.8-35.4 55.6-59.8 98.5-59.8 2.4 0 4.8.4 7.1 1.1 13 4.2 26.6 6.9 40.9 6.9 14.3 0 28-2.7 40.9-6.9 2.3-.7 4.7-1.1 7.1-1.1 42.9 0 79.7 24.4 98.5 59.8C359.3 421.4 306.7 448 248 448z"
                ></path>
              </svg>
              {user.name}
            </button>
            <div className="dropdown-menu" aria-labelledby="btnGroupDrop1">
              <Link className="dropdown-item" to="/customer/profile">
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="far"
                  data-icon="id-card"
                  className="svg-inline--fa fa-id-card fa-w-18"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 576 512"
                  height="25"
                  width="25"
                >
                  <path
                    fill="currentColor"
                    d="M528 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h480c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm0 400H303.2c.9-4.5.8 3.6.8-22.4 0-31.8-30.1-57.6-67.2-57.6-10.8 0-18.7 8-44.8 8-26.9 0-33.4-8-44.8-8-37.1 0-67.2 25.8-67.2 57.6 0 26-.2 17.9.8 22.4H48V144h480v288zm-168-80h112c4.4 0 8-3.6 8-8v-16c0-4.4-3.6-8-8-8H360c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8zm0-64h112c4.4 0 8-3.6 8-8v-16c0-4.4-3.6-8-8-8H360c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8zm0-64h112c4.4 0 8-3.6 8-8v-16c0-4.4-3.6-8-8-8H360c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8zm-168 96c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64z"
                  ></path>
                </svg>
                Profile
              </Link>
              <Link
                className="dropdown-item"
                to="#"
                onClick={() => {
                  LOGOUT({ route: "/customer/logout", IS_LOADING, push });
                }}
              >
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="sign-out-alt"
                  className="svg-inline--fa fa-sign-out-alt fa-w-16"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  height="25"
                  width="25"
                >
                  <path
                    fill="currentColor"
                    d="M497 273L329 441c-15 15-41 4.5-41-17v-96H152c-13.3 0-24-10.7-24-24v-96c0-13.3 10.7-24 24-24h136V88c0-21.4 25.9-32 41-17l168 168c9.3 9.4 9.3 24.6 0 34zM192 436v-40c0-6.6-5.4-12-12-12H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h84c6.6 0 12-5.4 12-12V76c0-6.6-5.4-12-12-12H96c-53 0-96 43-96 96v192c0 53 43 96 96 96h84c6.6 0 12-5.4 12-12z"
                  ></path>
                </svg>
                Logout
              </Link>
            </div>
          </div>
        </div>
      </motion.nav>
      <ScrollTop />
    </>
  ) : null;
};

const user = (state) => ({ user: state.commonState.user });

export default connect(user, { LOGOUT, IS_LOADING })(withRouter(Navbar));
