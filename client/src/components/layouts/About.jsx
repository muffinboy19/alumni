import React from "react";
import { motion } from "framer-motion";

const About = () => {
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

  return (
    <React.Fragment>
      {/* Navbar */}
      <motion.div
        className="navbar"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        {/* Include your Navbar component here */}
      </motion.div>

      <motion.div
        className="about-page"
        variants={variants.container}
        initial="initial"
        animate="animate"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          padding: "1rem 1rem",
          marginTop: "-2rem",
          textAlign: "center",
        }}
      >
        {/* About Us heading */}
        <motion.h1
          className="hero-head"
          variants={variants.card}
          style={{
            marginTop: "-1.5rem",
            paddingBottom: "1rem",
          }}
        >
          About Us
        </motion.h1>

        <motion.div
          className="container post-form-container"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            margin: "2rem 0",
            maxWidth: "800px",
          }}
          variants={variants.card}
        >
          <div className="form-header">
            <h5 className="large">Who we are and what we do</h5>
          </div>

          <div
            className="about-content"
            style={{
              lineHeight: "1.6",
              textAlign: "left",
              padding: "1rem",
              maxWidth: "800px",
            }}
          >
            <p>
              Welcome to the Alumni Connect platform. We strive to build a strong
              community that connects students, alumni, and faculty members of IIITA.
              Our mission is to create lasting bonds and offer valuable networking
              opportunities for everyone associated with the institution.
            </p>
            <p>
              Whether you are a student looking for mentorship, an alumnus hoping
              to give back, or a faculty member aiming to keep in touch with past
              students, we aim to facilitate all of these connections through
              our platform.
            </p>
            <p>
              Together, we can build a more collaborative, connected, and impactful
              alumni network.
            </p>
          </div>
        </motion.div>

        {/* Three Cards Section */}
        <motion.div
          className="card-container"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
            marginTop: "2rem",
            gap: "1rem",
            maxWidth: "800px",
          }}
          variants={variants.container}
        >
          {/* Card 1: Our Mission */}
          <motion.div
            className="card"
            style={{
              backgroundColor: "#f7f7f7",
              padding: "2rem",
              borderRadius: "8px",
              width: "250px",
              minHeight: "280px", // Set minimum height to ensure equal sizes
              boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
              border: "2px solid black",
              textAlign: "center",
              flexGrow: 1,
            }}
            variants={variants.card}
          >
            <h3>Our Mission</h3>
            <p>
              We aim to connect alumni and students to build a stronger, more engaged community.
            </p>
          </motion.div>

          {/* Card 2: Our Works */}
          <motion.div
  className="card"
  style={{
    backgroundColor: "#f7f7f7",
    padding: "2rem",
    borderRadius: "8px",
    width: "250px",
    minHeight: "280px", // Set minimum height to ensure equal sizes
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
    border: "2px solid black",
    textAlign: "center",
    flexGrow: 1,
  }}
  variants={variants.card}
>
  <h3>Our Works</h3>
  <ul style={{ textAlign: "left", listStyleType: "disc", paddingLeft: "20px" }}>
    <li>Job Features</li>
    <li>Channel Creation</li>
    <li>Chat System</li>
    <li>Event Management</li>
  </ul>
</motion.div>


          {/* Card 3: How It Works */}
          <motion.div
            className="card"
            style={{
              backgroundColor: "#f7f7f7",
              padding: "2rem",
              borderRadius: "8px",
              width: "250px",
              minHeight: "280px", // Set minimum height to ensure equal sizes
              boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
              border: "2px solid black",
              textAlign: "center",
              flexGrow: 1,
            }}
            variants={variants.card}
          >
            <h3>How It Works</h3>
            <p>
              Alumni and students can register, update their profiles, and connect via our intuitive and user-friendly platform.
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </React.Fragment>
  );
};

export default About;
