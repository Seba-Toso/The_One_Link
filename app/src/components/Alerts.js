import { forwardRef, useImperativeHandle, useState } from 'react'
import {
	Alert,
	AlertDialog,
	AlertIcon,
	AlertTitle,
	AlertDescription,
	AlertDialogOverlay,
	AlertDialogContent,
	useDisclosure,
} from '@chakra-ui/react'

const Alerts = forwardRef((_props, ref) => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const [alertData, setAlertData] = useState({
		status: '',
		title: '',
		description: '',
	})

	const shutDown = () => {
		setTimeout(() => {
			onClose()
		}, 2000)
	}

	const handleOpen = (status, title, description) => {
		setAlertData({
			status: status,
			title: title,
			description: description,
		})
		onOpen()
		shutDown()
	}

	useImperativeHandle(ref, () => {
		return { handleOpen }
	})

	return (
		<>
			<AlertDialog
				size='xl'
				motionPreset='slideInBottom'
				onClose={onClose}
				isOpen={isOpen}
				isCentered
			>
				<AlertDialogOverlay />

				<AlertDialogContent>
					<Alert status={alertData.status} variant='top-accent'>
						<AlertIcon />
						<AlertTitle mr={2}>{alertData.title}</AlertTitle>
						<AlertDescription>{alertData.description}</AlertDescription>
					</Alert>
				</AlertDialogContent>
			</AlertDialog>
		</>
	)
})

export default Alerts
