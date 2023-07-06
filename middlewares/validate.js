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
		description: Joi.string().trim().required(),
		questions: Joi.array().items(
			Joi.object({
				question: Joi.string().required().trim().messages({
					'string.base': 'Question must be a string',
					'string.empty': 'Question cannot be empty',
					'any.required': 'Question is required'
				}),
				options: Joi.array().items(
					Joi.object({
						option: Joi.string().required().trim().messages({
							'string.base': 'Option must be a string',
							'string.empty': 'Option cannot be empty',
							'any.required': 'Option is required'
						}),
						isCorrect: Joi.boolean().optional().messages({
							'boolean.base': 'Correct option must be a boolean',
							'boolean.empty': 'Correct option cannot be empty'
						})
					})
				)
			})
		)
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
