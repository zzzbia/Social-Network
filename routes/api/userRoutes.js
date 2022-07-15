const {
	getAllUsers,
	createUser,
	getSingleUser,
	updateUser,
	deleteUser,
	addFriend,
	removeFriend,
} = require("../../controllers/userController");

const express = require("express");
const router = express.Router();

// routes
router.route("/").get(getAllUsers).post(createUser);

router.route("/:id").get(getSingleUser).put(updateUser).delete(deleteUser);

router.route("/:id/friends/:friendId").post(addFriend).delete(removeFriend);

module.exports = router;
