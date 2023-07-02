import express from 'express'
import { registerUser, loginUser, logoutUser } from '../controllers/user.js'

const router = express.Router()

// User Registration Route
router.post('/register', registerUser)

// User Login Route
router.post('/login', loginUser)

// User Logout Route
router.post('/logout', logoutUser)

// Catch All for Invalid HTTP Methods
// router.all('*', methodNotAllowed)

export default router
