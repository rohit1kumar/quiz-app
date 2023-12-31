import { Participant } from '../models/index.js'
import { calculateScore } from '../helpers/calculateScore.js'
import sequelize from '../helpers/database.js'

export const submitQuiz = async (req, res) => {
	const t = await sequelize.transaction()

	try {
		const { name, email, answers } = req.body
		const { quizId } = req.params // quizId

		let participant = await Participant.findOne(
			{
				where: { email, QuizId: quizId } // check if participant has already submitted the quiz
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
			{ name, email, QuizId: quizId },
			{ transaction: t }
		)

		const score = await calculateScore(answers, t)

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

export const getAllParticipants = async (req, res) => {
	try {
		const { quizId } = req.params // quizId
		// chcek if its valid user

		const participants = await Participant.findAll({
			where: { QuizId: quizId },
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
