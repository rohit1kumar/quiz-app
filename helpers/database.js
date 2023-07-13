import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'

dotenv.config()

const {
	DATABASE_NAME,
	DATABASE_USERNAME,
	DATABASE_PASSWORD,
	DATABASE_HOST,
	DATABASE_PORT,
	NODE_ENV
} = process.env

let dialectOptions = {}
if (NODE_ENV !== 'development') {
	dialectOptions = {
		ssl: {
			require: true,
			rejectUnauthorized: false
		}
	}
}

const sequelize = new Sequelize(
	DATABASE_NAME,
	DATABASE_USERNAME,
	DATABASE_PASSWORD,
	{
		dialect: 'postgres',
		host: DATABASE_HOST,
		port: DATABASE_PORT,
		dialectOptions
	}
)

export default sequelize
