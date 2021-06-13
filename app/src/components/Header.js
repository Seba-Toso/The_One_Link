import { Box, IconButton, useColorMode, Flex, Heading, useMediaQuery } from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'

function Header() {
	const { colorMode, toggleColorMode } = useColorMode()
	const [isSmallerThan1025] = useMediaQuery("(max-width: 1025px)")
	
	return (
		<Box bg='tomato' w='100%'>
			<Flex p={10}>
				<Heading w='100%' size={useMediaQuery ? 'xl' : '3xl'} color='white'>
					One Link to rule them all.
				</Heading>
				<IconButton
					isRound={true}
					size='lg'
					variant='solid'
					colorScheme={colorMode === 'light' ? 'whiteAlpha' : 'yellow'}
					aria-label='colorMode'
					icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
					onClick={toggleColorMode}
				/>
			</Flex>
		</Box>
	)
}

export default Header
