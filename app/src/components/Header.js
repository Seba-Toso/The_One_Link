import { Box, IconButton, useColorMode, Flex, Heading, useMediaQuery, Spacer } from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import UserControl from './UserControl'

function Header() {
	const { colorMode, toggleColorMode } = useColorMode()
	const [isSmallerThan1025] = useMediaQuery("(max-width: 1025px)")
	const [isSmallerThan415] = useMediaQuery("(max-width: 415px)")

	return (
		<Box bg='tomato' w='100%' position={'relative'}>
			<Flex p={isSmallerThan1025 ? 6 : 8} >
				<Heading size={isSmallerThan1025 ? 'lg' : '2xl'} color='white'>
					<a href='/' rel='noreferrer'>
						{
							isSmallerThan415 ? 
							'One Link'
							:
							'One Link to rule them all.'
						}
					</a>
				</Heading>
				<Spacer />
				<Flex position={'relative'} alignItems='flex-end'>
					<IconButton
						isRound={true}
						size={isSmallerThan415 ? 'sm' : 'md'}
						variant='solid'
						colorScheme={colorMode === 'light' ? 'blackAlpha' : 'whiteAlpha'}
						backgroundColor={colorMode === 'light' ? 'whiteAlpha.500' : 'blackAlpha.500'}
						aria-label='colorMode'
						icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
						onClick={toggleColorMode}
					/>
					<UserControl 
						isForHeader 
						isSmallerThan1025={isSmallerThan1025} 
						isSmallerThan415={isSmallerThan415} 
					/>
				</Flex>
			</Flex>
		</Box>
	)
}

export default Header
