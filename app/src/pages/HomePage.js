import { useState, useEffect, useRef } from 'react'
import { getLinks } from '../helpers/linksHelpers'
import NewLinkForm from '../components/NewLinkForm'
import LinksList from '../components/List'
import Alerts from '../components/Alerts'
import { Box, useColorMode, Flex, Spacer, useMediaQuery, Menu, MenuButton, MenuList, IconButton,  } from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'
const HomePage = ({ user }) => {

	const [isSmallerThan1025] = useMediaQuery("(max-width: 1025px)")
	const { colorMode } = useColorMode()
	const alertRef = useRef()
	//List
	const [linkList, setLinkList] = useState(null)
	
	console.log(isSmallerThan1025)

	useEffect(() => {
		getLinks()
			.then((response) => {
				const fetchedList = response
				setLinkList(fetchedList)
			})
			.catch((error) => {
				console.log(error)
			})
	}, [setLinkList])

	const addNewLink = (newNote) => {
		const updatedList = linkList.concat(newNote)
		setLinkList(updatedList)
		handleAlerts('create')
	}

	const handleAlerts = (alertType, message) => {
		console.log(alertType)
		console.log(message)
		alertType === 'create'
			? alertRef.current.handleOpen(
					'success',
					'Create Link',
					'Link created successfully'
			  )
			: alertType === 'delete'
			? alertRef.current.handleOpen(
					'warning',
					'Delete Link',
					'Link deleted successfully'
			  )
			: alertType === 'update'
			? alertRef.current.handleOpen(
					'info',
					'Update Link',
					'Link updated successfully'
			  )
			: alertRef.current.handleOpen('error', 'Error', 'Problem with solicitude')
	}

	//------
	return (
		<Flex p={10} display={{ md: 'flex' }} flexDirection={isSmallerThan1025? 'column': 'row'}>
			<>
				{
					isSmallerThan1025 ?
					<Menu>
						<MenuButton
							w='5%'
							as={IconButton}
							aria-label="Options"
							icon={<HamburgerIcon />}
							variant="outline"
						/>
						<MenuList p={4}>
							<NewLinkForm
								addNewLink={addNewLink}
								formFor='Add'
								handleAlerts={handleAlerts}
							/>
						</MenuList>
					</Menu>
					:
					<Box w='25%' h='100%' p={4} style={{position: 'fixed'}}>
						<NewLinkForm
							addNewLink={addNewLink}
							formFor='Add'
							handleAlerts={handleAlerts}
						/>
					</Box>
				}
			</>
			<Spacer />
			<Box w={isSmallerThan1025 ? '100%' : '70%'} p={4}>
				{user && (
					<LinksList
						colorMode={colorMode}
						linkList={linkList}
						setLinkList={setLinkList}
						handleAlerts={handleAlerts}
					/>
				)}
			</Box>

			<Alerts ref={alertRef} />
		</Flex>
	)
}

export default HomePage
