import express from 'express'
import { registerUser, loginUser, logoutUser } from '../controllers/user.js'
import { validateLogin, validateRegister } from '../middlewares/validate.js'
const router = express.Router()

// User Registration Route
router.post('/register', validateRegister, registerUser)

// User Login Route
router.post('/login', validateLogin, loginUser)

// User Logout Route
router.post('/logout', logoutUser)

// Catch All for Invalid HTTP Methods
// router.all('*', methodNotAllowed)

export default router
