import express from 'express'
import {
	createQuiz,
	getQuizById,
	getAllQuiz,
	deleteQuizById,
	updateQuizById
} from '../controllers/quiz.js'
import { isAuthenticated } from '../middlewares/auth.js'
import { validateCreateQuiz } from '../middlewares/validate.js'

const router = express.Router()

// Quiz Creation Route
router.post('/', isAuthenticated, validateCreateQuiz, createQuiz)
router.get('/:id', getQuizById)
router.get('/', isAuthenticated, getAllQuiz)
router.delete('/:id', isAuthenticated, deleteQuizById)
router.patch('/:id', isAuthenticated, updateQuizById)

// Catch All for Invalid HTTP Methods
// router.all('*', methodNotAllowed)

export default router
