import { DataTypes } from 'sequelize'
import sequelize from '../helpers/database.js'

const Quiz = sequelize.define('Quiz', {
	title: { type: DataTypes.STRING, allowNull: false },
	description: { type: DataTypes.STRING, allowNull: false }
})

export default Quiz
