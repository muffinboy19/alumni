import React, { useEffect, useRef } from "react";
import { Route, Switch, useLocation } from "react-router-dom";

import logo from "./019eddbf5bf91320da288c242aefa491.png";
import axios from "axios";
import Home from "./components/layouts/Home";
import Navbar from "./components/layouts/Navbar.jsx";
import { loadUser } from "./actions/auth";
import store from "./store";
import "./App.css";
import setAuthToken from "./utils/setAuthToken";
import Routes from "./components/routing/Routes";
import Footer from "./components/layouts/Footer";

// framer motion
import { animate, AnimatePresence, transform } from "framer-motion";
import { motion } from "framer-motion";
import { duration } from "moment";

axios.defaults.baseURL = "https://alumni-6jli.onrender.com/";

if (localStorage.token) {
	setAuthToken(localStorage.token);
}

const blackBox = {
	initial: {
		height: "100vh",
		transform: "scaleY(1)",
		bottom: "0%",
	},
	animate: {
		transform: "scaleY(0)",

		transition: {
			when: "afterChildren",

			duration: 1.5,
			ease: [0.87, 0, 0.13, 1],
		},
	},
};

const textContainer = {
	initial: {
		opacity: 1,
	},
	animate: {
		opacity: 0,
		transition: {
			duration: 0.25,
			when: "afterChildren",
		},
	},
};

const text = {
	initial: {
		y: 40,
	},
	animate: {
		y: 80,
		transition: {
			duration: 1.5,
			ease: [0.87, 0, 0.13, 1],
		},
	},
};
const conatiner = {
	initial: {
		transform: "scale(1)",
	},
	animate: {
		transform: "scale(0)",
		transition: {
			duration: 0.25,
			when: "afterChildren",
		},
	},
};

const InitialTransition = () => {
	return (
		<motion.div
			className="init-screen-cont"
			style={{ position: "absolute", zIndex: "50" }}
			initial="initial"
			animate="animate"
			variants={conatiner}
		>
			<motion.div
				className="init-screen"
				variants={blackBox}
				onAnimationStart={() => document.body.classList.add("overflow-hid")}
				onAnimationComplete={() =>
					document.body.classList.remove("overflow-hid")
				}
			>
				<motion.svg
					variants={textContainer}
					style={{
						position: "absolute",
						zIndex: "50",
						display: "flex",
						width: "800px",
					}}
				>
					<pattern
						id="pattern"
						patternUnits="userSpaceOnUse"
						width={750}
						height={800}
						className="text-white"
						style={{ color: "white" }}
					>
						<rect
							className="w-full h-full fill-current"
							style={{ width: "100%", height: "100%", fill: "currentColor" }}
						/>
						<motion.rect
							variants={text}
							className="w-full h-full text-gray-600 fill-current"
							style={{
								width: "100%",
								height: "100%",
								color: "gray",
								fill: "currentColor",
							}}
						/>
					</pattern>
					<text
						className="text-4xl font-bold"
						textAnchor="middle"
						x="50%"
						y="50%"
						style={{
							fill: "url(#pattern)",
							fontSize: "2.5rem",
							fontWeight: 700,
						}}
					>
						IIITA AlumniConnect
					</text>
				</motion.svg>
			</motion.div>
		</motion.div>
	);
};

const App = () => {
	const isFirstRender = useRef(true);
	const loc = useLocation();
	useEffect(() => {
		store.dispatch(loadUser());
	}, []);
	// detecting first route change
	useEffect(() => {
		if (isFirstRender.current) {
			// It's the first render
			isFirstRender.current = false; // After first render, set it to false
		}
	}, []);

	return (
		<AnimatePresence mode="wait">
			<React.Fragment>
				{isFirstRender.current && <InitialTransition />}
				<Navbar />
				<Switch location={loc} key={loc.pathname}>
					<Route exact path="/">
						<motion.div>
							<Home />
						</motion.div>
					</Route>
					<Route component={Routes} />
				</Switch>
				<Footer />
			</React.Fragment>
		</AnimatePresence>
	);
};

export default App;
