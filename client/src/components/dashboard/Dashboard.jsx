import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layouts/Spinner.jsx";
import Experience from "./Experience";
import { getCurrentUserProfile } from "../../actions/users";
import { closeSideNav } from "../../actions/alert";
import DashboardActions from "./DashboardActions";
import Education from "./Education.jsx";
import { Border } from "react-bootstrap-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const Dashboard = ({ closeSideNav, auth: { authUser, loadingAuth } }) => {
  useEffect(() => {
    closeSideNav();
  }, [getCurrentUserProfile]);
  // console.log("user = ", authUser)
  //  console.log(authUser)

  return loadingAuth || authUser === null ? (
    <Spinner />
  ) : (
    <React.Fragment>
      <div className="head-area">
        <h1 className="large text-primary">Dashboard</h1>
        <p className="lead">
          <i className="fas fa-user" />
          Welcome {authUser && authUser.name}
        </p>
      </div>
      {authUser !== null ? (
        <div className="row">
          <div className="col-md-3">
            <DashboardActions />
          </div>
          <div className="col-md-9">
            <div
              className="row"
              style={{ padding: "1em 1em", margin: "1em 2em" }}
            >
              <div className="profile-image float-md-right">
              {
                  authUser.images && authUser.images.length > 0 &&
                  <img
                  key={authUser.images[0]}
                  alt="uploaded_image"
                  src={`http://localhost:5000/awards/${authUser.images[0]}`}
                        style={{
                          maxHeight: "100px",
                          maxWidth: "100px",
                          borderRadius: "50%",
                          border:"1px solid black",
                          objectFit:"cover"

                        }}
                        ></img>
              }
              </div>
              <div>
                <p>
                  <span
                    style={{
                      fontSize: "1.5rem",
                      paddingLeft: "0.5em",
                      paddingRight: "0.5em",
                      marginLeft: "1em",
                    }}
                  >
                    {authUser.name}
                  </span>
                </p>
                <p>
                  <span
                    className="job_post"
                    style={{
                      fontSize: "1.5rem",
                      paddingLeft: "0.5em",
                      paddingRight: "0.5em",
                      marginLeft: "1em",
                      float: "right",
                    }}
                  >
                    {authUser.role === "alumni" && (
                      <span
                        style={{
                          textTransform: "capitalize",
                        }}
                      >
                        <div>
                        {authUser.designation}
                        {" @ "}
                        {authUser.organisation}
                        {" "} {authUser.location}
                        </div>
                      </span>
                    )}

                    {authUser.role === "student" && "Student @ IIITA"}

                    {authUser.role === "faculty" && (
                      <span
                        style={{
                          textTransform: "capitalize",
                        }}
                      >
                        {authUser.designation}
                      </span>
                    )}

                    {authUser.role === "faculty" && "@ Department of "}

                    {authUser.role === "faculty" && (
                      <span
                        style={{
                          textTransform: "uppercase",
                        }}
                      >
                        {authUser.department}
                      </span>
                    )}
                  </span>

                  {authUser.role === "student" && (
                    <p>
                      {authUser.starting_year}-{authUser.passing_year}
                    </p>
                  )}

                  {authUser.role === "alumni" && (
                    <div>
                      {/* <p style={{ marginBottom: "0" }}>{authUser.location}</p> */}
                      <br/>
                      <p>
                        {"Alumni @ IIITA"}
                        {" ( "}
                        {authUser.passing_year}
                        {" Passout )"}
                      </p>
                    </div>
                  )}
                </p>
              </div>
            </div>
              <div>
                <h2>About</h2>
                <p>{authUser.bio}</p>
                <p>{authUser.website}</p>
                <div>
                  <h6>Skills :- </h6>
                  {
                    authUser.skills && 
                    authUser.skills.map((ele)=>{
                      return(
                      <button>{ele}</button>)
                    })
                  }
                </div>

                <div>
                <i className="fa fa-instagram" aria-hidden="false" style={{ fontSize: "15px" }}></i>
                <i className="fa fa-facebook-official" aria-hidden="true"></i>
                
                </div>
                
              </div>

            <Experience experience={authUser.experience} />
            <Education education={authUser.education} />
          </div>
        </div>
      ) : (
        <React.Fragment>
          <p>You have not created a profile yet</p>
          <Link className="btn btn-primary my-1" to="/create-profile">
            Create Profile
          </Link>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentUserProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  closeSideNav: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getCurrentUserProfile,
  closeSideNav,
})(Dashboard);
