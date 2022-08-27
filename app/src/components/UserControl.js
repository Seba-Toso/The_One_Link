import { useContext } from 'react'
import { Context } from '../context/context'
import {
	Flex,
	Menu,
	Button, 
	Heading,
	MenuButton,
	MenuList,
	MenuItem,
} from '@chakra-ui/react'

const UserControl = ({isForHeader, isSmallerThan1025, isSmallerThan415}) => {
	const [user, setUser] = useContext(Context)

	const handleLogout = () => {
		window.localStorage.removeItem('loggedUser')
		setUser(false)
	}
	//console.log(user);
	if(!user){
		return null
	}

	if(user && !isForHeader){
		return (
			<Heading color='Gray 800' mb={16} ml={isSmallerThan1025? 0 : 20} >
			{user.name}, here are all your links
		</Heading>
		)
	}

	if(user && isForHeader){
		return (
			<Flex ml={isSmallerThan415 ? '3' : isSmallerThan1025 ? '5' : '7'}>
				<Menu placement={'bottom'} boundary={'scrollParent'} isLazy={true} size={isSmallerThan415 ? 'sm' : 'md'}>
					<MenuButton
					as={Button}
					bg='teal.300'
					borderRadius={isSmallerThan415 ? 16 : 20}
					size={isSmallerThan415 ? 'sm' : 'md'}
					>
						{user.name.substring(0, 1)}
					</MenuButton>
					<MenuList>
						<MenuItem onClick={handleLogout} fontSize={isSmallerThan415 && 'sm'}>Logout</MenuItem>
					</MenuList>
				</Menu>
			</Flex>
		)
	}
}

export default UserControl
