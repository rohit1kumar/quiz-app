import { DataTypes } from 'sequelize'
import sequelize from '../helpers/database.js'

const Option = sequelize.define('Option', {
	text: { type: DataTypes.STRING, allowNull: false },
	isCorrect: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false }
})

export default Option
