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
	useMediaQuery
} from '@chakra-ui/react'

const UserControl = () => {
	const [isSmallerThan1025] = useMediaQuery("(max-width: 1025px)")
	const [user, setUser] = useContext(Context)

	const handleLogout = () => {
		window.localStorage.removeItem('loggedUser')
		setUser(false)
	}

	return (
		<Box w='100%'>
			<Flex>
				<Heading color='Gray 800' mb={16} ml={isSmallerThan1025? 0 : 20} pl={isSmallerThan1025? 0 : 10}>
					Your Links, {user.name}
				</Heading>
				<Spacer />
				<Menu>
					<MenuButton>
						<Avatar
							size={isSmallerThan1025? 'md' : 'lg'}
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
