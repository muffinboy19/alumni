import { Card, Button } from "react-bootstrap";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Job = () => {
	const [jobData, setJobData] = useState([]);
	const [userInfo, setUserInfo] = useState({});

	useEffect(() => {
		const getData = async () => {
			try {
				console.log("getData function starts here (job page)");
				const { data } = await axios.get("/api/job/get/getjob");
				console.log("Job data received:", data);
				setJobData(data.dt.reverse());
			} catch (error) {
				console.log("Error fetching job data: ", error);
			}
		};

		getData();
	}, []);

	useEffect(() => {
		const userData = localStorage.getItem("_user_data");
		console.log("User data from localStorage:", userData);

		// Safely parse userData
		if (userData) {
			try {
				const parsedData = JSON.parse(userData);
				setUserInfo(parsedData);
			} catch (error) {
				console.error("Error parsing user data:", error);
			}
		}
	}, []);

	const { _id: userID, name: userName, role: userRole } = userInfo;

	const deleteJob = async (jobID) => {
		const sendData = {
			userID,
			userRole,
			jobID,
		};

		try {
			const { data } = await axios.post("/api/job/deletejob", sendData);
			if (data.invalid_msg === "invalid") {
				alert("Invalid action");
			} else {
				setJobData(jobData.filter((job) => job._id !== jobID));
			}
		} catch (error) {
			console.error("Error deleting job: ", error);
		}
	};

	const generateLink = (link) => `/profile/${link}`;

	return (
		<>
			<div style={{ display: "flex", justifyContent: "center" }}>
				<div
					className="row"
					style={{
						display: "flex",
						justifyContent: "center",
						marginRight: "30px",
						backgroundColor: "#f8f9fa",
						borderColor: "#f8f9fa",
					}}
				>
					<Link className="btn my-1" to="/archiveJobs">
						Archive Jobs
					</Link>
				</div>
				{userRole !== "student" ? (
					<div
						className="row"
						style={{
							justifyContent: "center",
							backgroundColor: "#f8f9fa",
							borderColor: "#f8f9fa",
						}}
					>
						<Link className="btn my-1" to="/createjob">
							Create Jobs
						</Link>
					</div>
				) : null}
			</div>

			<div className="row" style={{ minHeight: "100vh" }}>
				<div
					className="col"
					style={{
						overflowY: "scroll",
						display: "flex",
						flexDirection: "wrap",
						alignItems: "baseline",
						justifyContent: "space-evenly",
						flexWrap: "wrap",
					}}
				>
					{jobData.map((ele) => (
						<Card
							key={ele._id}
							style={{ width: "35%", margin: "15px", height: "auto" }}
						>
							<Card.Body>
								<div
									style={{ display: "flex", justifyContent: "space-between" }}
								>
									<Card.Text>
										<a
											style={{ fontWeight: "900" }}
											href={generateLink(ele.userID)}
											target="_blank"
											rel="noopener noreferrer"
										>
											{ele.created_by_user}
										</a>
									</Card.Text>
									<Card.Text style={{ fontSize: "10px" }}>
										Created at - {ele.Job_post_date.slice(0, 10)}
									</Card.Text>
								</div>

								<Card.Title>{ele.Job_name}</Card.Title>
								<Card.Text>{ele.Description}</Card.Text>
								<Card.Text>
									Deadline - {ele.Job_deadline.slice(0, 10)}
								</Card.Text>

								<div
									className="row"
									style={{ display: "flex", justifyContent: "space-evenly" }}
								>
									<div className="col">
										<Card.Text>
											<Button>
												<a
													href={ele.Link}
													target="_blank"
													rel="noopener noreferrer"
													style={{ color: "white" }}
												>
													Apply here
												</a>
											</Button>
										</Card.Text>
									</div>

									<div className="col">
										<Card.Text>
											{ele.created_by_user === userName ||
											userRole === "Admin" ? (
												<Button
													onClick={() => deleteJob(ele._id)}
													variant="danger"
												>
													Delete
												</Button>
											) : null}
										</Card.Text>
									</div>
								</div>
							</Card.Body>
						</Card>
					))}
				</div>
			</div>
		</>
	);
};

export default Job;
