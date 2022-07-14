const { Schema, model } = require("mongoose");
const moment = require("moment");

const thoughtSchema = new Schema({
	thoughtText: {
		type: String,
		required: true,
		minLength: 1,
		maxLength: 280,
	},
	createdAt: {
		type: Date,
		default: Date.now,
		//needs getter to format the date
	},
	username: {
		type: String,
		required: true,
	},
	reactions: [reactionSchema],
});
