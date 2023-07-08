import Joi from 'joi'

const validatePayload = (schema) => (req, res, next) => {
	const { error } = schema.validate(req.body)
	if (error) {
		return res.status(400).json({
			success: false,
			message: 'Validation Error',
			error: error.details[0].message
		})
	}
	next()
}

export const validateCreateQuiz = validatePayload(
	Joi.object({
		title: Joi.string().required().trim(),
		description: Joi.string().trim().required()
	})
)

export const validateUpdateQuiz = validatePayload(
	Joi.object({
		title: Joi.string().trim(),
		description: Joi.string().trim()
	})
)

export const validateRegister = validatePayload(
	Joi.object({
		name: Joi.string().trim().required(),
		email: Joi.string().trim().email().required(),
		password: Joi.string().trim().min(8).required()
	})
)

export const validateLogin = validatePayload(
	Joi.object({
		email: Joi.string().trim().email().required(),
		password: Joi.string().trim().required()
	})
)
