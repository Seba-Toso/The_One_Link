/* eslint-disable no-useless-escape */
import { useRef } from 'react'
import {
	Heading,
	Button,
	FormControl,
	FormLabel,
	Input,
	FormErrorMessage,
} from '@chakra-ui/react'
import { Formik, Form, Field } from 'formik'
import { createLink, updateLink } from '../helpers/linksHelpers'
import Alerts from '../components/Alerts'

const NewLinkForm = ({
	addNewLink,
	changeUpdatedLink,
	formFor,
	name,
	source,
	uri,
	id,
	handleAlerts,
}) => {
	const alertRef = useRef()
	const inputValues =
		formFor === 'New'
			? {
					name: '',
					source: '',
					link: '',
			  }
			: {
					name: name,
					source: source,
					link: uri,
			  }

	function validateName(value) {
		let error
		if (!value) {
			error = 'A Name is required'
		}
		return error
	}
	function validateSource(value) {
		let error
		if (!value) {
			error = 'A Source is required'
		}
		return error
	}
	function validateLink(value) {
		let error
		if (!value) {
			error = 'A Link is required'
		} else if (
			!/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi.test(
				value
			)
		) {
			error = 'Link do not match with a valid url'
		}
		return error
	}

	const handleSubmit = async (name, source, uri) => {
		formFor === 'Add'
			? createLink(name, source, uri)
					.then((response) => {
						addNewLink(response)
					})
					.catch((error) => handleAlerts('error', error))
			: updateLink(name, source, uri, id)
					.then(changeUpdatedLink(name, source, uri, id))
					.catch((error) => handleAlerts('error', error))
	}

	return (
		<>
			<Heading color='tomato' mb={16}>
				{formFor} Link
			</Heading>

			<Formik
				initialValues={inputValues}
				onSubmit={(values, { setSubmitting, resetForm }) => {
					setSubmitting(true)
					const { name, source, link: uri } = values
					handleSubmit(name, source, uri)
						.then(
							resetForm({
								values: { name: '', source: '', link: '' },
							})
						)
						.catch((error) => alert(error))
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
						<Field name='name' validate={validateName}>
							{({ field, form }) => (
								<FormControl isInvalid={form.errors.name && form.touched.name}>
									<FormLabel htmlFor='name' mt={4}>
										Name
									</FormLabel>
									<Input {...field} id='name' placeholder='Frodo Baggins' />
									<FormErrorMessage>{form.errors.name}</FormErrorMessage>
								</FormControl>
							)}
						</Field>

						<Field name='source' validate={validateSource}>
							{({ field, form }) => (
								<FormControl
									isInvalid={form.errors.source && form.touched.source}
								>
									<FormLabel htmlFor='source' mt={4}>
										Source
									</FormLabel>
									<Input {...field} id='source' placeholder='The Shire' />
									<FormErrorMessage>{form.errors.source}</FormErrorMessage>
								</FormControl>
							)}
						</Field>

						<Field name='link' validate={validateLink}>
							{({ field, form }) => (
								<FormControl isInvalid={form.errors.link && form.touched.link}>
									<FormLabel htmlFor='link' mt={4}>
										Link
									</FormLabel>
									<Input
										{...field}
										id='link'
										placeholder='https://lotr.fandom.com/wiki/Shire'
									/>
									<FormErrorMessage>{form.errors.link}</FormErrorMessage>
								</FormControl>
							)}
						</Field>

						<Button
							mt={4}
							colorScheme='teal'
							isLoading={isSubmitting}
							type='submit'
						>
							{formFor === 'Add' ? 'Create' : 'Update'}
						</Button>
					</Form>
				)}
			</Formik>
			<Alerts ref={alertRef} />
		</>
	)
}

export default NewLinkForm
