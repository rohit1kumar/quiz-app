import { Participant } from '../models/index.js'
import { calculateScore } from '../helpers/calculateScore.js'
import sequelize from '../helpers/database.js'

export const submitQuizByParticipant = async (req, res) => {
	const t = await sequelize.transaction()

	try {
		const { name, email, answers } = req.body
		const { id } = req.params // quizId

		let participant = await Participant.findOne(
			{
				where: { email }
			},
			{ transaction: t }
		)

		if (participant) {
			await t.rollback()
			return res.status(400).json({
				success: false,
				message: 'You have already submitted the quiz'
			})
		}

		participant = await Participant.create(
			{ name, email, QuizId: id },
			{ transaction: t }
		)

		const score = await calculateScore(answers)

		participant.score = score
		await participant.save({ transaction: t })

		await t.commit()

		return res.status(200).json({
			success: true,
			message: 'Quiz submitted successfully',
			data: participant
		})
	} catch (err) {
		await t.rollback()
		return res.status(500).json({
			success: false,
			message: 'Failed to submit quiz, please try again',
			error: err.message
		})
	}
}

export const getAllParticipantsByQuizId = async (req, res) => {
	try {
		const { id } = req.params // quizId
		// chcek if its valid user

		const participants = await Participant.findAll({
			where: { QuizId: id },
			attributes: ['name', 'email', 'score']
		})

		return res.status(200).json({
			success: true,
			message: 'Participants fetched successfully',
			data: participants
		})
	} catch (err) {
		return res.status(500).json({
			success: false,
			message: 'Failed to fetch participants, please try again',
			error: err.message
		})
	}
}
