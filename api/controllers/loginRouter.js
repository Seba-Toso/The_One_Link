const loginRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/User')

const SECRET = process.env.SECRET

loginRouter.post('/', async (req, res, next) => {
	const { username, password } = req.body

	const user = await User.findOne({ username })

	const passwordCorrect =
		user === null ? false : await bcrypt.compare(password, user.passwordHash)

	if (!(user && passwordCorrect)) {
		return res.status(401).json({
			error: 'Invalid user or password',
		})
	}

	if (user) {
		const userForToken = {
			id: user?._id,
			username: user?.username,
		}
	
		const token = jwt.sign(userForToken, SECRET, {
			//token will expire in one month
			expiresIn: "365d",
		})
	
		res.send({
			name: user?.name,
			username: user?.username,
			token,
		})
	}
})

module.exports = loginRouter
