const User = require("../models/User");
const Thought = require("../models/Thought");

// Get all users
const getAllUsers = async (req, res) => {
	User.find()
		.then((users) => res.json(users))
		.catch((err) => res.status(500).json(err));
};
// Get a single user by _id and populated thought, and friend data
const getSingleUser = async (req, res) => {
	User.findOne({ _id: req.params.id })
		.populate("thoughts")
		.populate("friends")
		.then((user) => res.json(user))
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
};
// Create a new user
const createUser = async (req, res) => {
	User.create(req.body)
		.then((user) => res.json(user))
		.catch((err) => res.status(500).json(err));
};
// Update a user by _id
const updateUser = async (req, res) => {
	User.findOneAndUpdate(
		{ _id: req.params.id },
		{ $set: req.body },
		{ runValidators: true, new: true }
	)
		.then((user) =>
			!user
				? res.status(404).json({ message: "No user exists with this id!" })
				: res.json(user)
		)
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
};
// Delete a user by _id
const deleteUser = async (req, res) => {
	User.findOneAndDelete({ _id: req.params.id })
		.then((user) =>
			!user
				? res
						.status(404)
						.json({ message: "Can't delete a user that doesn't exist" })
				: res.json(user)
		)
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
};

// add a friend to a user
const addFriend = async (req, res) => {
	User.findOneAndUpdate(
		{ _id: req.params.id },
		{ $push: { friends: req.params.friendId } },
		{ runValidators: true, new: true }
	)
		.then((user) =>
			!user
				? res.status(404).json({ message: "No user exists with this id!" })
				: res.json(user)
		)
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
};

// remove a friend from a user
const removeFriend = async (req, res) => {
	User.findOneAndUpdate(
		{ _id: req.params.id },
		{ $pull: { friends: req.params.friendId } },
		{ runValidators: true, new: true }
	)
		.then((user) =>
			!user
				? res.status(404).json({ message: "No user exists with this id!" })
				: res.json(user)
		)
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
};

module.exports = {
	getAllUsers,
	getSingleUser,
	createUser,
	updateUser,
	deleteUser,
	addFriend,
	removeFriend,
};
