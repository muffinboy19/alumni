import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getPosts } from "../../actions/post";
import { connect } from "react-redux";
import Spinner from "../layouts/Spinner";
import PostCard from "./PostCard";
import { Link } from "react-router-dom";
import { closeSideNav } from "../../actions/alert";
import { useLocation } from "react-router-dom";
import { getAllChannels, createChannel } from "../../actions/channel";

function useQuery() {
	return new URLSearchParams(useLocation().search);
}

const Posts = ({
	getPosts,
	closeSideNav,
	getAllChannels,
	createChannel,
	post: { posts, loading },
	auth: { authUser, loadingAuth },
	extras: { channels },
	match,
}) => {
	const query = useQuery();
	const searchQuery = query.get("search");
	const [search, setSearch] = useState("");
	const [newChannelName, setNewChannelName] = useState("");

	useEffect(() => {
		async function getMyData() {
			closeSideNav();
			getAllChannels();
			console.log("post getAllChannel");
			await getPosts(searchQuery, match.params.channel_name);
		}
		getMyData();
	}, [match.params.channel_name]);

	const handleCreateChannel = () => {
		// Check if the input is not empty before creating the channel
		if (newChannelName.trim()) {
			createChannel(newChannelName);
			setNewChannelName(""); // Clear input field after creation
		} else {
			alert("Channel name cannot be empty");
		}
	};

	// const onSubmit = (e) => {
	// 	e.preventDefault();
	// 	getPosts(query, match.params.channel_name);
	// };

	const searchPosts = () => {
		if (search.trim()) {
			getPosts(searchQuery, match.params.channel_name);
		}
	};

	return loading ? (
		<Spinner />
	) : (
		<Fragment>
			<div className="feed-page">
				<div className="col">
					<h1 className="large text-primary">Posts</h1>
					<p className="lead">
						<i className="fas fa-user mr-4" />
						Welcome to the IIITA Community
					</p>
				</div>
				<div className="row">
					<ul className="col-md-3 sidebar">
						<li
							style={{
								color: "blue",
								padding: "0rem 2rem",
								textAlign: "center",
								borderBottom: "1px solid lightgrey",
								fontSize: "2rem",
								fontWeight: "bold",
							}}
						>
							<strong>Channels</strong>
						</li>
						{channels !== null &&
							channels.map((c) => {
								return (
									<li
										key={c._id}
										className={
											match.params.channel_name === c.name
												? "selected-tab admin-side-panel-subitem"
												: "admin-side-panel-subitem"
										}
									>
										<Link
											to={`/feed/topic/${c.name}?search=${search}`}
											className="side-nav-channel-link"
										>
											<span>{c.name}</span>
										</Link>
									</li>
								);
							})}

						{/* Only render the input and button if the user is Alumni or Admin */}
						{authUser && (authUser.role === "alumni" || authUser.isAdmin) && (
							<div
								style={{
									marginTop: "1.5rem",
									paddingLeft: "2rem",
									display: "flex",
									flexDirection: "row",
									gap: "0.5rem",
								}}
							>
								<input
									type="text"
									value={newChannelName}
									onChange={(e) => setNewChannelName(e.target.value)}
									style={{
										padding: "0.5rem",
										border: "1px solid lightgrey",
										borderRadius: "5px",
										width: "100%",
										fontSize: "1rem",
										flex: 7,
									}}
								/>
								<button
									style={{
										padding: "0.5rem",
										backgroundColor: "blue",
										color: "white",
										border: "none",
										marginRight: "1.9rem",
										borderRadius: "5px",
										cursor: "pointer",
										fontSize: "1rem",
										flex: 3,
									}}
									onClick={handleCreateChannel}
									onMouseOver={(e) =>
										(e.target.style.backgroundColor = "darkblue")
									}
									onMouseOut={(e) => (e.target.style.backgroundColor = "blue")}
								>
									<strong>Add Channel</strong>
								</button>
							</div>
						)}
					</ul>
					<div className="content col-md-9">
						<div className="search-div">
							<Link
								to="/create-post"
								className="btn btn-light col-3 posts-top-item"
								style={{ width: "100%" }}
							>
								<i className="fas fa-edit" style={{ marginRight: "0.5em" }}></i>
								Create Post
							</Link>
							<form method="get" className="col-9 search-form">
								<input
									type="text"
									name="search"
									id="search"
									placeholder="Search here..."
									className="col-9 search-input posts-top-item"
									value={search}
									onChange={(e) => setSearch(e.target.value)}
								/>
								<input
									type="submit"
									value="Search"
									className="btn btn-primary col-3 posts-top-item"
									onClick={searchPosts}
								/>
							</form>
						</div>

						<div className="posts-list">
							{console.log("posts = ", posts)}
							{posts !== null && posts.length === 0 && (
								<h3 style={{ textAlign: "center" }}>No Posts to Display</h3>
							)}
							{console.log("user is ", authUser)}
							{posts !== null &&
								posts.map((pst) => {
									console.log(pst);
									return <PostCard key={pst._id} post={pst} />;
								})}
							{/* if (
										authUser !== null &&
										(pst.visibility.includes(authUser.role) ||
											pst.user === authUser._id ||
											authUser.isAdmin)
									) {
									} else {
										return <h1>Not visible to you</h1>;
									} */}
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
};

Posts.propTypes = {
	auth: PropTypes.object.isRequired,
	extras: PropTypes.object.isRequired,
	post: PropTypes.object.isRequired,
	getPosts: PropTypes.func.isRequired,
	closeSideNav: PropTypes.func.isRequired,
	getAllChannels: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	post: state.post,
	auth: state.auth,
	extras: state.extras,
});

export default connect(mapStateToProps, {
	getPosts,
	closeSideNav,
	getAllChannels,
	createChannel,
})(Posts);
