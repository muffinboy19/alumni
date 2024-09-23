// import React from "react";
// import { connect } from "react-redux";
// import Moment from "react-moment";
// import PropTypes from "prop-types";
// import { deleteEducation } from "../../actions/users";

// const Education = ({ education, deleteEducation }) => {
// 	const educations = education.map((edu) => (
// 		<div className="row education-card" key={edu._id}>
// 			<div className="col-md-10">
// 				<h3 className="text-dark">{edu.school}</h3>
// 				<p>
// 					<Moment format="DD/MM/YYYY">{edu.from}</Moment> --{" "}
// 					{edu.current ? (
// 						"Now"
// 					) : (
// 						<Moment format="DD/MM/YYYY">{edu.to}</Moment>
// 					)}
// 				</p>
// 				<p>
// 					<strong>Degree:</strong> {edu.degree}
// 				</p>
// 				<p>
// 					<strong>Field of Study:</strong> {edu.fieldofstudy}
// 				</p>
// 				<p>
// 					<strong>Description:</strong> {edu.description}
// 				</p>
// 			</div>
// 			<div className="col-md-2">
// 				<button
// 					className="btn btn-danger"
// 					onClick={() => {
// 						deleteEducation(edu._id);
// 					}}
// 				>
// 					Delete
// 				</button>
// 			</div>
// 		</div>
// 	));

// 	return (
// 		<React.Fragment>
// 			<h2 className="my-2" style={{ textAlign: "center" }}>
// 				Education
// 			</h2>
// 			<div className="education-list">
// 				{education.length > 0 ? (
// 					educations
// 				) : (
// 					<div style={{ textAlign: "center" }}>
// 						You have not added any education yet
// 					</div>
// 				)}
// 			</div>
// 		</React.Fragment>
// 	);
// };

// Education.propTypes = {
// 	education: PropTypes.array.isRequired,
// 	deleteEducation: PropTypes.func.isRequired,
// };

// export default connect(null, { deleteEducation })(Education);

// import React from "react";
// import { connect } from "react-redux";
// import Moment from "react-moment";
// import PropTypes from "prop-types";
// import { deleteEducation } from "../../actions/users";

// const Education = ({ education = [], deleteEducation }) => {
// 	const educations = education.map((edu) => (
// 		<div className="row education-card" key={edu._id}>
// 			<div className="col-md-10">
// 				<h3 className="text-dark">{edu.school}</h3>
// 				<p>
// 					<Moment format="DD/MM/YYYY">{edu.from}</Moment> --{" "}
// 					{edu.current ? (
// 						"Now"
// 					) : (
// 						<Moment format="DD/MM/YYYY">{edu.to}</Moment>
// 					)}
// 				</p>
// 				<p>
// 					<strong>Degree:</strong> {edu.degree}
// 				</p>
// 				<p>
// 					<strong>Field of Study:</strong> {edu.fieldofstudy}
// 				</p>
// 				<p>
// 					<strong>Description:</strong> {edu.description}
// 				</p>
// 			</div>
// 			<div className="col-md-2">
// 				<button
// 					className="btn btn-danger"
// 					onClick={() => {
// 						deleteEducation(edu._id);
// 					}}
// 				>
// 					Delete
// 				</button>
// 			</div>
// 		</div>
// 	));

// 	return (
// 		<React.Fragment>
// 			<h2 className="my-2" style={{ textAlign: "center" }}>
// 				Education
// 			</h2>
// 			<div className="education-list">
// 				{education.length > 0 ? (
// 					educations
// 				) : (
// 					<div style={{ textAlign: "center" }}>
// 						You have not added any education yet
// 					</div>
// 				)}
// 			</div>
// 		</React.Fragment>
// 	);
// };

// Education.propTypes = {
// 	education: PropTypes.array.isRequired,
// 	deleteEducation: PropTypes.func.isRequired,
// };

// export default connect(null, { deleteEducation })(Education);

import React from "react";
import { connect } from "react-redux";
import Moment from "react-moment";
import PropTypes from "prop-types";
import { deleteEducation } from "../../actions/users";

const Education = ({ education = [], deleteEducation }) => {
    // Retrieve user data from local storage
    let userData = localStorage.getItem("_user_data");
    console.log("Raw user data from localStorage:", userData);

    // Parse userData and extract education, default to an empty array
    userData = userData ? JSON.parse(userData) : {};
    const localStorageEducation = userData.education || [];

    // Use either the education prop or fallback to localStorage education
    const validEducation = Array.isArray(education) && education.length > 0 
        ? education 
        : localStorageEducation;

    const educations = validEducation.map((edu) => (
        <div className="row education-card" key={edu._id}>
            <div className="col-md-10">
                <h3 className="text-dark">{edu.school}</h3>
                <p>
                    <Moment format="DD/MM/YYYY">{edu.from}</Moment> --{" "}
                    {edu.current ? (
                        "Now"
                    ) : (
                        <Moment format="DD/MM/YYYY">{edu.to}</Moment>
                    )}
                </p>
                <p>
                    <strong>Degree:</strong> {edu.degree}
                </p>
                <p>
                    <strong>Field of Study:</strong> {edu.fieldofstudy}
                </p>
                <p>
                    <strong>Description:</strong> {edu.description}
                </p>
            </div>
            <div className="col-md-2">
                <button
                    className="btn btn-danger"
                    onClick={() => {
                        deleteEducation(edu._id);
                    }}
                >
                    Delete
                </button>
            </div>
        </div>
    ));

    return (
        <React.Fragment>
            <h2 className="my-2" style={{ textAlign: "center" }}>Education</h2>
            <div className="education-list">
                {validEducation.length > 0 ? educations : (
                    <div style={{ textAlign: "center" }}>You have not added any education yet</div>
                )}
            </div>
        </React.Fragment>
    );
};

Education.propTypes = {
    education: PropTypes.array.isRequired,
    deleteEducation: PropTypes.func.isRequired,
};

export default connect(null, { deleteEducation })(Education);
