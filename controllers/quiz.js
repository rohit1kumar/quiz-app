import { Quiz, Question, Option } from '../models/index.js'

export const createQuiz = async (req, res) => {
	try {
		const { id } = req.user
		const { title, description } = req.body
		const quiz = await Quiz.create({ title, description, UserId: id })
		return res.status(201).json({
			success: true,
			message: 'Quiz created successfully',
			data: quiz
		})
	} catch (err) {
		return res.status(500).json({
			success: false,
			message: 'Failed to create quiz, please try again',
			error: err.message
		})
	}
}

export const getQuiz = async (req, res) => {
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
				message: 'Quiz not found with the given id'
			})
		}

		return res.status(200).json({
			success: true,
			message: 'Quiz fetched successfully',
			data: quiz
		})
	} catch (err) {
		return res.status(500).json({
			success: false,
			message: 'Failed to get quiz, please try again',
			error: err.message
		})
	}
}

export const getAllQuizzes = async (req, res) => {
	try {
		const { id } = req.user

		const quizzes = await Quiz.findAll({
			where: { UserId: id }
		})
		if (quizzes.length === 0) {
			return res.status(404).json({
				success: false,
				message: 'Quizzes not found for the given user'
			})
		}

		return res.status(200).json({
			success: true,
			message: 'Quizzes fetched successfully',
			data: quizzes
		})
	} catch (err) {
		return res.status(500).json({
			success: false,
			message: 'Failed to get quizzes, please try again',
			error: err.message
		})
	}
}

export const deleteQuiz = async (req, res) => {
	const { id } = req.params
	try {
		const affectedRow = await Quiz.destroy({ where: { id } })
		if (affectedRow !== 0) {
			return res.status(200).json({
				success: true,
				message: 'Quiz deleted successfully'
			})
		}
		return res.status(404).json({
			success: false,
			message: 'Quiz not found with the given id'
		})
	} catch (err) {
		console.error(err)
		return res.status(500).json({
			success: false,
			message: 'Failed to delete quiz, please try again',
			error: err.message
		})
	}
}
export const updateQuiz = async (req, res) => {
	try {
		const { id } = req.params
		const { title, description } = req.body
		const [affectedRow] = await Quiz.update(
			{ title, description },
			{ where: { id } }
		)
		if (affectedRow !== 0) {
			return res.status(200).json({
				success: true,
				message: 'Quiz updated successfully'
			})
		}
		return res.status(404).json({
			success: false,
			message: 'Quiz not found with the given id'
		})
	} catch (err) {
		return res.status(500).json({
			success: false,
			message: 'Failed to update quiz, please try again',
			error: err.message
		})
	}
}
