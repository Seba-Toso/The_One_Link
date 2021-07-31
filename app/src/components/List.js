import UserControl from './UserControl'
import Filters from './Filters'
import ListLi from './Link_List_Item'
import {
	List,
	Flex,
	Box,
	Spacer,
	useColorModeValue,
	Text,
	useMediaQuery,
	Menu, 
	MenuButton,
	MenuList, 
	IconButton, 
	Tooltip
} from '@chakra-ui/react'
import { Search2Icon } from '@chakra-ui/icons'

const LinksList = ({ linkList, setLinkList, handleAlerts }) => {

	const [isSmallerThan1025] = useMediaQuery("(max-width: 1025px)")

	//Styles
	const liBackground = useColorModeValue('gray.50', '#1e2533')

	//Link handlers
	/*
	const handleSort = (sortType = null) => {
		console.log(linkList)
		if (!sortType) {
			return
		} else if (sortType === 'alphabetic') {
			setLinkList(initialLinks.sort((a, b) => a - b))
		} else {
			setLinkList(initialLinks.sort((a, b) => b - a))
		}
	}*/

	const deleteLink = (id) => {
		const updatedLinks = linkList.filter((link) => link.id !== id)
		setLinkList(updatedLinks)
		handleAlerts('delete')
	}

	const handleUpdate = (name, source, uri, id) => {
		const updatedLinks = linkList.map((link) => {
			return link.id !== id ? link : { name: name, source: source, uri: uri }
		})
		setLinkList(updatedLinks)
		handleAlerts('update')
	}

	const handleListItem = () => {
		return linkList.map((link) => {
			return (
				<ListLi
					key={link.id}
					link={link}
					handleDeleteLink={deleteLink}
					handleUdpdateLink={handleUpdate}
				/>
			)
		})
	}

	return (
		<>
			<UserControl />
			{
				isSmallerThan1025 ?
				<Tooltip label="Search" placement="left">
					<Menu>
						<MenuButton
							w='5%'
							as={IconButton}
							aria-label="Options"
							icon={<Search2Icon />}
							variant="outline"
						/>
						<MenuList p={4} w='70vw'>
							<Filters /*setSorting={handleSort}*/ />
						</MenuList>
						</Menu>
				</Tooltip>
				:
				null
			}
			<Box mt={isSmallerThan1025 && 2}>
				<Flex >
					<List 
						spacing={5} 
						borderLeft={isSmallerThan1025? 'none' : '1px dotted' } 
						pl={isSmallerThan1025? 0 : 10} 
						mr={isSmallerThan1025? 0 : 0}
						w={isSmallerThan1025? '100%': '60%'}

					>
						{!linkList || linkList.length === 0 ? (
							<Text ml={20} bg={liBackground} p={isSmallerThan1025? 0 : 3} textAlign='center'>
								Start adding links
							</Text>
						) : (
							handleListItem()
						)}
					</List>
					<Spacer />
					{
						isSmallerThan1025 ?
						null
						:
						<Filters /*setSorting={handleSort}*/ />
					}
				</Flex>
			</Box>
		</>
	)
}

export default LinksList
