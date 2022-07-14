const { Schema, model } = require("mongoose");

const userSchema = new Schema({
	username: {
		type: String,
		required: true,
		unique: true,
		trimmed: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		validate: {
			validator: function (v) {
				return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
			},
		},
	},
	thoughts: [thoughtsSchema],
	friends: [userSchema],
	toJSON: {
		virtuals: true,
	},
});

userSchema
	.virtual("friendCount")
	.get(function () {
		return this.friends.length;
	})
	.set(function (friendCount) {
		this.friends.length = friendCount;
	});

const User = model("User", userSchema);
module.exports = User;
