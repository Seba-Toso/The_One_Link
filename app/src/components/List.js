import {useState} from 'react'
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
	const [filteredList, setFilteredList] = useState(linkList)
	const [isListManipulated, setIsListManipulated] = useState(false)
	const [isSortedBy, setIsSortedBy] = useState()
	const handleSort = (sortType) => {
		setIsSortedBy(sortType)
		console.log('sorted by: ', isSortedBy)
		linkList.sort( (a, b) => {
			if (a[sortType].toLowerCase() < b[sortType].toLowerCase()) {
				return -1;
			}
			if (a[sortType].toLowerCase() > b[sortType].toLowerCase()) {
				return 1;
			}
			return 0;
		})
	}
	
	const handleSearch = (searchKeys) => {
		let updatedLinks = linkList

		if(searchKeys.name.length < 2){
			updatedLinks = linkList
		}
		if(searchKeys.name.length >= 2){
			updatedLinks = updatedLinks.filter( link => link.name.toLowerCase().startsWith(searchKeys.name.toLowerCase()) )
		}
		if(searchKeys.source.length >= 2){
			updatedLinks = updatedLinks.filter( link => link.source.toLowerCase().startsWith(searchKeys.source.toLowerCase()) )
		}
		if(updatedLinks.length === linkList.length){
			setFilteredList(updatedLinks)
			return setIsListManipulated(false)
		}
		setFilteredList(updatedLinks)
		setIsListManipulated(true)
	}

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
		return filteredList.map((link) => {
			return (
				<ListLi
					key={link.id}
					link={link}
					handleDeleteLink={deleteLink}
					handleUdpdateLink={handleUpdate}
					isListManipulated={isListManipulated}
				/>
			)
		})
	}

	return (
		<>
			{!isSmallerThan1025 && <UserControl />}
			{
				isSmallerThan1025 &&
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
							<Filters setSorting={handleSort} setSearch={handleSearch} />
						</MenuList>
						</Menu>
				</Tooltip>
			}
			<Box mt={isSmallerThan1025 && 2}>
				<Flex >
					<List 
						spacing={5} 
						borderLeft={isSmallerThan1025? 'none' : '1px dotted' } 
						mr={isSmallerThan1025? 0 : 0}
						w={isSmallerThan1025? '100%': '60%'}

					>
						{!filteredList || filteredList.length === 0 ? (
							<Text ml={20} bg={liBackground} p={isSmallerThan1025? 0 : 3} textAlign='center'>
								Start adding links
							</Text>
						) : (
							handleListItem()
						)}
					</List>
					<Spacer />
					{
						!isSmallerThan1025 &&
						<Filters setSorting={handleSort} setSearch={handleSearch}/>
					}
				</Flex>
			</Box>
		</>
	)
}

export default LinksList
