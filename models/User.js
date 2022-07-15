const { Schema, Types, model } = require("mongoose");

const userSchema = new Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
			trim: true,
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
		thoughts: [
			{
				type: Schema.Types.ObjectId,
				ref: "Thought",
			},
		],

		friends: [
			{
				type: Schema.Types.ObjectId,
				ref: "User",
			},
		],
	},
	{
		toJSON: {
			virtuals: true,
		},
		id: false,
	}
);

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
