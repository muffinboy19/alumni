const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const authHeadAdmin = require("../../middleware/authHeadAdmin");
const User = require("../../models/User");
const Post = require("../../models/Post");
const Filter = require("bad-words");
const { check, validationResult } = require("express-validator");
var mongoose = require("mongoose");
const PostRequest = require("../../models/PostRequest");
const Setting = require("../../models/Setting");
const Channel = require("../../models/Channel");

// @route    POST api/posts
// @desc     create a post request
// @access   Private
router.post(
	"/create-post-request",
	[
		
		[
			check("text", "Body Text is required").not().isEmpty(),
			check("heading", "Heading is required").not().isEmpty(),
			check(
				"visibleStudent",
				"Student visibility value Is required"
			).isBoolean(),
			check(
				"visibleFaculty",
				"Faculty visibility value Is required"
			).isBoolean(),
			check(
				"visibleAlumni",
				"Alumni visibility value Is required"
			).isBoolean(),
			check("channel", "Channel is Required").not().isEmpty(),
		],
	],
	async (req, res) => {
		console.log("create-post-request has started here " );
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const filter = new Filter();

		var containsBadWords =
			filter.isProfane(req.body.text) ||
			filter.isProfane(req.body.heading);

		if (containsBadWords) {
			console.log();
			return res
				.status(400)
				.json({ errors: [{ msg: "Bad word detected" }] });
		}

		try {
			console.log(req.body);
			const {
				id,
				text,
				heading,
				visibleStudent,
				visibleFaculty,
				visibleAlumni,
				channel,
				images,
			} = req.body;
			
			console.log("this is the user id ", id);
			const user = await User.findById(id).select("-password");
			visible = [];
			if (visibleStudent) {
				visible.push("student");
			}

			if (visibleAlumni) {
				visible.push("alumni");
			}

			if (visibleFaculty) {
				visible.push("faculty");
			}

			const post_request = new PostRequest({
				heading: heading,
				text: text,
				name: user.name,
				avatar: user.avatar,
				user: id,
				visibility: visible,
				images: images,
				channel: channel,
			});

			const post = await post_request.save();
			console.log(post);


		async function pratham(){
			const request = await PostRequest.findById(post._id);
			console.log("Join request found:", request);
			
			if (!request) {
				console.log("Join request not found");
				return res.status(404).send("Join request not found");
			}
	
			const { heading, text, avatar, user, date, name, visibility, channel, images } =
				request;

		const result_channel = await Channel.find({ name: channel });

		if (!result_channel) {
			return res
				.status(400)
				.json({ errors: [{ msg: "Channel does not exists" }] });
		}

		const newpost = new Post({
			user,
			heading,
			text,
			avatar,
			date,
			name,
			visibility,
			channel,
			images
		});

		const saved_post = await newpost.save();
		console.log(saved_post);
		const post_id = saved_post._id;

		await Channel.findOneAndUpdate(
			{ name: channel },
			{
				$push: { posts: post_id },
			}
		);

		await PostRequest.findOneAndDelete(req.params.id);

		const postuser = await User.findById(user).select("-password");

		const options = {
			subject: "Post Acceepted",
			text: "Congratulations! Your post has been approved. You can now view this post.",
			to: postuser.email,
			from: {
				name: "Alumni Connect",
				address: process.env.EMAIL,
			},
		};

		return res.json({ id: req.params.id });






	}
	await pratham();

	console.log("Post Request sent");

		} catch (error) {
			console.error(error.message);
			res.status(500).send("server error in creating post request");
		}
	}
);

// @route    POST api/posts
// @desc     create a Post Directly
// @access   Private


router.post(
  "/create-post",
  [
    check("text", "Body Text is required").not().isEmpty(),
    check("heading", "Heading is required").not().isEmpty(),
    check("visibleStudent", "Student visibility value is required").isBoolean(),
    check("visibleFaculty", "Faculty visibility value is required").isBoolean(),
    check("visibleAlumni", "Alumni visibility value is required").isBoolean(),
  ],
  async (req, res) => {
    console.log("CREATEPOST: Route hit /create-post"); // Log route hit

    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("CREATEPOST: Validation failed", errors.array()); // Log validation errors
      return res.status(400).json({ errors: errors.array() });
    }

    // Filter out bad words from heading and text
    const filter = new Filter();
    const containsBadWords =
      filter.isProfane(req.body.text) || filter.isProfane(req.body.heading);

    if (containsBadWords) {
      console.log("CREATEPOST: Bad words detected"); // Log bad word detection
      return res.status(400).json({ errors: [{ msg: "Bad word detected" }] });
    }

    try {
      // Find the user, assuming req.user is populated by authentication middleware
      const user = await User.findById(req.user.id).select("-password");
      if (!user) {
        console.log("CREATEPOST: User not found"); // Log user lookup failure
        return res.status(404).json({ errors: [{ msg: "User not found" }] });
      }

      console.log("CREATEPOST: User found", user.name); // Log user found

      // Extract data from request body
      const {
        text,
        heading,
        visibleStudent,
        visibleFaculty,
        visibleAlumni,
        channel,
        images,
      } = req.body;

      console.log("CREATEPOST: Request body received", req.body); // Log the received request body

      // Visibility settings
      const visible = [];
      if (visibleStudent) visible.push("student");
      if (visibleAlumni) visible.push("alumni");
      if (visibleFaculty) visible.push("faculty");

      console.log("CREATEPOST: Visibility settings", visible); // Log visibility settings

      // Check if the channel exists using findOne
      // Check if the channel exists using findOne
const result_channel = await Channel.findOne({ name: channel });
if (!result_channel) {
    console.log("CREATEPOST: Channel not found", channel); // Log if channel is not found
    return res.status(400).json({ errors: [{ msg: "Channel does not exist" }] });
}


      console.log("CREATEPOST: Channel found", channel); // Log if channel is found

      // Create the post
      const post = new Post({
        user: req.user.id,
        heading,
        text,
        name: user.name,
        avatar: user.avatar,
        visibility: visible,
        images: images,
        channel: channel,
      });

      console.log("CREATEPOST: Creating post", post); // Log post creation

      // Save the post
      const pst = await post.save();

      console.log("CREATEPOST: Post saved", pst._id); // Log successful post save

      // Add post to the channel's posts array
      await Channel.findOneAndUpdate(
        { name: channel },
        { $push: { posts: pst._id } }
      );

      console.log("CREATEPOST: Post added to channel", pst._id, channel); // Log post being added to channel
      return res.json(pst);

    } catch (error) {
      console.error("CREATEPOST: Server error", error.message); // Log server errors
      return res.status(500).send("Server error in Create post");
    }
  }
);


// @route    get api/posts/search
// @desc     get all posts for a specific channel
// @access   Private
router.get("/search", async (req, res) => {
	try {
		const searchTerm = req.query.query; // Get search term from query parameters
		const channel_name = req.query.channel_name; // Get channel name from query parameters

		console.log("Search Term:", searchTerm); // Log the search term
		console.log("Channel Name:", channel_name); // Log the channel name

		var posts = [];
		if (searchTerm === "") {
			// If no search term, retrieve all posts from the specified channel
			console.log("Fetching all posts for channel:", channel_name); // Log fetching action
			posts = await Post.find({ channel: channel_name }).sort({ date: -1 });

			console.log("Posts retrieved:", posts); // Log the retrieved posts
		} else {
			// If there's a search term, search for posts matching the term
			console.log("Searching posts with term:", searchTerm); // Log search action
			posts = await Post.find(
				{ $text: { $search: searchTerm } },
				{ score: { $meta: "textScore" } }
			).sort({ score: { $meta: "textScore" } });

			console.log("Posts matching search term:", posts); // Log matching posts

			// Filter the results to only include posts from the specified channel
			const tmp = posts.filter((p) => {
				return p.channel === channel_name;
			});

			posts = tmp; // Update posts to only include the filtered results
			console.log("Filtered posts for channel:", channel_name, ":", posts); // Log filtered posts
		}

		if (posts.length === 0) {
			console.log("No posts found for channel:", channel_name); // Log if no posts are found
		}

		res.json(posts); // Return the posts in the response
	} catch (error) {
		console.error("Error occurred while fetching posts:", error.message); // Log the error message
		res.status(500).send("Server Error");
	}
});


// @route    get api/posts/:id
// @desc     get post by id
// @access   Private

router.get("/:id", async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		if (!post) {
			return res.status(404).json({ msg: "Post not found" });
		}
		res.json(post);
	} catch (error) {
		console.error(error.message);
		if (error.kind === "ObjectId") {
			return res.status(404).json({ msg: "Post not found" });
		}
		res.status(500).send("Server Error");
	}
});

// @route    delete api/posts/:id
// @desc     delete post by id
// @access   Private

router.delete("/:id", async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		if (!post) {
			return res.status(404).json({ msg: "Post not found" });
		}

		if (post.user.toString() !== req.user.id) {
			return res.status(401).json({ msg: "User not authorised" });
		}
		await post.remove();
		res.json({ msg: "Post removed" });
	} catch (error) {
		console.error(error.message);
		if (error.kind === "ObjectId") {
			return res.status(404).json({ msg: "Post not found" });
		}
		res.status(500).send("Server Error");
	}
});

// @route    post api/posts/:post_id/likes
// @desc     Toggle Like of a post
// @access   Private

router.post("/:id/likes", async (req, res) => {
    try {
        // Log the user ID from the request body (instead of req.user)
        const { userId } = req.body; // Assuming userId is sent in the request body

        if (!userId) {
            return res.status(400).json({ msg: "User ID is required" });
        }

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ msg: "Invalid Post ID" });
        }

        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ msg: "Post Not found" });
        }

        // Prevent user from liking their own post
        if (post.user.toString() === userId) {
            return res.status(400).json({ msg: "You can't like your own post" });
        }

        // Check if the user has already liked the post
        if (post.likes.some((like) => like.user.toString() === userId)) {
            return res.status(400).json({ msg: "Post already liked" });
        }

        // Remove from dislikes if present
        await Post.findByIdAndUpdate(req.params.id, {
            $pull: { dislikes: { user: userId } },
        });

        // Add to likes
        await Post.findByIdAndUpdate(req.params.id, {
            $push: { likes: { user: userId } },
        });

        const updatedPost = await Post.findById(req.params.id);

        return res.status(200).json({
            id: updatedPost._id,
            likes: updatedPost.likes,
            dislikes: updatedPost.dislikes,
        });
    } catch (error) {
        console.error(error.stack || error.message);
        return res.status(500).send("Server Error");
    }
});


// @route    post api/posts/:post_id/dislikes
// @desc     toggle DisLike of a post
// @access   Private

router.post("/:id/dislikes", async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		if (post === null) {
			return res.status(404).json({ msg: "Post Not found" });
		}
		if (post.user.toString() === req.user.id) {
			return res
				.status(400)
				.json({ msg: "You can't dislike your own post" });
		}

		const disliked = await Post.find({
			_id: req.params.id, //  match post id
			dislikes: {
				$elemMatch: { user: mongoose.Types.ObjectId(req.user.id) },
			},
		});

		if (disliked.length) {
			return res.status(400).json({ msg: "Post already disliked" });
		} else {
			// remove from likes
			await Post.findOneAndUpdate(
				{ _id: req.params.id },
				{
					$pull: {
						likes: {
							user: mongoose.Types.ObjectId(req.user.id),
						},
					},
				}
			);
			// add to dislikes
			await Post.updateOne(
				{ _id: req.params.id },
				{
					$push: {
						dislikes: {
							user: mongoose.Types.ObjectId(req.user.id),
						},
					},
				}
			);
			const updatedPost = await Post.findById(req.params.id);

			const payload = {
				id: post._id,
				likes: updatedPost.likes,
				dislikes: updatedPost.dislikes,
			};
			return res.status(200).json(payload);
		}
	} catch (error) {
		console.error(error.message);
		res.status(500).send("Server Error");
	}
});

// @route    POST api/posts/:id/comments
// @desc     comment on post
// @access   Private
router.post(
	"/:id/comments",
	[[check("text", "Comment cannot be Empty").not().isEmpty()]],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			console.log("validation check");

			return res.status(400).json({ errors: errors.array() });
		}

		const filter = new Filter();

		var containsBadWords = filter.isProfane(req.body.text);

		if (containsBadWords) {
			console.log();
			return res
				.status(400)
				.json({ errors: [{ msg: "Bad word detected" }] });
		}

		try {
			const user = await User.findById(req.user.id).select("-password");
			const post = await Post.findById(req.params.id);

			const newComment = {
				text: req.body.text,
				name: user.name,
				avatar: user.avatar,
				user: req.user.id,
			};

			post.comments.unshift(newComment);

			await post.save();
			console.log("comment added to db");
			res.json(post.comments);
		} catch (error) {
			console.log("err block routes");
			console.error(error.message);
			res.status(500).send("server error");
		}
	}
);

// @route    DELETE api/posts/:id/comments/:comment_id
// @desc     delete comment
// @access   Private
router.delete("/:id/comments/:comment_id", async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		const comment = post.comments.find(
			(comment) => comment.id === req.params.comment_id
		);

		if (!comment) {
			return res.status(400).json({ msg: "comment does not exist" });
		}

		if (comment.user.toString() !== req.user.id) {
			return res.status(401).json({ msg: "User not authorised" });
		}
		post.comments = post.comments.filter((comm) => comm.id !== comment.id);
		await post.save();
		res.json(post.comments);
	} catch (error) {
		console.error(error.message);
		res.status(500).send("server error");
	}
});

// router.get("/search/:query_string", auth, async (req, res) => {
// 	try {
// 		const posts = await Post.find(
// 			{ $text: { $search: req.params.query_string } },
// 			{ score: { $meta: "textScore" } }
// 		).sort({ score: { $meta: "textScore" } });
// 		res.json(posts);
// 	} catch (err) {
// 		console.error(error.message);
// 		res.status(500).send("server error  in posts search");
// 	}
// });

router.get("/settings/get", async (req, res) => {
	try {
		console.log("AAAAAAAAAAA settings/get is called");

		// Instead of querying the database, return a mock response
		const mockResponse = { requirePostApproval: true }; // Change this to false if needed
		return res.status(200).json(mockResponse);

	} catch (err) {
		console.log(err);
		res.status(500).send("Server Error");
	}
});


router.put("/settings/set", async (req, res) => {
	try {
		const settings = await Setting.find();
		const id = settings[0]._id;

		if (req.body.requireApproval === "on") {
			req.body.requireApproval = true;
		} else if (req.body.requireApproval === "off") {
			req.body.requireApproval = false;
		}

		await Setting.findOneAndUpdate(
			{ _id: id },
			{ $set: { requirePostApproval: req.body.requireApproval } }
		);
		return res.status(200).json("Settings set success");
	} catch (err) {
		console.log(err);
		res.status(500).send("Server Error");
	}
});

module.exports = router;
