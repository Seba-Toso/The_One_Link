import { Box, IconButton, useColorMode, Flex, Heading, useMediaQuery } from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import UserControl from './UserControl'

function Header() {
	const { colorMode, toggleColorMode } = useColorMode()
	const [isSmallerThan1025] = useMediaQuery("(max-width: 1025px)")
	
	return (
		<Box bg='tomato' w='100%'>
			<Flex p={10} alignItems='center'>
				<Heading w='100%' size={isSmallerThan1025 ? 'xl' : '3xl'} color='white'>
					One Link to rule them all.
				</Heading>
				{
					isSmallerThan1025 ? 
					< >
					<IconButton
						isRound={true}
						size={isSmallerThan1025 ? 'md' : 'lg'}
						variant='solid'
						colorScheme={colorMode === 'light' ? 'blackAlpha' : 'whiteAlpha'}
						backgroundColor={colorMode === 'light' ? 'whiteAlpha.500' : 'blackAlpha.500'}
						aria-label='colorMode'
						icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
						onClick={toggleColorMode}
					/>
					<UserControl />
					</>
					:
					<IconButton
						isRound={true}
						size={isSmallerThan1025 ? 'md' : 'lg'}
						variant='solid'
						colorScheme={colorMode === 'light' ? 'blackAlpha' : 'whiteAlpha'}
						backgroundColor={colorMode === 'light' ? 'whiteAlpha.500' : 'blackAlpha.500'}
						aria-label='colorMode'
						icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
						onClick={toggleColorMode}
					/>
				}
			</Flex>
		</Box>
	)
}

export default Header
