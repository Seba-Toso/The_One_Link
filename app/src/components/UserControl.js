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
		<Box w={isSmallerThan1025 ? '10%' : '100%'}>
			<Flex>
				{
					!isSmallerThan1025 &&
					<Heading color='Gray 800' mb={16} ml={isSmallerThan1025? 0 : 20} >
						Your Links, {user.name}
					</Heading>
				}
				{	!isSmallerThan1025 && <Spacer />}
				<Menu>
					<MenuButton>
						<Avatar
							ml={isSmallerThan1025 && '5'}
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
