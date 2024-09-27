import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { login } from "../../actions/auth";
import { closeSideNav } from "../../actions/alert";

const Login = ({ login, isAuthenticated, closeSideNav }) => {
	console.log("this is the login fucniton");
	const [passwordType, setPasswordType] = useState("password");
	useEffect(() => {
		closeSideNav();
	}, []);

	const [formInput, setFormInput] = useState({
		email: "",
		password: "",
	});

	const { email, password } = formInput;

	const onChange = (e) =>
		setFormInput({ ...formInput, [e.target.name]: e.target.value });

	const onSubmit = async (e) => {
		e.preventDefault();
		console.log("Form Submitted");

		// Basic validation
		if (!email || !password) {
			console.error("Email and password are required.");
			return;
		}

		try {
			const userData = await login({ email, password });
			console.log(userData); // Log userData to see what is returned
			if (userData) {
				localStorage.setItem("_user_data", JSON.stringify(userData));
				console.log("user data is saved here");
				console.log(userData);
			}
		} catch (error) {
			console.log("Login failed:", error.message); // Log the error message
		}
	};

	if (isAuthenticated) {
		return <Redirect to="/feed/topic/Mentorship?search=" />;
	}

	const togglePassword = () => {
		if (passwordType === "password") {
			setPasswordType("text");
			return;
		}
		setPasswordType("password");
	};

	return (
		<div className="form-container">
			<h1 className="hero-head">Login</h1>
			<p className="lead"> Login To Your Account</p>

			<form className="form auth-form" onSubmit={(e) => onSubmit(e)}>
				<div className="form-group">
					<input
						type="email"
						placeholder="Email address"
						name="email"
						value={email}
						autoComplete="true"
						onChange={(event) => onChange(event)}
					/>
				</div>
				<div className="form-group">
					<input
						type={passwordType}
						placeholder="Password"
						name="password"
						id="myInput"
						value={password}
						autoComplete="true"
						onChange={(event) => onChange(event)}
						minLength="6"
					/>
					<div>
						{/* <input  autocomplete="false" type="checkbox" onClick={togglePassword}>
					</input> */}
						<span style={{ cursor: "pointer" }} onClick={togglePassword}>
							Show Password
						</span>
					</div>
				</div>
				<input type="submit" className="btn btn-primary" value="Login" />
			</form>
			<p className="my-1">
				Forgot Password ? <Link to="/forgotPassword">Reset Password</Link>
			</p>
		</div>
	);
};

Login.propTypes = {
	login: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool,
	closeSideNav: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login, closeSideNav })(Login);
