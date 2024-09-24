import React, { useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { closeSideNav } from "../../actions/alert";
import { motion } from "framer-motion";
import { duration } from "moment";

const variants = {
  container: {
    animate: {
      transition: {
        staggerChildren: 0.4,
      },
    },
  },
  card: {
    initial: {
      opacity: 0,
      y: -30,
    },

    animate: {
      opacity: 1,
      transition: {
        duration: 0.6,
      },
      y: 0,
    },
  },
};

const Home = ({ closeSideNav, isAuth }) => {
  useEffect(() => {
    closeSideNav();
  }, []);
  if (isAuth) {
    return <Redirect to="/feed/topic/Placements?search="/>;
  }
  return (
    <section className="landing">
      {/* {console.log("react versionnnnn--" + React.version)} */}
      <motion.div className="hero">
        <motion.div
          className="hero-inner"
          animate="animate"
          initial="initial"
          variants={variants.container}
        >
          <motion.h1 variants={variants.card} className="hero-head">
            IIITA AlumniConnect
          </motion.h1>
          <motion.p variants={variants.card} className="hero-text">
            Create a profile, share and interact <br />
            with your Alumni Network
          </motion.p>
          <motion.div className="auth-buttons" variants={variants.card}>
            <Link
              to="/register"
              className="register"
              style={{ marginRight: "0.5em", scale: "1.2" }}
            >
              <span className="nav-lt">Register</span>
            </Link>
            <Link
              to="/login"
              style={{ marginLeft: "0.5em", scale: "1.2" }}
              className="login"
            >
              <span className="nav-lt">Login</span>
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

Home.propTypes = {
  isAuth: PropTypes.bool,
  closeSideNav: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { closeSideNav })(Home);
