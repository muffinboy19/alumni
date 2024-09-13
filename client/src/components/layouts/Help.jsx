import React, { useState } from "react";
import { submitFeedback } from "../../actions/extras";
import { connect } from "react-redux";
import { motion } from "framer-motion";

const Help = ({ submitFeedback }) => {
  const [formInput, setFormInput] = useState({
    name: "",
    email: "",
    role: "student",
    feedback: "",
  });

  const { name, email, role, feedback } = formInput;

  const onChange = (e) =>
    setFormInput({ ...formInput, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    const status = submitFeedback(formInput);
    setTimeout(() => {
      if (status) {
        setFormInput({
          name: "",
          email: "",
          role: "student",
          feedback: "",
        });
      }
    }, 1500);
  };

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
      <motion.div
        className="help-page"
        variants={variants.container}
        initial="initial"
        animate="animate"
      >
        <motion.h1 className="hero-head" variants={variants.card}>
          Help
        </motion.h1>
        <motion.div
          className="container post-form-container"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
          variants={variants.card}
        >
          <div className="form-header">
            <h5 className="large">
              For any queries/feedback, you can fill out this form
            </h5>
          </div>
          <form className="form" onSubmit={(e) => onSubmit(e)}>
            <div className="form-group">
              <input
                type="text"
                name="name"
                value={name}
                id="name"
                placeholder="Name"
                onChange={(e) => onChange(e)}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                placeholder="Email Address"
                onChange={(e) => onChange(e)}
                required
              />
            </div>
            <div className="form-group" style={{ textAlign: "left" }}>
              <p style={{ marginBottom: "5px" }}>Select your role</p>
              <select
                name="role"
                id="role"
                className="form-dropdown"
                value={role}
                onChange={(e) => onChange(e)}
                required
              >
                <option value="student">Student</option>
                <option value="faculty">Faculty</option>
                <option value="alumni">Alumni</option>
              </select>
            </div>
            <div className="form-group">
              <textarea
                name="feedback"
                id="feedback"
                rows="6"
                value={feedback}
                onChange={(e) => onChange(e)}
                required
                placeholder="Enter you message here"
              />
            </div>
            <div className="form-group" style={{ marginBottom: "0" }}>
              <input type="submit" value="Submit" className="btn-primary" />
            </div>
          </form>
        </motion.div>
        {/* <div
          className="container"
          style={{ padding: "2em", alignSelf: "center" }}
        >
          <h5 className="text-primary">Contact us:</h5>
          <div className="help-section help-location-div">
            <i
              className="fas fa-map-marker-alt location-icon"
              aria-hidden="false"
            ></i>
            <p className="contact-info">
              Office of Alumni Affairs Admin Extension-1, IIIT Allahabad,
              Devghat, Jhalwa Prayagraj - 211015 Uttar Pradesh, India
            </p>
          </div>
          <div className="help-section help-mail-div">
            <i className="fa fa-envelope mail-icon"></i>
            <div className="contact-info">
              <p>alumni.coordinator@iiita.ac.in</p>
              <p>alumni.connect@iiita.ac.in</p>
            </div>
          </div>
          <div className="help-section help-phone-div">
            <i className="fa fa-phone phone-icon" aria-hidden="true"></i>
            <div className="contact-info">
              <p>(91) 0532 292 2599/2308</p>
              <p>(91) 7317319062</p>
            </div>
          </div>
        </div> */}
      </motion.div>
    </React.Fragment>
  );
};

export default connect(null, { submitFeedback })(Help);
