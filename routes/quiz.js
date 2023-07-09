import express from 'express'
import {
	createQuiz,
	getQuizById,
	getAllQuiz,
	deleteQuizById,
	updateQuizById
} from '../controllers/quiz.js'
import {
	createQuestionInQuiz,
	updateQuestionInQuiz,
	deleteQuestionInQuiz,
	getAllQuestionsInQuiz
} from '../controllers/question.js'
import { isAuthenticated } from '../middlewares/auth.js'
import {
	validateCreateQuiz,
	validateUpdateQuiz
} from '../middlewares/validate.js'

const router = express.Router()

// Quiz Creation Route
router.post('/', isAuthenticated, validateCreateQuiz, createQuiz)
router.get('/:id', getQuizById)
router.get('/', isAuthenticated, getAllQuiz)
router.delete('/:id', isAuthenticated, deleteQuizById)
router.patch('/:id', isAuthenticated, validateUpdateQuiz, updateQuizById)

// Question Creation Route
router.get('/:id/questions', getAllQuestionsInQuiz)
router.post('/:id/questions', isAuthenticated, createQuestionInQuiz)
router.patch(
	'/:id/questions/:questionId',
	isAuthenticated,
	updateQuestionInQuiz
)
router.delete(
	'/:id/questions/:questionId',
	isAuthenticated,
	deleteQuestionInQuiz
)

// Catch All for Invalid HTTP Methods
// router.all('*', methodNotAllowed)

export default router
