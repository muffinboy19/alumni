import React, { Fragment, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logOut } from "../../actions/auth";
import { openSideNav, closeSideNav } from "../../actions/alert";
import logo from "../../019eddbf5bf91320da288c242aefa491.png";
import Notification from "../notification/notifications.jsx";
const Navbar = ({
	auth: { isAuthenticated, loadingAuth, authUser },
	logOut,
	openSideNav,
	closeSideNav,
	sideNavOpen,
}) => {
	// main rendering part
	const [navStyle, setNavbarStyle] = useState({
		backgroundColor: "transparent",
		color: "white",
		position: "absolute",
	});
	const [navLinkColor, setNavLinkColor] = useState({
		color: "white",
		filter: "grayscale(100%) brightness(100000)",
	});

	const loc = useLocation();
	useEffect(() => {
		if (loc.pathname !== "/") {
			setNavbarStyle({
				backgroundColor: "white",
				color: "black",
				position: "relative",
			});
			setNavLinkColor({
				color: "black",
				filter: "brightness(0)",
			});
		} else {
			setNavbarStyle({
				backgroundColor: "transparent",
				color: "white",
				position: "absolute",
			});
			setNavLinkColor({
				color: "white",
				filter: "grayscale(100%) brightness(100000)",
			});
		}
	}, [loc]);

	const authLinksAdmin = (
		<Fragment>
			{/* <li>
        <Link to="/add-achievement" className="navbar-link">
          <span className="hide-sm">Achievements/Awards</span>
        </Link>
      </li> */}
			<li>
				<Notification />
			</li>
			{/* <li>
				<Link to="/messenger" className="navbar-link">
					<span className="hide-sm">Messenger</span>
				</Link>
			</li> */}
			<li>
				<Link to="/jobs" className="navbar-link">
					<span className="hide-sm">Jobs</span>
				</Link>
			</li>

			<li>
				<Link to="/events" className="navbar-link">
					<span className="hide-sm">Events</span>
				</Link>
			</li>
			<li>
				<Link to="/profiles?search=" className="navbar-link">
					<span className="hide-sm">Members</span>
				</Link>
			</li>
			<li>
				<Link to="/userprofile" className="navbar-link">
					<i className="fas fa-user"></i>{" "}
					<span className="hide-sm">Profile</span>
				</Link>
			</li>
			<li>
				<Link to="/dashboard" className="navbar-link">
					<span className="hide-sm">Dashboard</span>
				</Link>
			</li>
			<li>
				<Link to="/feed/topic/Placements?search=" className="navbar-link">
					<span className="hide-sm">Feed</span>
				</Link>
			</li>
			{/* <li>
        <Link to="/help" className="navbar-link">
          <span className="hide-sm">Help</span>
        </Link>
      </li> */}
			<li>
				<Link
					onClick={() => {
						logOut();
					}}
					to="/"
					className="navbar-link"
				>
					<i className="fas fa-sign-out-alt"></i>{" "}
					<span className="hide-sm">Log Out</span>
				</Link>
			</li>
		</Fragment>
	);

	const authLinksOther = (
		<Fragment>
			{/* <li>
        <Link to="/add-achievement" className="navbar-link">
        <span className="hide-sm">Achievements/Awards</span>
        </Link>
      </li> */}
			<li>
				<Notification />
			</li>
			{/* <li>
				<Link to="/messenger" className="navbar-link">
					<span className="hide-sm">Messenger</span>
				</Link>
			</li> */}
			<li>
				<Link to="/jobs" className="navbar-link">
					<span className="hide-sm">Jobs</span>
				</Link>
			</li>

			<li>
				<Link to="/events" className="navbar-link">
					<span className="hide-sm">Events</span>
				</Link>
			</li>
			<li>
				<Link to="/profiles?search=" className="navbar-link">
					<span className="hide-sm">Members</span>
				</Link>
			</li>
			<li>
				<Link to="/userprofile" className="navbar-link">
					<i className="fas fa-user"></i>{" "}
					{/* <span className="hide-sm">Profile</span> */}
					{authUser !== null && (
						<span className="user-role-tag">{authUser.role}</span>
					)}
				</Link>
			</li>

			<li>
				<Link to="/feed/topic/Placements?search=" className="navbar-link">
					<span className="hide-sm">Feed</span>
				</Link>
			</li>
			{/* <li>
        <Link to="/help" className="navbar-link">
          <span className="hide-sm">Help</span>
        </Link>
      </li> */}
			<li>
				<Link
					onClick={() => {
						logOut();
					}}
					to="/"
					className="navbar-link"
				>
					<i className="fas fa-sign-out-alt"></i>{" "}
					<span className="hide-sm">Log Out</span>
				</Link>
			</li>
		</Fragment>
	);

	const guestLinks = (
		<Fragment>
			{/* <li>
				<Link to="/add-achievement" className="navbar-link hero-nav-links">
					<span className="hide-sm nav-lt" style={navLinkColor}>
						Achievements
					</span>
				</Link>
			</li> */}
			<li>
				<Link to="/About" className="navbar-link hero-nav-links">
					<span className="hide-sm nav-lt" style={navLinkColor}>
						About
					</span>
				</Link>
			</li>
			<li>
				<Link to="/help" className="navbar-link hero-nav-links">
					<span className="hide-sm nav-lt" style={navLinkColor}>
						Help
					</span>
				</Link>
			</li>

			<li>
				<Link
					to="/login"
					style={{ color: "black" }}
					className="login navbar-link hero-nav-links "
				>
					<span className="nav-lt">Login</span>
				</Link>
			</li>
			<li>
				<Link to="/register" className="navbar-link hero-nav-links register">
					<span className="nav-lt">Register</span>
				</Link>
			</li>
		</Fragment>
	);

	const authLinksSideBarClosedOthers = (
		<ul>
			<li>
				<button
					className="navbar-link hamburger-icon"
					style={{ fontSize: "1.5em" }}
					onClick={() => openSideNav()}
				>
					<i className="fas fa-bars"></i>
				</button>
			</li>
			<ul className="nav-links">{authLinksOther}</ul>
		</ul>
	);

	const authLinksSideBarClosedAdmin = (
		<ul>
			<li>
				<button
					className="navbar-link hamburger-icon"
					style={{
						fontSize: "1.5em",
						outline: "none",
						backgroundColor: "white",
						border: "none",
					}}
					onClick={() => openSideNav()}
				>
					<i className="fas fa-bars"></i>
				</button>
			</li>
			<ul className="nav-links">{authLinksAdmin}</ul>
		</ul>
	);

	const guestLinksSideBarClosed = (
		<ul>
			<li>
				<button
					className="navbar-link hamburger-icon"
					style={{
						fontSize: "1.5em",
						outline: "none",
						backgroundColor: "white",
						border: "none",
					}}
					onClick={() => openSideNav()}
				>
					<i className="fas fa-bars"></i>
				</button>
			</li>
			<ul className="nav-links">{guestLinks}</ul>
		</ul>
	);

	return (
		<div>
			<nav className="navbar" style={navStyle}>
				<Link to="/" className="logo navbar-link" style={{ fontSize: "1.1em" }}>
					<img
						src={logo}
						alt="logo"
						className="navbar-link hero-logo"
						style={{ ...navLinkColor, height: "50px", width: "50px" }}
					/>
				</Link>
				{!loadingAuth ? (
					<Fragment>
						{isAuthenticated && authUser !== null
							? authUser.isAdmin
								? authLinksSideBarClosedAdmin
								: authLinksSideBarClosedOthers
							: guestLinksSideBarClosed}
					</Fragment>
				) : (
					guestLinksSideBarClosed
				)}
			</nav>
			<Fragment>
				{sideNavOpen && (
					<div className="side-panel">
						<button
							style={{
								fontSize: "1.5em",
								outline: "none",
								backgroundColor: "white",
								border: "none",
							}}
							className="navbar-link nav-close-icon"
							onClick={() => closeSideNav()}
						>
							<i className="fas fa-times"></i>
						</button>
						{!loadingAuth && (
							<ul className="side-panel-links">
								<React.Fragment>
									{isAuthenticated
										? authUser.isAdmin
											? authLinksAdmin
											: authLinksOther
										: guestLinks}
								</React.Fragment>
							</ul>
						)}
					</div>
				)}
			</Fragment>
		</div>
	);
};

Navbar.propTypes = {
	logOut: PropTypes.func.isRequired,
	openSideNav: PropTypes.func.isRequired,
	closeSideNav: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	sideNavOpen: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	sideNavOpen: state.alert.sideNavOpen,
});

export default connect(mapStateToProps, { logOut, openSideNav, closeSideNav })(
	Navbar
);
