import React, { useState } from 'react'

const intialUser = false

export const Context = React.createContext()

const Store = ({ children }) => {
	const [user, setUser] = useState(intialUser)

	return <Context.Provider value={[user, setUser]}>{children}</Context.Provider>
}

export default Store
