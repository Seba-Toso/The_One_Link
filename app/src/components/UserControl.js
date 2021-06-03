import { Heading } from '@chakra-ui/react'
import { useContext } from 'react'
import { Context } from '../context/context'
import {
	Box,
	Flex,
	Spacer,
	Avatar,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
} from '@chakra-ui/react'

const UserControl = () => {
	const [user, setUser] = useContext(Context)

	const handleLogout = () => {
		window.localStorage.removeItem('loggedUser')
		setUser(false)
	}

	return (
		<Box w='100%'>
			<Flex>
				<Heading color='Gray 800' mb={16} ml={20} pl={10}>
					Your Links, {user.name}
				</Heading>
				<Spacer />
				<Menu>
					<MenuButton>
						<Avatar
							size='lg'
							name={user.name}
							//src='https://bit.ly/ryan-florence'
						/>
					</MenuButton>
					<MenuList>
						<MenuItem onClick={handleLogout}>Logout</MenuItem>
					</MenuList>
				</Menu>
			</Flex>
		</Box>
	)
}

export default UserControl
