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
} from '@chakra-ui/react'

const LinksList = ({ linkList, setLinkList, handleAlerts }) => {
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

			<Box w='100%'>
				<Flex>
					<List spacing={5} borderLeft='1px dotted' pl={10} w='60%'>
						{!linkList || linkList.length === 0 ? (
							<Text ml={20} bg={liBackground} p={3} textAlign='center'>
								Start adding links
							</Text>
						) : (
							handleListItem()
						)}
					</List>
					<Spacer />
					<Filters /*setSorting={handleSort}*/ />
				</Flex>
			</Box>
		</>
	)
}

export default LinksList
