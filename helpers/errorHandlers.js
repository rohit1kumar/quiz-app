import sequelize from './database.js'
const routeNotFound = (req, res) => {
	return res.status(404).json({
		success: false,
		message: 'Route does not exist, please check your URL'
	})
}

const methodNotAllowed = (req, res) => {
	return res.status(405).json({
		success: false,
		message: 'Method not allowed, please check your HTTP method'
	})
}

const errorHandler = (err, req, res, next) => {
	console.error(err)
	res.status(500).json({
		success: false,
		message: 'Something went wrong',
		error: process.env.NODE_ENV === 'development' ? err.stack : {}
	})
	next()
}

// Handle uncaught exceptions and rejections
async function handleFatalError(err) {
	console.log('Fatal error occurred', err)
	process.exit(1)
}

// Handle graceful shutdown
async function gracefulShutdown() {
	console.log('Graceful shutdown started')
	await sequelize.close()
	process.exit(0)
}

export {
	routeNotFound,
	methodNotAllowed,
	handleFatalError,
	gracefulShutdown,
	errorHandler
}
