import express from 'express'
import {
	createQuiz,
	getQuizById,
	getAllQuizzesOfUser
} from '../controllers/quiz.js'
import { isAuthenticated } from '../middlewares/auth.js'
import { validateCreateQuiz } from '../middlewares/validate.js'

const router = express.Router()

// Quiz Creation Route
router.post('/', isAuthenticated, validateCreateQuiz, createQuiz)
router.get('/:id', getQuizById)
router.get('/', isAuthenticated, getAllQuizzesOfUser)

// Catch All for Invalid HTTP Methods
// router.all('*', methodNotAllowed)

export default router
