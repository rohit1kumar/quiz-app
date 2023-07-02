import { DataTypes } from 'sequelize'
import sequelize from '../helpers/database.js'

const Participant = sequelize.define('Participant', {
	name: { type: DataTypes.STRING, allowNull: false },
	email: { type: DataTypes.STRING, allowNull: false },
	score: { type: DataTypes.INTEGER, defaultValue: 0 }
})

export default Participant
