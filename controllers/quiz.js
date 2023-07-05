import { Quiz, Question, Option } from '../models/index.js'
import sequelize from '../helpers/database.js'

export const createQuiz = async (req, res) => {
	const t = await sequelize.transaction()
	try {
		const { id } = req.user
		const { title, description, questions } = req.body
		const quiz = await Quiz.create(
			{
				title,
				description,
				UserId: id
			},
			{ transaction: t }
		)

		if (questions && questions.length > 0) {
			for (const q of questions) {
				const { question, options } = q
				const qObj = await Question.create(
					{
						text: question,
						QuizId: quiz.id
					},
					{ transaction: t }
				)
				if (!options || options.length === 0) {
					continue // Skip creating options for this question if there are none provided
				}
				for (const o of options) {
					const { option, isCorrect = false } = o
					await Option.create(
						{
							text: option,
							isCorrect,
							QuestionId: qObj.id
						},
						{ transaction: t }
					)
				}
			}
		}
		await t.commit()
		return res.status(201).json({
			success: true,
			message: 'Quiz Created Successfully',
			data: quiz
		})
	} catch (err) {
		console.log(err)
		await t.rollback()
		return res.status(500).json({
			success: false,
			message: 'Something Went Wrong',
			error: err.message
		})
	}
}
