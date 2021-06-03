require('colors')

module.exports = (error, _req, res, next) => {
	console.log(`${error}`.black.bgRed)

	if (error) {
		res.status(404)
	} else if (error.name === 'CastError') {
		res.status(400).send({ error: 'id used is malformed' })
	} else {
		res.status(500).end
	}
}
