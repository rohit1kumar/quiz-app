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
			for (const { question, options } of questions) {
				const qObj = await Question.create(
					{
						text: question,
						QuizId: quiz.id
					},
					{ transaction: t }
				)

				if (options && options.length > 0) {
					const optionPromises = options.map(({ option, isCorrect = false }) =>
						Option.create(
							{
								text: option,
								isCorrect,
								QuestionId: qObj.id
							},
							{ transaction: t }
						)
					)

					await Promise.all(optionPromises)
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
		console.error(err)
		await t.rollback()

		return res.status(500).json({
			success: false,
			message: 'Something Went Wrong',
			error: err.message
		})
	}
}

export const getQuizById = async (req, res) => {
	try {
		const { id } = req.params
		const quiz = await Quiz.findOne({
			where: { id },
			include: [
				{
					model: Question,
					include: [Option, { model: Option, attributes: ['text', 'id'] }]
				}
			]
		})

		if (!quiz) {
			return res.status(404).json({
				success: false,
				message: 'Quiz Not Found'
			})
		}

		return res.status(200).json({
			success: true,
			message: 'Quiz Fetched Successfully',
			data: quiz
		})
	} catch (err) {
		console.error(err)

		return res.status(500).json({
			success: false,
			message: 'Something Went Wrong',
			error: err.message
		})
	}
}

export const getAllQuizzesOfUser = async (req, res) => {
	try {
		const { id } = req.user

		const quizzes = await Quiz.findAll({
			where: { UserId: id },
			include: [
				{
					model: Question,
					include: [Option]
				}
			]
		})

		return res.status(200).json({
			success: true,
			message: 'Quizzes Fetched Successfully',
			data: quizzes
		})
	} catch (err) {
		console.error(err)

		return res.status(500).json({
			success: false,
			message: 'Something Went Wrong',
			error: err.message
		})
	}
}
