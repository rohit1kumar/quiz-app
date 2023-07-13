// Import necessary modules
import dotenv from 'dotenv'
import express from 'express'
import cookieParser from 'cookie-parser'

import sequelize from './helpers/database.js'
import userRoutes from './routes/user.js'
import quizRoutes from './routes/quiz.js'

import {
	gracefulShutdown,
	handleFatalError,
	routeNotFound,
	errorHandler
} from './helpers/errorHandlers.js'

// Setup dotenv
dotenv.config()

// Setup Express app
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// Health check endpoint
app.get('/', (req, res) => {
	res.status(200).send('OK')
})

// User Routes
app.use('/api/v1/users', userRoutes)
app.use('/api/v1/quizzes', quizRoutes)

app.use('*', routeNotFound)

app.use(errorHandler)

// Start the server
const port = process.env.PORT || 4000

app.listen(port, async () => {
	try {
		console.log('Connecting to database...')
		await sequelize.authenticate()
		await sequelize.sync()
		console.log('DB connection has been established successfully.')
		console.log(`Server listening on port ${port}`)
	} catch (error) {
		console.error('Unable to connect to the database:', error)
		sequelize.close()
	}
})

process.on('SIGTERM', gracefulShutdown)
process.on('SIGINT', gracefulShutdown)

process.on('uncaughtException', handleFatalError)
process.on('unhandledRejection', handleFatalError)
