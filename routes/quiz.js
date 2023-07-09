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

import {
	submitQuizByParticipant,
	getAllParticipantsByQuizId
} from '../controllers/participant.js'

import { isAuthenticated, isOwner } from '../middlewares/auth.js'

import {
	validateCreateQuiz,
	validateUpdateQuiz
} from '../middlewares/validate.js'

const router = express.Router()

// Quiz Creation Route
router.post('/', isAuthenticated, validateCreateQuiz, createQuiz)
router.get('/:id', getQuizById)
router.get('/', isAuthenticated, getAllQuiz)
router.delete('/:id', isAuthenticated, isOwner, deleteQuizById)
router.patch(
	'/:id',
	isAuthenticated,
	isOwner,
	validateUpdateQuiz,
	updateQuizById
)

// Question Creation Route
router.get('/:id/questions', getAllQuestionsInQuiz)
router.post('/:id/questions', isAuthenticated, isOwner, createQuestionInQuiz)
router.patch(
	'/:id/questions/:questionId',
	isAuthenticated,
	isOwner,
	updateQuestionInQuiz
)
router.delete(
	'/:id/questions/:questionId',
	isAuthenticated,
	isOwner,
	deleteQuestionInQuiz
)

// Submit quiz by participant
router.post('/:id/submit', submitQuizByParticipant)
router.get(
	'/:id/participants',
	isAuthenticated,
	isOwner,
	getAllParticipantsByQuizId
)

// Catch All for Invalid HTTP Methods
// router.all('*', methodNotAllowed)

export default router
