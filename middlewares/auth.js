import jwt from 'jsonwebtoken'
import { Quiz } from '../models/index.js'

export const generateAuthToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET)
}

export const isAuthenticated = async (req, res, next) => {
	const token = req.cookies?.token || req.headers.authorization?.split(' ')[1]

	if (!token) {
		return res.status(403).json({
			success: false,
			message: 'Access Denied, No Token Provided'
		})
	}

	try {
		const { id } = await jwt.verify(token, process.env.JWT_SECRET)
		req.user = { id }
		next()
	} catch (error) {
		if (error instanceof jwt.JsonWebTokenError) {
			return res.status(403).json({
				success: false,
				message: 'Invalid Token'
			})
		} else if (error instanceof jwt.TokenExpiredError) {
			return res.status(403).json({
				success: false,
				message: 'Token Expired'
			})
		}

		console.error(error)
		return res.status(500).json({
			success: false,
			message: 'Something Went Wrong'
		})
	}
}

export const isOwner = async (req, res, next) => {
	const { id } = req.user
	const { id: quizId } = req.params

	try {
		const quiz = await Quiz.findOne({ where: { id: quizId } })

		if (!quiz) {
			return res.status(404).json({
				success: false,
				message: 'Quiz not found with the given id'
			})
		}

		if (quiz.UserId !== id) {
			return res.status(403).json({
				success: false,
				message: 'Access Denied, You are not the owner of this quiz'
			})
		}

		next()
	} catch (error) {
		console.error(error)
		return res.status(500).json({
			success: false,
			message: 'Something Went Wrong'
		})
	}
}
