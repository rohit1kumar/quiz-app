import { Question, Option } from '../models/index.js'

export const createQuestion = async (req, res) => {
	try {
		const { quizId } = req.params // quizID
		const { questions } = req.body

		const question = await Question.bulkCreate(
			questions.map((question) => ({ ...question, QuizId: quizId }))
		)

		return res.status(201).json({
			success: true,
			message: 'Quiz Created Successfully',
			data: question
		})
	} catch (err) {
		return res.status(500).json({
			success: false,
			message: 'Something Went Wrong',
			error: err.message
		})
	}
}
export const getAllQuestions = async (req, res) => {
	try {
		const { quizId } = req.params

		const questions = await Question.findAll({
			where: { QuizId: quizId },
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
		const { text } = req.body

		const affectedRow = await Question.update(
			{ text },
			{ where: { id: questionId } }
		)
		if (affectedRow[0] === 0) {
			return res.status(404).json({
				success: false,
				message: 'Question not found with the given id'
			})
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
