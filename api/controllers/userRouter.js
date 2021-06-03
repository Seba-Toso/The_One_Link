const userRouter = require('express').Router()
const mongoose = require('mongoose')
const axios = require('axios')
const bcrypt = require('bcrypt')

//Models
const User = require('../models/User')

//------

//User Routes
userRouter.get('/', async (_req, res, next) => {
	User.find({})
		.populate('notes', {
			content: 1,
			date: 1,
		})
		.then((users) => {
			res.json(users)
		})
		.catch((error) => {
			mongoose.connection.close()
			next(error)
		})
})

userRouter.post('/', async (req, res, next) => {
	const { name, username, password } = req.body

	const saltRounds = 10
	const hashedPassword = await bcrypt.hash(password, saltRounds)

	const newUser = new User({
		name,
		username,
		passwordHash: hashedPassword,
	})

	try {
		const savedUser = await newUser.save()

		savedUser ? res.status(201).json(savedUser) : res.send(400).end()
	} catch (error) {
		next(error)
	}
})

module.exports = userRouter
