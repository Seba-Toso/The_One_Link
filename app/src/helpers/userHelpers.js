import axios from 'axios'
const registerUri = '/api/users'
const loginUri = '/api/login'

export const createUser = async (name, username, password) => {
	try {
		const response = await axios.post(registerUri, { name, username, password })
		const { data } = response
		//console.log(data)
		return data
	} catch (error) {
		console.log(error)
	}
}

export const logUser = async (username, password) => {
	try {
		const response = await axios.post(loginUri, { username, password })
		const { data } = response
		//console.log(data)
		return data
	} catch (error) {
		console.log(error)
	}
}
