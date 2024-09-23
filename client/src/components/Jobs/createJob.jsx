import { Card, Button, Form } from "react-bootstrap";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Job = () => {
  let userData = localStorage.getItem("_user_data");
  userData = userData ? JSON.parse(userData) : {};
  const { _id: userID, name: userName, role: userRole } = userData;

  const [job_name, setJobName] = useState("");
  const [job_description, setJobDescription] = useState("");
  const [job_link, setJobLink] = useState("");
  const [job_deadline, setJobDeadline] = useState("");

  const createJob = async (e) => {
    e.preventDefault();

    if (!job_name || !job_description || !job_link || !job_deadline) {
      alert("Please fill in all fields");
      return;
    }

    const formdata = {
      username: userName,
      userID,
      job_name,
      description: job_description,
      link: job_link,
      job_deadline,
    };

    try {
      const response = await axios.post("/api/job/create-job", formdata);
      console.log("Job created successfully: ", response.data);
      window.location.reload(false);
    } catch (error) {
      console.error("Error creating job: ", error);
    }
  };

  return (
    <>
      <div>
        <div className="row" style={{ justifyContent: "center" }}>
          <Link
            className="btn btn-light my-1"
            to="/jobs"
            style={{ width: "40%", background: "#79db84" }}
          >
            Go Back
          </Link>
        </div>
      </div>
      <div className="row" style={{ minHeight: "100vh" }}>
        <div className="col-4">
          {userRole !== "student" ? (
            <Form
              onSubmit={createJob}
              style={{
                background: "#e6e6e6",
                padding: "15px",
                borderRadius: "10px",
                marginLeft: "20px",
                marginTop: "15px",
                width: "100%",
              }}
            >
              <h3>Create New Job Post</h3>
              <Form.Group className="mb-3" controlId="formBasicTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter title"
                  value={job_name}
                  onChange={(e) => setJobName(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Add description"
                  value={job_description}
                  onChange={(e) => setJobDescription(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicLink">
                <Form.Label>Link</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter link"
                  value={job_link}
                  onChange={(e) => setJobLink(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicDeadline">
                <Form.Label>Deadline</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Enter deadline"
                  value={job_deadline}
                  onChange={(e) => setJobDeadline(e.target.value)}
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          ) : (
            <h4>Students cannot create jobs</h4>
          )}
        </div>
      </div>
    </>
  );
};

export default Job;
