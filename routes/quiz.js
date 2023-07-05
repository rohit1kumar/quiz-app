import express from 'express'
import { createQuiz } from '../controllers/quiz.js'
import { isAuthenticated } from '../middlewares/auth.js'

const router = express.Router()

// Quiz Creation Route
router.post('/', isAuthenticated, createQuiz)

// Catch All for Invalid HTTP Methods
// router.all('*', methodNotAllowed)

export default router
