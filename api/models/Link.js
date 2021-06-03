const { Schema, model } = require('mongoose')

//Structure Schema of Link
const linkSchema = new Schema({
	name: String,
	source: String,
	uri: String,
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
})

//Response format
linkSchema.set('toJSON', {
	transform: (_document, returnedObject) => {
		returnedObject.id = returnedObject._id
		delete returnedObject.__v
		delete returnedObject._id
	},
})

//Model from Schema
const Link = model('Link', linkSchema)

module.exports = Link
