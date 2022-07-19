const { Schema, model, Types } = require("mongoose");
const moment = require("moment");

const reactionSchema = new Schema(
	{
		reactionId: {
			type: Schema.Types.ObjectId,
			default: () => new Types.ObjectId(),
		},
		reactionBody: {
			type: String,
			required: true,
			maxLength: 280,
		},
		username: {
			type: String,
			required: true,
		},
		createdAt: {
			type: Date,
			default: Date.now,
			get: (createdAtTime) =>
				moment(createdAtTime).format("MMM Do YYYY, h:mm a"),
		},
	},
	{
		toJSON: {
			getters: true,
		},
		id: false,
	}
);

const thoughtSchema = new Schema(
	{
		thoughtText: {
			type: String,
			required: true,
			minLength: 1,
			maxLength: 280,
		},
		createdAt: {
			type: Date,
			default: Date.now,
			get: (createdAtTime) =>
				moment(createdAtTime).format("MMM Do YYYY, h:mm a"),
		},
		username: {
			type: String,
			required: true,
		},
		reactions: [
			{
				type: Types.ObjectId,
				ref: "Reaction",
			},
		],
	},
	{
		toJSON: {
			virtuals: true,
			getters: true,
		},
		id: false,
	}
);

// Creating a virtual called "reactionCount"

thoughtSchema.virtual("reactionCount").get(function () {
	return this.reactions.length;
});

const Thought = model("Thought", thoughtSchema);
const Reaction = model("Reaction", reactionSchema);

module.exports = { Thought, Reaction };
