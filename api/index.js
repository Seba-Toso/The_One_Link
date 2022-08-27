require('colors')
require('dotenv').config()
const express = require('express')
const path = require('path')
const cors = require('cors')

//Routers
const linksRouter = require('./controllers/linksRouter')
const userRouter = require('./controllers/userRouter')
const loginRouter = require('./controllers/loginRouter')
const notFoundRouter = require('./controllers/notFoundRouter')
const handleErrorRouter = require('./controllers/errorRouter')
//-------

//Mongoose - MongoDB
const mongoose = require('mongoose')
const { MONGO_DB_URI, MONGO_DB_URI_TEST, NODE_ENV } = process.env
//Different database in case of testing envirorment
const connectionString = NODE_ENV === 'test' ? MONGO_DB_URI_TEST : MONGO_DB_URI

mongoose
	.connect(connectionString, {
		//mongoose configuration
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true,
	})
	.then(() => console.log('Database connected Successfully'.black.bgGreen))
	.catch((error) =>
		console.log(`Error connecting Database: ${error}`.black.bgRed)
	)
//-------

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname,'../app/build')))

app.get('/api', (_req, _res, next) => {
	next()
})

app.get('*', (_req, _res, next) => {
	res.sendFile(
		path.join(__dirname, "../app/build/index.html"),
		(err) => {
			if(err){
				res.status(500).send(err)
			}
		}
	)
})

app.use('/api/links', linksRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)
app.use(notFoundRouter)
app.use(handleErrorRouter)

const PORT = process.env.PORT || 3001
const server = app.listen(PORT, () => {
	console.log(`Server created and running on port ${PORT}`.black.bgGreen)
})

module.exports = { app, server }
