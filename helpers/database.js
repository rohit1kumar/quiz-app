import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'
dotenv.config()

const sequelize = new Sequelize(process.env.QUIZ_APP_DB_URL)

export default sequelize
