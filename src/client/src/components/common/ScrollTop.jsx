import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useViewportScroll } from "framer-motion";
import "../../styles/common/ScrollTop.css";

const ScrollTop = () => {
  const [visibility, setVisibility] = useState(false);
  const { scrollYProgress } = useViewportScroll();
  useEffect(() => {
    scrollYProgress.onChange(() => {
      window.pageYOffset > 300 ? setVisibility(true) : setVisibility(false);
    });
  }, [scrollYProgress]);

  return (
    <>
      {visibility && (
        <motion.div
          animate={{
            y: [-20, 0],
            transition: {
              y: { yoyo: Infinity, duration: 1, ease: "easeIn" }
            }
          }}
          className="scroll-top"
        >
          <Link to="#" onClick={() => window.scrollTo(0, 0)}>
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="arrow-circle-up"
              className="svg-inline--fa fa-arrow-circle-up fa-w-16"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M8 256C8 119 119 8 256 8s248 111 248 248-111 248-248 248S8 393 8 256zm143.6 28.9l72.4-75.5V392c0 13.3 10.7 24 24 24h16c13.3 0 24-10.7 24-24V209.4l72.4 75.5c9.3 9.7 24.8 9.9 34.3.4l10.9-11c9.4-9.4 9.4-24.6 0-33.9L273 107.7c-9.4-9.4-24.6-9.4-33.9 0L106.3 240.4c-9.4 9.4-9.4 24.6 0 33.9l10.9 11c9.6 9.5 25.1 9.3 34.4-.4z"
              ></path>
            </svg>
          </Link>
        </motion.div>
      )}
    </>
  );
};

export default ScrollTop;
