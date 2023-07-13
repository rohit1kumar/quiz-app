import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'
dotenv.config()

const sequelize = new Sequelize(
	process.env.DATABASE_NAME,
	process.env.DATABASE_USERNAME,
	process.env.DATABASE_PASSWORD,
	{
		dialect: 'postgres',
		host: process.env.DATABASE_HOST,
		port: process.env.DATABASE_PORT,
		logging: false
		// dialectOptions: {
		// 	ssl: {
		// 		// require: true,
		// 		// rejectUnauthorized: false // Set to false if the SSL/TLS certificate is self-signed or not trusted
		// 	}
		// }
	}
)

export default sequelize
