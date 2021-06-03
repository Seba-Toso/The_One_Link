import axios from 'axios'
const apiUrl = '/api/links'

let token = null
export const setToken = (newToken) => {
	token = `Bearer ${newToken}`
}

export const getLinks = async () => {
	const config = {
		headers: {
			Authorization: token,
		},
	}

	try {
		const response = await axios.get(apiUrl, config)
		const { data } = response
		return data
	} catch (error) {
		console.log(error)
	}
}

export const createLink = async (name, source, uri) => {
	const config = {
		headers: {
			Authorization: token,
		},
	}
	try {
		const response = await axios.post(apiUrl, { name, source, uri }, config)
		const { data } = response
		return data
	} catch (error) {
		console.log(error)
	}
}

export const deleteLink = async (linkId) => {
	const config = {
		headers: {
			Authorization: token,
		},
	}
	try {
		const response = await axios.delete(`${apiUrl}/${linkId}`, config)
		const { data } = response
		return data
	} catch (error) {
		console.log(error)
	}
}

export const updateLink = async (name, source, uri, linkId) => {
	const config = {
		headers: {
			Authorization: token,
		},
	}
	try {
		const response = await axios.put(
			`${apiUrl}/${linkId}`,
			{ name, source, uri },
			config
		)
		const { data } = response
		return data
	} catch (error) {
		console.log(error)
	}
}
