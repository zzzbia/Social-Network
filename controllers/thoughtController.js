const { Thought, Reaction } = require("../models/Thought");
const User = require("../models/User");

// Get all thoughts from a user
const getAllThoughts = async (req, res) => {
	Thought.find()
		.then((thoughts) => res.json(thoughts))
		.catch((err) => res.status(500).json(err));
};

// Get a single thought by _id
const getSingleThought = async (req, res) => {
	Thought.findOne({ _id: req.params.id })
		.then((thought) => res.json(thought))
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
};

// Create a new thought and push it to the user's thoughts array
const createNewThought = async (req, res) => {
	Thought.create({
		thoughtText: req.body.thoughtText,
		username: req.body.username,
		userId: req.body.userId,
		reactions: [],
	})
		.then((thought) => {
			User.findOneAndUpdate(
				{ _id: req.body.userId },
				{ $push: { thoughts: thought._id } },
				{ runValidators: true, new: true }
			)
				.then((user) =>
					!user
						? res.status(404).json({ message: "No user found with this id" })
						: res.json(user)
				)
				.catch((err) => {
					console.log(err);
					res.status(500).json(err);
				});
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
};

// Update a thought by _id
const updateThought = async (req, res) => {
	Thought.findOneAndUpdate(
		{ _id: req.params.id },
		{ $set: req.body },
		{ runValidators: true, new: true }
	)
		.then((thought) =>
			!thought
				? res
						.status(404)
						.json({ message: "OOPS..No thought exists with this id!" })
				: res.json(thought)
		)
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
};

// Delete a thought by _id
const deleteThought = async (req, res) => {
	Thought.findOneAndDelete({ _id: req.params.id })
		.then((thought) =>
			!thought
				? res.status(404).json({
						message:
							"Can't delete a thought that doesn't exist in the first place",
				  })
				: res.json(thought)
		)
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
};

//Create a reaction to a single thought from the reactions array

const createReaction = async (req, res) => {
	try {
		const reaction = await Reaction.create({
			reactionBody: req.body.reactionBody,
			username: req.body.username,
		});

		if (reaction.reactionId) {
			const thought = await Thought.findOneAndUpdate(
				{ _id: req.params.id },
				{ $push: { reactions: reaction.reactionId } },
				{ runValidators: true, new: true }
			);
			if (thought) {
				res.json(thought);
			}
		}
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
};

//Delete a reaction
const deleteReaction = async (req, res) => {
	try {
		const thought = await Thought.findOneAndUpdate(
			{ _id: req.params.id },
			{ $pull: { reactions: req.body.reactionId } },
			{ runValidators: true, new: true }
		);
		if (thought) {
			res.json(thought);
		}
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
};

module.exports = {
	getAllThoughts,
	getSingleThought,
	createNewThought,
	updateThought,
	deleteThought,
	createReaction,
	deleteReaction,
};
