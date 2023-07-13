import express from 'express'
import {
	getQuiz,
	createQuiz,
	deleteQuiz,
	updateQuiz,
	getAllQuizzes
} from '../controllers/quiz.js'

import {
	createQuestion,
	updateQuestion,
	deleteQuestion,
	getAllQuestions
} from '../controllers/question.js'

import {
	createOption,
	updateOption,
	deleteOption,
	getAllOptions
} from '../controllers/option.js'

import { submitQuiz, getAllParticipants } from '../controllers/participant.js'

import { isAuthenticated, isOwner } from '../middlewares/auth.js'

import {
	validateCreateQuiz,
	validateUpdateQuiz,
	validateCreateQuestion,
	validateUpdateQuestion,
	validateCreateOption,
	validateUpdateOption
} from '../middlewares/validate.js'

const router = express.Router()

// Quiz Creation Route
router.get('/:quizId', getQuiz)
router.get('/', getAllQuizzes)
router.delete('/:quizId', isAuthenticated, isOwner, deleteQuiz)
router.post('/', isAuthenticated, validateCreateQuiz, createQuiz)
router.patch(
	'/:quizId',
	isAuthenticated,
	isOwner,
	validateUpdateQuiz,
	updateQuiz
)

// Question Creation Route
router.get('/:quizId/questions', isAuthenticated, isOwner, getAllQuestions)

router.post(
	'/:quizId/questions',
	isAuthenticated,
	isOwner,
	validateCreateQuestion,
	createQuestion
)
router.patch(
	'/:quizId/questions/:questionId',
	isAuthenticated,
	isOwner,
	validateUpdateQuestion,
	updateQuestion
)
router.delete(
	'/:quizId/questions/:questionId',
	isAuthenticated,
	isOwner,
	deleteQuestion
)

// Option Creation Route
router.post(
	'/:quizId/questions/:questionId/options',
	isAuthenticated,
	validateCreateOption,
	createOption
)
router.delete(
	'/:quizId/questions/:questionId/options/:optionId',
	isAuthenticated,
	isOwner,
	deleteOption
)
router.patch(
	'/:quizId/questions/:questionId/options/:optionId',
	isAuthenticated,
	isOwner,
	validateUpdateOption,
	updateOption
)
router.get(
	'/:quizId/questions/:questionId/options',
	isAuthenticated,
	isOwner,
	getAllOptions
)

// Submit quiz by participant
router.post('/:quizId/submit', submitQuiz)
router.get(
	'/:quizId/participants',
	isAuthenticated,
	isOwner,
	getAllParticipants
)

// Catch All for Invalid HTTP Methods
// router.all('*', methodNotAllowed)

export default router
