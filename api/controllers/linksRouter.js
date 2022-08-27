const linksRouter = require('express').Router()
const mongoose = require('mongoose')
const userEstractor = require('../middlewares/userEstractor')

//Models
const Link = require('../models/Link')
const User = require('../models/User')
//------

//Links Routes

linksRouter.get('/', userEstractor, async (req, res, next) => {
	const { userID } = req
	const user = await User.findById(userID)
	try {
		const links = await Link.find({}).populate('user', {
			username: 1,
			name: 1,
		})
		//Here will be a filter to extract only user links
		const userLinks = links.filter(
			(link) => link?.user?.username === user?.username
		)
		res.status(200).send(userLinks)
	} catch (error) {
		mongoose.connection.close()
		next(error)
	}
})

linksRouter.post('/', userEstractor, async (req, res, next) => {
	const { name, source, uri } = req.body

	if (!name || !source || !uri) {
		return res
			.status(400)
			.json({
				error: 'Required field is missing. Check name, source or uri',
			})
			.end()
	}

	const { userID } = req
	const user = await User.findById(userID)

	const newLink = new Link({
		name,
		source,
		uri,
		user: user._id,
	})

	try {
		const savedLink = await newLink.save()
		//save newLink into usernotes
		user.links = user.links.concat(savedLink._id)
		await user.save()

		res.json(savedLink)
	} catch (error) {
		mongoose.connection.close()
		next(error)
	}
})

linksRouter.delete('/:id', userEstractor, async (req, res, next) => {
	const { userID } = req
	const user = await User.findById(userID)
	if (!user) {
		return res.status(400).json({
			error: 'User not logged in',
		})
	}

	const linkId = req.params.id
	try {
		const deletedLink = await Link.findByIdAndDelete(linkId)
		deletedLink ? res.status(204).end() : new Error(res.status(404).end())
	} catch (error) {
		mongoose.connection.close()
		next(error)
	}
})

linksRouter.put('/:id', userEstractor, async (req, res, next) => {
	const { userID } = req
	const user = await User.findById(userID)
	if (!user) {
		return res.status(400).json({
			error: 'User not logged',
		})
	}

	const { id } = req.params
	const link = req.body

	if (!link.name || link.name === null || link.name === undefined) {
		return res.status(304).json({
			error: 'required "name" field is missing',
		})
	}
	if (!link.source || link.source === null || link.source === undefined) {
		return res.status(304).json({
			error: 'required "source" field is missing',
		})
	}
	if (!link.uri || link.uri === null || link.uri === undefined) {
		return res.status(304).json({
			error: 'required "uri" field is missing',
		})
	}

	const newLinkData = {
		name: link.name,
		source: link.source,
		uri: link.uri,
	}

	try {
		const updatedLink = await Link.findByIdAndUpdate(id, newLinkData, {
			new: true,
		})
		updatedLink
			? res.status(200).json(updatedLink).end()
			: res.status(404).end()
	} catch (error) {
		mongoose.connection.close()
		next(error)
	}
})

module.exports = linksRouter
