const { Schema, model } = require('mongoose')

//Structure Schema of Link
const userSchema = new Schema({
	name: String,
	username: String,
	passwordHash: String,
	links: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Link',
		},
	],
})

//Response format
userSchema.set('toJSON', {
	transform: (_document, returnedObject) => {
		returnedObject.id = returnedObject._id
		delete returnedObject.__v
		delete returnedObject._id
		delete returnedObject.passwordHash
	},
})

//Model from Schema
const User = model('User', userSchema)

module.exports = User
