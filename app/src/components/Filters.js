import {
	Input,
	Stack,
	RadioGroup,
	Radio,
	Container,
	Heading,
	Divider,
	useMediaQuery
} from '@chakra-ui/react'

const Filters = ({ setSorting }) => {
	const [isSmallerThan1025] = useMediaQuery("(max-width: 1025px)")
	const handleSort = (event) => {
		const { target } = event
		setSorting(target.value === '1' ? 'alphabetic' : 'source')
	}

	return (
		<>
			<Container
				h='100%'
				w={isSmallerThan1025? '40%' : '35%'}
				borderWidth='1px'
				borderRadius='lg'
				mt={9}
				id='Filters'
			>
				<Heading color='tomato' size='lg' mb={4} mt={4}>
					Organize (soon...)
				</Heading>
				<Divider mb={4} />
				<Heading color='tomato' size='md' mb={4}>
					Search
				</Heading>
				<Input variant='filled' placeholder='Search by name' mb={4} />
				<Input variant='filled' placeholder='Search by source' mb={4} />
				<Divider mb={4} />
				<Heading color='tomato' size='md' mb={4}>
					Sort
				</Heading>
				<RadioGroup defaultValue='1' mb={4}>
					<Stack spacing={5} direction='row'>
						<Radio
							colorScheme='red'
							value='1'
							onChange={handleSort}
							isDisabled={true}
						>
							Alphabetic
						</Radio>
						<Radio
							colorScheme='yellow'
							value='2'
							onChange={handleSort}
							isDisabled={true}
						>
							Source
						</Radio>
					</Stack>
				</RadioGroup>
			</Container>
		</>
	)
}

export default Filters
