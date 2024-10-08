import React, { Fragment, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../layouts/Spinner";
import PropTypes from "prop-types";
import { getPost, addComment } from "../../actions/post";
import SingleComment from "./SingleComment";
import parse from "html-react-parser";

const PostDisplay = ({
	getPost,
	addComment,
	post: { post, loading },
	auth: { authUser },
	match,
}) => {
	useEffect(() => {
		getPost(match.params.id);
		console.log("we got the data for the post");
	}, [getPost, match.params.id]);

	const [text, setText] = useState("");
	const onSubmit = async (e) => {
		e.preventDefault();
		var success = await addComment(match.params.id, { text });
		if (success) {
			setText("");
		}
	};

	const history = useHistory();

	return (
		<Fragment>
			{loading || post === null ? (
				<Spinner />
			) : (
				<Fragment>
					<div className="container my-container">
						<div className="row heading-area">
							<button
								className="btn btn-light"
								style={{
									borderRadius: "50% 50%",
									marginRight: "1em",
									width: "30px",
									padding: "0",
									aspectRatio: "1/1",
								}}
								onClick={() => history.goBack()}
							>
								<i className="fas fa-chevron-left ml-2 mr-2"></i>
							</button>
							<h4>
								<strong>{post.heading}</strong>
							</h4>
						</div>
						<div className="row post-text-area">
							{parse(post.text)}
							{post.images !== null &&
								post.images.map((image_name) => {
									return (
										<img
											key={image_name}
											alt="uploaded_image"
											src={`http://localhost:5000/awards/${image_name}`}
											style={{
												maxHeight: "500px",
												maxWidth: "700px",
											}}
										/>
									);
								})}
						</div>
						<div className="row comments-section">
							<div className="add-comment">
								<div
									className="col-md-1 col-sm-1 col-xs-1"
									style={{ textAlign: "center" }}
								>
									<img
										src={authUser.avatar}
										alt=""
										className="avatar avatar-sm rounded-circle"
									/>
								</div>
								<div className="col-md-11 col-sm-11 col-xs-11">
									<input
										type="text"
										placeholder="Add Comment..."
										name="text"
										value={text}
										className="input-comment"
										required
										onChange={(e) => {
											setText(e.target.value);
										}}
									/>
									<a onClick={(e) => onSubmit(e)}>
										<svg
											focusable="true"
											width="24"
											height="24"
											viewBox="0 0 24 24"
											className="comment-submit-button"
										>
											<path d="M2 3v18l20-9L2 3zm2 11l9-2-9-2V6.09L17.13 12 4 17.91V14z" />
										</svg>
									</a>
								</div>
							</div>
							<div className="comment-display">
								{post.comments.map((com) => (
									<SingleComment
										key={com._id}
										comment={com}
										currentUser={authUser._id}
										postId={post._id}
									/>
								))}
							</div>
						</div>
					</div>
				</Fragment>
			)}
		</Fragment>
	);
};

PostDisplay.propTypes = {
	getPost: PropTypes.func.isRequired,
	addComment: PropTypes.func.isRequired,
	post: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	post: state.post,
});

export default connect(mapStateToProps, { getPost, addComment })(PostDisplay);
