import { Question, Option } from '../models/index.js'
import sequelize from '../helpers/database.js'

export const createQuestions = async (req, res) => {
	const t = await sequelize.transaction()
	try {
		const { id } = req.params
		const { questions } = req.body
		const questionPromises = questions.map(async ({ question, options }) => {
			const qObj = await Question.create(
				{
					text: question,
					QuizId: id
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
		})

		const q = await Promise.all(questionPromises)
		console.log(q)
		await t.commit()

		return res.status(201).json({
			success: true,
			message: 'Quiz Created Successfully',
			data: q
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
export const getAllQuestions = async (req, res) => {
	try {
		const { id } = req.params

		const questions = await Question.findAll({
			where: { QuizId: id },
			include: [
				{
					model: Option,
					attributes: ['id', 'text', 'isCorrect']
				}
			]
		})
		if (questions.length === 0) {
			return res.status(404).json({
				success: false,
				message: 'Questions not found for the given quiz id'
			})
		}
		return res.status(200).json({
			success: true,
			message: 'Questions fetched successfully',
			data: questions
		})
	} catch (err) {
		return res.status(500).json({
			success: false,
			message: 'Failed to get questions, please try again',
			error: err.message
		})
	}
}
export const updateQuestion = async (req, res) => {
	try {
		const { questionId } = req.params
		const { question, options } = req.body

		const qObj = await Question.findOne({ where: { id: questionId } })

		if (!qObj) {
			return res.status(404).json({
				success: false,
				message: 'Question not found with the given id'
			})
		}

		if (question) {
			qObj.text = question
			await qObj.save()
		}

		if (options && options.length > 0) {
			for (const optionData of options) {
				const { id, text, isCorrect } = optionData

				if (id) {
					// Update existing option
					const option = await Option.findOne({
						where: { id, QuestionId: questionId }
					})

					if (option) {
						option.text = text
						option.isCorrect = isCorrect
						await option.save()
					}
				} else {
					// Create new option
					await Option.create({
						text,
						isCorrect,
						QuestionId: questionId
					})
				}
			}
		}

		return res.status(200).json({
			success: true,
			message: 'Question updated successfully'
		})
	} catch (err) {
		return res.status(500).json({
			success: false,
			message: 'Failed to update question, please try again',
			error: err.message
		})
	}
}
export const deleteQuestion = async (req, res) => {
	try {
		const { questionId } = req.params

		const affectedRow = await Question.destroy({ where: { id: questionId } })

		if (affectedRow === 0) {
			return res.status(404).json({
				success: false,
				message: 'Question not found with the given id'
			})
		}
		return res.status(200).json({
			success: true,
			message: 'Question deleted successfully'
		})
	} catch (err) {
		return res.status(500).json({
			success: false,
			message: 'Failed to delete question, please try again',
			error: err.message
		})
	}
}
