// import {
//   Card,
//   Badge,
//   Button,
//   Form,
//   NavDropdown,
//   Dropdown,
//   DropdownButton,
// } from "react-bootstrap";
// // import 'bootstrap/dist/css/bootstrap.min.css';
// import React from "react";
// import axios from "axios";
// import "./temp.css";

// import { useEffect, useState } from "react";
// const Notifications = () => {
//   let userData = localStorage.getItem("_user_data");

//   let userID;
//   let userName;
//   let userRole;
//   if (userData == "none") {
//   } else {
//     userData = JSON.parse(userData);

//     userID = userData._id;
//     userName = userData.name;
//     userRole = userData.role;
//   }

//   const [noti, setNotifications] = useState([]);
//   const [notiID, setNotiID] = useState(0);
//   const [newNotifications, setnewNotifications] = useState(0);

//   useEffect(() => {
//     const getData = async () => {
//       if(userData == "none") return;
//       const tosend = {
//         userID: userID,
//       };
//       // console.log(tosend);
//       const data = await axios.post(
//         "/api/notifications/getNotifications",
//         tosend
//       );
//       // console.log("noti = ", data.data);
//       data.data.data = data.data.data.reverse();
//       setNotifications(data.data.data);
//       setNotiID(data.data.ID.id);
//       // console.log("new = ", data.data.data.length - data.data.ID.id);
//       setnewNotifications(parseInt(data.data.data.length - data.data.ID.id));
//     };

//     getData();
//   }, []);

//   const clicked = async () => {
//     // console.log("Clicked");
//     if(userData == "none") return;
//     const tosend = {
//       userID: userID,
//     };
//     const getIndex = await axios.post("/api/notifications/updateId", tosend);
//     setnewNotifications(0);
//   };

//   return (
//     <>
//       <DropdownButton
//         size="sm"
//         // style={{ maxHeight: "42px", background: "transparent" }}
//         // key={1}
//         title={newNotifications + "🔔"}
//         onClick={() => clicked()}
//         id="dropdown-size-small"
//       >
//         {noti.map((ele, i) => {
//           return (
//             <Dropdown.Item
//               href={ele.Notification_link}
//               style={{
//                 margin: "5px",
//                 backgroundColor: " #e4e0e0",
//                 width: "350px",
//                 whiteSpace: "normal",
//                 wordBreak: "break-word",
//               }}
//             >
//               {i < newNotifications ? <Badge bg="success">New</Badge> : null}
//               <div className="texth1">
//                 Hi there, a new&nbsp;
//                 <b>{ele.Notification_name} </b>
//                 &nbsp;is available
//               </div>
//               Date:{ele.Notification_post_date.slice(0, 10)}{" "}
//               {ele.Notification_post_date.slice(11, 16)}
//             </Dropdown.Item>
//           );
//         })}
//       </DropdownButton>
//     </>
//   );
// };

// export default Notifications;

// import {
//   DropdownButton,
//   Dropdown,
//   Badge,
// } from "react-bootstrap";
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./temp.css";

// const Notifications = () => {
//   let userData = localStorage.getItem("_user_data");

//   let userID;
//   let userName;
//   let userRole;

//   if (userData && userData !== "none") {
//     userData = JSON.parse(userData);
//     userID = userData._id;
//     userName = userData.name;
//     userRole = userData.role;
//   }

//   const [noti, setNotifications] = useState([]);
//   const [notiID, setNotiID] = useState(0);
//   const [newNotifications, setNewNotifications] = useState(0);

//   useEffect(() => {
//     const getData = async () => {
//       if (!userID) return; // Make sure userID is valid before making the request

//       const tosend = {
//         userID: userID,
//       };

//       try {
//         const data = await axios.post(
//           "/api/notifications/getNotifications",
//           tosend
//         );

//         if (data && data.data && data.data.data) {
//           data.data.data = data.data.data.reverse();
//           setNotifications(data.data.data);
//           setNotiID(data.data.ID.id);
//           setNewNotifications(parseInt(data.data.data.length - data.data.ID.id));
//         }
//       } catch (error) {
//         console.error("Error fetching notifications", error);
//       }
//     };

//     getData();
//   }, [userID]);

//   const clicked = async () => {
//     if (!userID) return;

//     const tosend = {
//       userID: userID,
//     };

//     try {
//       await axios.post("/api/notifications/updateId", tosend);
//        setNewNotifications(0);
//     } catch (error) {
//       console.error("Error updating notifications", error);
//     }
//   };

//   return (
//     <>
//       <DropdownButton
//         size="sm"
//         title={{Notifications.length} + "🔔"}
//         onClick={clicked}
//         id="dropdown-size-small"
//       >
//         {noti.map((ele, i) => (
//           <Dropdown.Item
//             key={i}
//             href={ele.Notification_link}
//             style={{
//               margin: "5px",
//               backgroundColor: "#e4e0e0",
//               width: "350px",
//               whiteSpace: "normal",
//               wordBreak: "break-word",
//             }}
//           >
//             {i < newNotifications ? <Badge bg="success">New</Badge> : null}
//             <div className="texth1">
//               Hi there, a new <b>{ele.Notification_name}</b> is available
//             </div>
//             Date: {ele.Notification_post_date.slice(0, 10)}{" "}
//             {ele.Notification_post_date.slice(11, 16)}
//           </Dropdown.Item>
//         ))}
//       </DropdownButton>
//     </>
//   );
// };

// export default Notifications;

import { DropdownButton, Dropdown, Badge } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./temp.css";

const Notifications = () => {
	let userData = localStorage.getItem("_user_data");

	let userID;
	let userName;
	let userRole;

	if (userData && userData !== "none") {
		userData = JSON.parse(userData);
		userID = userData._id;
		userName = userData.name;
		userRole = userData.role;
	}

	const [noti, setNotifications] = useState([]);
	const [notiID, setNotiID] = useState(0);
	const [newNotifications, setNewNotifications] = useState(0);
	const [totalNotifications, setTotalNotifications] = useState(0); // New state for total notifications

	useEffect(() => {
		const getData = async () => {
			if (!userID) return; // Make sure userID is valid before making the request

			const tosend = {
				userID: userID,
			};

			try {
				const data = await axios.post(
					"/api/notifications/getNotifications",
					tosend
				);
				console.log("notifications - ", data);

				if (data && data.data && data.data.data) {
					const notifications = data.data.data.reverse();
					setNotifications(notifications);
					setNotiID(data.data.ID.id);
					setNewNotifications(parseInt(notifications.length - data.data.ID.id));
					setTotalNotifications(notifications.length); // Set the total notifications length
				}
			} catch (error) {
				console.error("Error fetching notifications  ", error);
			}
		};

		getData();
	}, [userID]);

	const clicked = async () => {
		if (!userID) return;

		const tosend = {
			userID: userID,
		};

		try {
			await axios.post("/api/notifications/updateId", tosend);
			setNewNotifications(0);
		} catch (error) {
			console.error("Error updating notifications", error);
		}
	};

	return (
		<>
			<DropdownButton
				size="sm"
				title={`${totalNotifications} 🔔`} // Display the total number of notifications
				onClick={clicked}
				id="dropdown-size-small"
			>
				{noti.map((ele, i) => (
					<Dropdown.Item
						key={i}
						href={ele.Notification_link}
						style={{
							margin: "5px",
							backgroundColor: "#e4e0e0",
							width: "350px",
							whiteSpace: "normal",
							wordBreak: "break-word",
						}}
					>
						{i < newNotifications ? <Badge bg="success">New</Badge> : null}
						<div className="texth1">
							Hi there, a new <b>{ele.Notification_name}</b> is available
						</div>
						Date: {ele.Notification_post_date.slice(0, 10)}{" "}
						{ele.Notification_post_date.slice(11, 16)}
					</Dropdown.Item>
				))}
			</DropdownButton>
		</>
	);
};

export default Notifications;
