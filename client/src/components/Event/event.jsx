// import { Card, Button } from "react-bootstrap";
// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// const Event = () => {
//   const [eventData, setEventData] = useState([]);
//   const [userInfo, setUserInfo] = useState({});

//   useEffect(() => {
//     const getData = async () => {
//       try {
//         const response = await axios.get("/api/event/get/getevent");
//         const eventData = response.data.reverse();
//         setEventData(eventData);
//       } catch (err) {
//         console.log(err);
//       }
//     };

//     getData();
//   }, []);

//   useEffect(() => {
//     const userData = localStorage.getItem("_user_data");
//     if (userData) {
//       try {
//         const parsedData = JSON.parse(userData);
//         setUserInfo(parsedData);
//       } catch (error) {
//         console.error("Error parsing user data:", error.message);
//       }
//     } else {
//       console.warn("No user data found in localStorage.");
//     }
//   }, []);

//   const { _id: userID, name: userName, role: userRole } = userInfo;

//   const [eventName, setEventName] = useState("");
//   const [eventDescription, setEventDescription] = useState("");
//   const [eventLink, setEventLink] = useState("");

//   const createEvent = async (e) => {
//     e.preventDefault();

//     const formData = {
//       username: userName,
//       userID: userID,
//       event_name: eventName,
//       description: eventDescription,
//       link: eventLink,
//     };

//     try {
//       const response = await axios.post("/api/event/create-event", formData);
//       console.log("Data saved from frontend", response);
//       window.location.reload(false);
//     } catch (error) {
//       console.error("Error creating event:", error);
//     }
//   };

//   const deleteEvent = async (e) => {
//     e.preventDefault();
//     const sendData = {
//       userID,
//       userRole,
//       eventID: e.target.eventid.value,
//     };

//     try {
//       const response = await axios.post("/api/event/deleteevent", sendData);
//       console.log(response.data.invalid_msg);
//       if (response.data.invalid_msg === "invalid") {
//         alert("Invalid action");
//       } else {
//         window.location.reload(false);
//       }
//     } catch (error) {
//       console.error("Error deleting event:", error);
//     }
//   };

//   const generateLink = (link) => `/profile/${link}`;

//   return (
//     <div>
//       <div className="row" style={{ justifyContent: "center" }}>
//         {userRole === "Admin" && (
//           <Link
//             className="btn btn-light my-1"
//             to="/createEvent"
//             style={{ width: "40%", background: "#79db84" }}
//           >
//             Create New Event
//           </Link>
//         )}
//       </div>

//       <div
//         className="row"
//         style={{
//           overflowY: "scroll",
//           display: "flex",
//           flexDirection: "wrap",
//           alignItems: "baseline",
//           justifyContent: "space-evenly",
//           flexWrap: "wrap",
//         }}
//       >
//         <div className="col">
//           <h1 style={{ textAlign: "center" }}>EVENTS</h1>
//           {eventData.map((ele) => (
//             <div className="row" style={{ justifyContent: "center" }} key={ele._id}>
//               <Card style={{ width: "65%", margin: "15px", height: "auto" }}>
//                 <Card.Body>
//                   <div style={{ display: "flex", justifyContent: "space-between" }}>
//                     <Card.Title style={{ fontSize: "50px" }}>{ele.title}</Card.Title>
//                     <Card.Text>
//                       Created at - {ele.Event_post_date.slice(0, 10)}
//                     </Card.Text>
//                   </div>
//                   <Card.Text>{ele.Description}</Card.Text>
//                   <div className="row" style={{ display: "flex", justifyContent: "space-evenly" }}>
//                     <div className="col" style={{ display: "flex" }}>
//                       <Card.Text style={{ marginRight: "50px" }}>
//                         <Button style={{ padding: "8px" }}>
//                           <a href={ele.Link} target="_blank" style={{ color: "white" }}>
//                             Join Here
//                           </a>
//                         </Button>
//                       </Card.Text>

//                       {userRole === "Admin" && (
//                         <Card.Text>
//                           <form onSubmit={deleteEvent}>
//                             <Button
//                               style={{ padding: "8px" }}
//                               type="submit"
//                               name="eventid"
//                               variant="danger"
//                               value={ele._id}
//                             >
//                               Delete
//                             </Button>
//                           </form>
//                         </Card.Text>
//                       )}
//                     </div>
//                   </div>
//                 </Card.Body>
//               </Card>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Event;

import { Card, Button } from "react-bootstrap";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Event = () => {
  const [eventData, setEventData] = useState([]);
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get("/api/event/get/getevent");
        const eventData = response.data.reverse();
        setEventData(eventData);
      } catch (err) {
        console.log(err);
      }
    };

    getData();
  }, []);

  useEffect(() => {
    const userData = localStorage.getItem("_user_data");
    if (userData) {
      try {
        const parsedData = JSON.parse(userData);
        setUserInfo(parsedData);
      } catch (error) {
        console.error("Error parsing user data:", error.message);
      }
    } else {
      console.warn("No user data found in localStorage.");
    }
  }, []);

  const { _id: userID, name: userName, role: userRole } = userInfo;

  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventLink, setEventLink] = useState("");

  const createEvent = async (e) => {
    e.preventDefault();

    const formData = {
      username: userName,
      userID: userID,
      event_name: eventName,
      description: eventDescription,
      link: eventLink,
    };

    try {
      const response = await axios.post("/api/event/create-event", formData);
      console.log("Data saved from frontend", response);
      window.location.reload(false);
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  const deleteEvent = async (e) => {
    e.preventDefault();
    const sendData = {
      userID,
      userRole,
      eventID: e.target.eventid.value,
    };

    try {
      const response = await axios.post("/api/event/deleteevent", sendData);
      console.log(response.data.invalid_msg);
      if (response.data.invalid_msg === "invalid") {
        alert("Invalid action");
      } else {
        window.location.reload(false);
      }
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  const generateLink = (link) => `/profile/${link}`;

  return (
    <div>
      <div className="row" style={{ justifyContent: "center" }}>
        {userRole === "Admin" && (
          <Link
            className="btn btn-light my-1"
            to="/createEvent"
            style={{ width: "40%", background: "#79db84" }}
          >
            Create New Event
          </Link>
        )}
      </div>

      <div
        className="row"
        style={{
          overflowY: "scroll",
          display: "flex",
          flexDirection: "wrap",
          alignItems: "baseline",
          justifyContent: "space-evenly",
          flexWrap: "wrap",
        }}
      >
        <div className="col">
          <h1 style={{ textAlign: "center" }}>EVENTS</h1>
          {eventData.map((ele) => (
            <div className="row" style={{ justifyContent: "center" }} key={ele._id}>
              <Card style={{ width: "65%", margin: "15px", height: "auto" }}>
                <Card.Body>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <Card.Title style={{ fontSize: "50px" }}>{ele.title}</Card.Title>
                    <Card.Text>
                      {ele.Event_post_date
                        ? `Created at - ${ele.Event_post_date.slice(0, 10)}`
                        : 'Date not available'}
                    </Card.Text>
                  </div>
                  <Card.Text>{ele.Description}</Card.Text>
                  <div className="row" style={{ display: "flex", justifyContent: "space-evenly" }}>
                    <div className="col" style={{ display: "flex" }}>
                      <Card.Text style={{ marginRight: "50px" }}>
                        <Button style={{ padding: "8px" }}>
                          <a href={ele.Link} target="_blank" rel="noopener noreferrer" style={{ color: "white" }}>
                            Join Here
                          </a>
                        </Button>
                      </Card.Text>

                      {userRole === "Admin" && (
                        <Card.Text>
                          <form onSubmit={deleteEvent}>
                            <Button
                              style={{ padding: "8px" }}
                              type="submit"
                              name="eventid"
                              variant="danger"
                              value={ele._id}
                            >
                              Delete
                            </Button>
                          </form>
                        </Card.Text>
                      )}
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Event;
