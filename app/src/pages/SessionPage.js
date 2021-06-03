import React, { useState } from 'react'
import { useContext } from 'react'
import { Context } from '../context/context'
import { setToken } from '../helpers/linksHelpers'
import {
	Heading,
	Button,
	FormControl,
	FormLabel,
	Input,
	FormErrorMessage,
	InputGroup,
	InputRightElement,
	Container,
} from '@chakra-ui/react'
import { Formik, Form, Field } from 'formik'
import { createUser, logUser } from '../helpers/userHelpers'

const SessionForm = () => {
	// eslint-disable-next-line no-unused-vars
	const [user, setUser] = useContext(Context)

	const [isNewUser, setIsNewUser] = useState(false)
	const handleChangeForm = () => {
		setIsNewUser(!isNewUser)
	}

	const [show, setShow] = useState(false)
	const handleClick = () => setShow(!show)

	function validateName(value) {
		let error
		if (!value) {
			error = 'Name is required'
		}
		return error
	}
	function validateUsername(value) {
		let error
		if (!value) {
			error = 'Username is required'
		}
		return error
	}
	function validatePassword(value) {
		let error
		if (!value) {
			error = 'Password is required'
		} else if (value.length <= 4) {
			error = 'Password has to be larger than 4 characters'
		}
		return error
	}

	return (
		<Container p={10}>
			<Heading color='tomato' mb={16} textAlign='center'>
				{isNewUser ? 'Logon' : 'Login'}
			</Heading>

			<Formik
				initialValues={{ name: '', username: '', password: '' }}
				onSubmit={(values, { setSubmitting, resetForm }) => {
					setSubmitting(true)
					const { name, username, password } = values
					if (isNewUser) {
						createUser(name, username, password)
							.then(alert('User created'))
							.then(
								resetForm({
									values: { name: '', username: '', password: '' },
								})
							)
							.then(alert('Thanks for create an account, please login'))
							.then(setIsNewUser(false))
							.then(setSubmitting(false))
							.catch((error) => alert(error))
					} else {
						logUser(username, password)
							.then(alert('User logged'))
							.then((response) => {
								setToken(response.token)
								setUser(response)
								window.localStorage.setItem(
									'loggedUser',
									JSON.stringify(response)
								)
							})
							.then(
								resetForm({
									values: { username: '', password: '' },
								})
							)
							.then(setSubmitting(false))
							.catch((error) => alert(error))
					}
				}}
			>
				{({
					//values,
					//errors,
					//touched,
					//handleChange,
					//handleBlur,
					//handleSubmit,
					isSubmitting,
					/* and other goodies */
				}) => (
					<Form>
						{isNewUser && (
							<Field name='name' validate={validateName}>
								{({ field, form }) => (
									<FormControl
										isInvalid={form.errors.name && form.touched.name}
									>
										<FormLabel htmlFor='name'>Name</FormLabel>
										<Input {...field} id='name' placeholder='name' />
										<FormErrorMessage>{form.errors.name}</FormErrorMessage>
									</FormControl>
								)}
							</Field>
						)}
						<Field name='username' validate={validateUsername}>
							{({ field, form }) => (
								<FormControl
									isInvalid={form.errors.username && form.touched.username}
								>
									<FormLabel htmlFor='username'>Username</FormLabel>
									<Input {...field} id='username' placeholder='username' />
									<FormErrorMessage>{form.errors.username}</FormErrorMessage>
								</FormControl>
							)}
						</Field>
						<Field name='password' validate={validatePassword}>
							{({ field, form }) => (
								<FormControl
									isInvalid={form.errors.password && form.touched.password}
								>
									<FormLabel htmlFor='password'>Password</FormLabel>
									<InputGroup size='md'>
										<Input
											{...field}
											type={show ? 'text' : 'password'}
											id='password'
											placeholder='password'
										/>
										<InputRightElement width='4.5rem'>
											<Button h='1.75rem' size='sm' onClick={handleClick}>
												{show ? 'Hide' : 'Show'}
											</Button>
										</InputRightElement>
									</InputGroup>
									<FormErrorMessage>{form.errors.password}</FormErrorMessage>
								</FormControl>
							)}
						</Field>
						<Button
							mt={4}
							colorScheme='teal'
							isLoading={isSubmitting}
							type='submit'
						>
							{!isNewUser ? 'Login' : 'Register'}
						</Button>
					</Form>
				)}
			</Formik>

			<Button mt={16} float='right' onClick={handleChangeForm}>
				{isNewUser
					? 'Speak friend and enter'
					: 'One Does Not Simply Walk Into...'}
			</Button>
		</Container>
	)
}

export default SessionForm
