import React from "react";
import "../styles/Landing.css";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { motion } from "framer-motion";
import {
  carouselVariants,
  usersVariants,
  containerVariants,
  welcomeVariants,
  aboutVariants
} from "../variants/landingVariants";

const CheckingUser = (user) => {
  if (!user.isLoggedIn) return;
  if (user.role === "editor") return <Redirect to="/editor/home" />;
  if (user.role === "customer") return <Redirect to="/customer/home" />;
  if (user.role === "admin") return <Redirect to="/admin/home" />;
};

const Landing = (props) => {
  const { user } = props;
  return (
    <>
      {CheckingUser(user)}
      <motion.div
        className="Landing"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="row d-flex justify-content-center mt-4">
          <div className="col d-flex justify-content-center align-items-center">
            <motion.h2
              variants={welcomeVariants}
              className="text-center welcome-message"
            >
              WELCOME TO SIMPLIFY. <br />
              WE HELP TO SMOOTHEN YOUR WORK
            </motion.h2>
          </div>
        </div>
        <div className="row d-flex justify-content-around align-items-center">
          <motion.div variants={carouselVariants} className="col-md-6 col-lg-5">
            <div
              id="carouselExampleCaptions"
              className="carousel slide"
              data-ride="carousel"
            >
              <ol className="carousel-indicators">
                <li
                  data-target="#carouselExampleCaptions"
                  data-slide-to="0"
                  className="active"
                ></li>
                <li
                  data-target="#carouselExampleCaptions"
                  data-slide-to="1"
                ></li>
                <li
                  data-target="#carouselExampleCaptions"
                  data-slide-to="2"
                ></li>
              </ol>
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img
                    src="/images/image1.png"
                    className="d-block w-100 image1"
                    alt="..."
                  />
                  <div className="carousel-caption d-none d-md-block ">
                    <p>Manage your orders and track easily.</p>
                  </div>
                </div>
                <div className="carousel-item">
                  <img
                    src="/images/image2.png"
                    className="d-block w-100  image2"
                    alt="..."
                  />
                  <div className="carousel-caption d-none d-md-block">
                    {/* <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p> */}
                  </div>
                </div>
                <div className="carousel-item">
                  <img
                    src="/images/image3.png"
                    className="d-block w-100 image3"
                    alt="..."
                  />
                  <div className="carousel-caption d-none d-md-block">
                    {/* <p>
                      Praesent commodo cursus magna, vel scelerisque nisl
                      consectetur.
                    </p> */}
                  </div>
                </div>
              </div>
              <a
                className="carousel-control-prev"
                href="#carouselExampleCaptions"
                role="button"
                data-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="sr-only">Previous</span>
              </a>
              <a
                className="carousel-control-next"
                href="#carouselExampleCaptions"
                role="button"
                data-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="sr-only">Next</span>
              </a>
            </div>
          </motion.div>
          <motion.div
            className="col-md-6 col-lg-5 text-center users "
            variants={usersVariants}
          >
            <div className="d-flex my-5 rounded  user">
              <div className="col-5  py-2 text-light">Admin</div>
              <div className="col-7 bg-white py-2">
                <Link to="/admin/login">Login</Link>
              </div>
            </div>
            <div className="d-flex my-5 user">
              <div className="col-5  py-2 text-light">Editor</div>
              <div className="col-7 bg-white py-2 d-flex justify-content-around">
                <Link to="/editor/register">Register</Link>
                <Link to="/editor/login">Login</Link>
              </div>
            </div>
            <div className="d-flex my-5 user">
              <div className="col-5  py-2 text-light">Customer</div>
              <div className="col-7 bg-white py-2">
                <Link to="/customer/login">Login</Link>
              </div>
            </div>
          </motion.div>
        </div>
        <div className="row d-flex justify-content-center">
          <motion.div
            variants={aboutVariants}
            className="col-10 col-md-6  rounded text-justify px-5 py-4 text-light about"
          >
            A place where editors(graphic designeers) can manage their work with easy clicks. Create and
            update orders in a snap of time. Track the orders statuses without any
            hastle. Maintain records of orders for fututre references. Interact
            with customers for more productivity and keeping them updated.
          </motion.div>
        </div>
        <div className="login_credentials d-none d-md-block">
          <p className="text-center">
            <u> Editor Login</u>
          </p>
          <p>Email: public@gmail.com</p>
          <p>Password: 123456</p>
          <motion.div drag className="drag">
            Drag Me!
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

const user = (state) => ({ user: state.commonState.user });

export default connect(user, null)(Landing);
