import bcrypt from 'bcrypt'
import User from '../models/user.js'
import { generateAuthToken } from '../middlewares/auth.js'

export const registerUser = async (req, res) => {
	const { name, email, password } = req.body
	try {
		const userExist = await User.findOne({ where: { email } })
		if (userExist) {
			return res.status(400).json({
				success: false,
				message: 'Email Already In Use'
			})
		}

		const hashedPassword = await bcrypt.hash(password, 10) // 10 is salt rounds

		const user = await User.create({ name, email, password: hashedPassword })

		// create a token
		const token = generateAuthToken(user.id)

		const cookieOptions = {
			//options for the cookie
			expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), //90 days
			httpOnly: true
		}

		return res
			.status(201)
			.cookie('token', token, cookieOptions)
			.json({
				success: true,
				message: 'User Registered Successfully',
				data: {
					token: token
				}
			})
	} catch (err) {
		console.log(err)
		return res.status(500).json({
			success: false,
			message: 'Something Went Wrong',
			error: err.message
		})
	}
}

export const loginUser = async (req, res) => {
	const { email, password } = req.body
	try {
		const user = await User.findOne({ where: { email } })
		if (!user) {
			return res.status(404).json({
				success: false,
				message: 'Email Does Not Exist'
			})
		}
		const isPasswordMatch = await bcrypt.compare(password, user.password)
		if (!isPasswordMatch) {
			return res.status(400).json({
				success: false,
				message: 'Password Does Not Match'
			})
		}
		const token = generateAuthToken(user.id)
		const cookieOptions = {
			expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
			httpOnly: true
		}
		return res
			.status(200)
			.cookie('token', token, cookieOptions)
			.json({
				success: true,
				message: 'User Logged In Successfully',
				data: {
					token: token
				}
			})
	} catch (err) {
		console.log(err)
		return res.status(500).json({
			success: false,
			message: 'Something Went Wrong',
			error: err.message
		})
	}
}
export const logoutUser = async (req, res) => {
	try {
		res
			.status(200)
			.cookie('token', null, { expires: new Date(Date.now()), httpOnly: true }) //delete the cookie
			.json({
				success: true,
				message: 'User Logged Out Successfully'
			})
	} catch (error) {
		res.status(500).json({
			success: false,
			message: 'Something Went Wrong'
		})
	}
}
