import express from 'express'
import {
	createQuiz,
	getQuiz,
	deleteQuiz,
	updateQuiz,
	getAllQuizzes
} from '../controllers/quiz.js'

import {
	createQuestions,
	getAllQuestions,
	updateQuestion,
	deleteQuestion
} from '../controllers/question.js'

import { submitQuiz, getAllParticipants } from '../controllers/participant.js'

import { isAuthenticated, isOwner } from '../middlewares/auth.js'

import {
	validateCreateQuiz,
	validateUpdateQuiz,
	validateCreateQuestions,
	validateUpdateQuestion
} from '../middlewares/validate.js'

const router = express.Router()

// Quiz Creation Route
router.get('/:id', getQuiz)
router.get('/', isAuthenticated, getAllQuizzes)
router.delete('/:id', isAuthenticated, isOwner, deleteQuiz)
router.post('/', isAuthenticated, validateCreateQuiz, createQuiz)
router.patch('/:id', isAuthenticated, isOwner, validateUpdateQuiz, updateQuiz)

// Question Creation Route
router.get('/:id/questions', getAllQuestions)
router.post(
	'/:id/questions',
	isAuthenticated,
	isOwner,
	validateCreateQuestions,
	createQuestions
)
router.patch(
	'/:id/questions/:questionId',
	isAuthenticated,
	isOwner,
	validateUpdateQuestion,
	updateQuestion
)
router.delete(
	'/:id/questions/:questionId',
	isAuthenticated,
	isOwner,
	deleteQuestion
)

// Submit quiz by participant
router.post('/:id/submit', submitQuiz)
router.get('/:id/participants', isAuthenticated, isOwner, getAllParticipants)

// Catch All for Invalid HTTP Methods
// router.all('*', methodNotAllowed)

export default router
