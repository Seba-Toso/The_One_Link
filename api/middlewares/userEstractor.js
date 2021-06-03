const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
	// User session check
	const authorization = req.get('Authorization')

	let token = ''
	if (authorization && authorization.toLowerCase().startsWith('bearer')) {
		token = authorization.substring(7)
	}

	let decodedToken = {}
	try {
		decodedToken = jwt.verify(token, process.env.SECRET)
	} catch (error) {
		return res.status(401).json({
			error: 'missing token or invalid',
		})
	}

	if (!token || !decodedToken.id) {
		return res.status(401).json({
			error: 'missing token or invalid',
		})
	}

	const { id: userID } = decodedToken
	req.userID = userID

	next()
}
