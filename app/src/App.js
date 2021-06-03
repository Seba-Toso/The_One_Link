import { useContext, useEffect } from 'react'
import { Context } from './context/context'
import Header from './components/Header'
import { Box } from '@chakra-ui/react'
import AppRouter from './router/routes'
import { setToken } from './helpers/linksHelpers'

function App() {
	const [user, setUser] = useContext(Context)

	useEffect(() => {
		const storedUser = JSON.parse(window.localStorage.getItem('loggedUser'))
		if (storedUser) {
			setUser(storedUser)
			const { token } = storedUser
			setToken(token)
		}
	}, [setUser])

	return (
		<Box bg='Gray 800' w='100%' className='App'>
			<Header />
			<AppRouter user={user} />
		</Box>
	)
}

export default App
