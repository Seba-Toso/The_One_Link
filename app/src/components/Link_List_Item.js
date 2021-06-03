import { useState } from 'react'
import NewLinkForm from './NewLinkForm'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { deleteLink } from '../helpers/linksHelpers'
import {
	ListItem,
	Link,
	Flex,
	Spacer,
	IconButton,
	useColorModeValue,
	useDisclosure,
	Modal,
	ModalOverlay,
	ModalCloseButton,
	ModalContent,
	SlideFade,
} from '@chakra-ui/react'
import { useEffect } from 'react'

const ListLi = ({ link, handleDeleteLink, handleUdpdateLink }) => {
	const { name, source, uri, id } = link
	//Modal handler
	const { isOpen, onOpen, onClose } = useDisclosure()
	const [isFade, onToggle] = useState(false)

	//Styles
	const liBackground = useColorModeValue('gray.50', '#1e2533')
	//-------

	const handleDelete = (linkId) => {
		deleteLink(linkId)
		handleDeleteLink(linkId)
	}
	const handleupdate = (name, source, uri, linkId) => {
		handleUdpdateLink(name, source, uri, linkId)
		onClose()
	}

	useEffect(() => {
		onToggle(true)
	}, [onToggle])

	return (
		<SlideFade in={isFade} offsetY='20px'>
			<ListItem ml={20} bg={liBackground} p={3}>
				<Flex>
					<Link href={uri} isExternal ml={7} w='70%'>
						{name}
					</Link>
					<Spacer />
					<IconButton
						isRound={true}
						size='xs'
						variant='ghost'
						colorScheme='red'
						aria-label='Delete'
						icon={<DeleteIcon />}
						onClick={() => handleDelete(id)}
					/>
					<IconButton
						ml={4}
						isRound={true}
						size='xs'
						variant='ghost'
						colorScheme='whatsapp'
						aria-label='Modify'
						icon={<EditIcon />}
						onClick={() => {
							onOpen()
						}}
					/>
				</Flex>

				<Modal onClose={onClose} isOpen={isOpen} isCentered>
					<ModalOverlay />
					<ModalContent p={4}>
						<ModalCloseButton />
						<NewLinkForm
							formFor={'Update'}
							name={name}
							source={source}
							uri={uri}
							id={id}
							changeUpdatedLink={handleupdate}
						/>
					</ModalContent>
				</Modal>
			</ListItem>
		</SlideFade>
	)
}

export default ListLi
