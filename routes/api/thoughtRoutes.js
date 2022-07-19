const express = require("express");
const router = express.Router();
const {
	getAllThoughts,
	getSingleThought,
	createNewThought,
	updateThought,
	deleteThought,
	createReaction,
	deleteReaction,
} = require("../../controllers/thoughtController");

router.route("/").get(getAllThoughts).post(createNewThought);

router
	.route("/:id")
	.get(getSingleThought)
	.put(updateThought)
	.delete(deleteThought);

router.route("/:id/reactions").post(createReaction).delete(deleteReaction);

module.exports = router;
