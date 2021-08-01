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
import { useState } from 'react'

const Filters = ({ setSorting, setSearch }) => {
	const [isSmallerThan1025] = useMediaQuery("(max-width: 1025px)")
	const [isSmallerThan1350] = useMediaQuery("(max-width: 1350px)")

	const handleSort = (event) => {
		const { target } = event
		switch (target.value) {
			case '0':
				setSorting('id')
				break;

			case '1':
				setSorting('name')
				break

			case '2':
				setSorting('source')
				break

			default:
				setSorting('id')
				break;
		}
	}

	const [searchKeys, setSearchKeys] = useState({name: '', source: ''})
	const handleSearch = (event) => {
		const {target} = event
		console.log(target.value)
		switch (target.name) {
			case "name":
				const updatedSearchKeysbyName = {...searchKeys, name: target.value}
				setSearchKeys(updatedSearchKeysbyName)
				break;
	
			case 'source':
				const updatedSearchKeysbySource = {...searchKeys, source: target.value}
				setSearchKeys(updatedSearchKeysbySource)
				break;

			default:
				break;
		}
		setSearch(searchKeys)
	}

	return (
		<>
			<Container
				h='100%'
				w={isSmallerThan1025? '100%' : '35%'}
				maxWidth='unset'
				borderWidth='1px'
				borderRadius='lg'
				mt={isSmallerThan1025? 0 : 9}
				id='Filters'
			>
				<Heading color='tomato' size='lg' mb={4} mt={4}>
					Organize (soon...)
				</Heading>
				<Divider mb={4} />
				<Heading color='tomato' size='md' mb={4}>
					Search
				</Heading>
				<Input variant='filled' name='name' placeholder='Search by name' mb={4} onChange={handleSearch} value={searchKeys.name}/>
				<Input variant='filled' name='source' placeholder='Search by source' mb={4} onChange={handleSearch} value={searchKeys.source}/>
				<Divider mb={4} />
				<Heading color='tomato' size='md' mb={4}>
					Sort
				</Heading>
				<RadioGroup defaultValue='0' mb={4}>
					<Stack spacing={5} direction={isSmallerThan1350 ? 'column' : 'row'}>
						<Radio
							colorScheme='orange'
							value='0'
							onChange={handleSort}
							isDisabled={false}
						>
							Date
						</Radio>
						<Radio
							colorScheme='messenger'
							value='1'
							onChange={handleSort}
							isDisabled={false}
						>
							Name
						</Radio>
						<Radio
							colorScheme='teal'
							value='2'
							onChange={handleSort}
							isDisabled={false}
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
