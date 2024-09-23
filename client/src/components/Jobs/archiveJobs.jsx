import { Card, Button, Form } from "react-bootstrap";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Job = () => {
  const [ArchiveJobData, setArchiveJobData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get("/api/job/get/getjob");
        const DataArchive = response.data.archive.reverse();
        setArchiveJobData(DataArchive);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getData();
  }, []);

  let userData = localStorage.getItem("_user_data");
  userData = userData ? JSON.parse(userData) : {};
  const { _id: userID, name: userName, role: userRole } = userData;

  const deleteJob = async (e) => {
    e.preventDefault();
    const jobID = e.target.jobid.value;

    try {
      const senddata = {
        userID,
        userRole,
        jobID,
      };

      const response = await axios.post("/api/job/deletejob", senddata);
      if (response.data.invalid_msg === "invalid") {
        alert("Invalid action");
      } else {
        window.location.reload(false);
      }
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  const generateLink = (link) => `/profile/${link}`;

  return (
    <div className="row" style={{ minHeight: "100vh" }}>
      {ArchiveJobData.map((job) => (
        <Card key={job._id} style={{ width: "35%", margin: "15px", height: "auto" }}>
          <Card.Body>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Card.Text>
                <a
                  style={{ fontWeight: "900" }}
                  href={generateLink(job.userID)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {job.created_by_user}
                </a>
              </Card.Text>
              <Card.Text style={{ fontSize: "10px" }}>
                Created at - {job.Job_post_date.slice(0, 10)}
              </Card.Text>
            </div>
            <Card.Title>{job.Job_name}</Card.Title>
            <Card.Text>{job.Description}</Card.Text>
            <Card.Text>Deadline - {job.Job_deadline.slice(0, 10)}</Card.Text>
            <div className="row" style={{ display: "flex", justifyContent: "space-evenly" }}>
              <div className="col">
                <Button>
                  <a
                    href={job.Link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "white" }}
                  >
                    Apply here
                  </a>
                </Button>
              </div>
              {(job.created_by_user === userName || userRole === "Admin") && (
                <div className="col">
                  <form onSubmit={deleteJob}>
                    <Button type="submit" name="jobid" variant="danger" value={job._id}>
                      Delete
                    </Button>
                  </form>
                </div>
              )}
            </div>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default Job;
