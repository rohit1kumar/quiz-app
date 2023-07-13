import { Option } from '../models/index.js'

export const createOption = async (req, res) => {
	try {
		const { questionId } = req.params
		const { options } = req.body
		const createdOptions = await Option.bulkCreate(
			options.map((option) => ({ ...option, QuestionId: questionId }))
		)

		return res.status(201).json({
			success: true,
			message: 'Option created successfully',
			data: createdOptions
		})
	} catch (err) {
		return res.status(500).json({
			success: false,
			message: 'Failed to create option, please try again',
			error: err.message
		})
	}
}

export const getAllOptions = async (req, res) => {
	try {
		const { questionId } = req.params
		const options = await Option.findAll({ where: { QuestionId: questionId } })
		if (options.length === 0) {
			return res.status(404).json({
				success: false,
				message: 'Options not found for the given question id'
			})
		}
		return res.status(200).json({
			success: true,
			message: 'Options fetched successfully',
			data: options
		})
	} catch (err) {
		return res.status(500).json({
			success: false,
			message: 'Failed to get options, please try again',
			error: err.message
		})
	}
}

export const updateOption = async (req, res) => {
	try {
		const { optionId } = req.params
		const { text } = req.body
		const affectedRows = await Option.update(
			{ text },
			{ where: { id: optionId } }
		)

		if (affectedRows[0] === 0) {
			return res.status(404).json({
				success: false,
				message: 'Option not found for the given id'
			})
		}

		return res.status(200).json({
			success: true,
			message: 'Option updated successfully'
		})
	} catch (err) {
		return res.status(500).json({
			success: false,
			message: 'Failed to update option, please try again',
			error: err.message
		})
	}
}

export const deleteOption = async (req, res) => {
	try {
		const { optionId } = req.params
		const affectedRows = await Option.destroy({ where: { id: optionId } })

		if (affectedRows === 0) {
			return res.status(404).json({
				success: false,
				message: 'Option not found for the given id'
			})
		}

		return res.status(200).json({
			success: true,
			message: 'Option deleted successfully'
		})
	} catch (err) {
		return res.status(500).json({
			success: false,
			message: 'Failed to delete option, please try again',
			error: err.message
		})
	}
}

export const getOptionById = async (req, res) => {
	try {
		const { optionId } = req.params
		const option = await Option.findOne({ where: { id: optionId } })

		if (!option) {
			return res.status(404).json({
				success: false,
				message: 'Option not found for the given id'
			})
		}

		return res.status(200).json({
			success: true,
			message: 'Option fetched successfully',
			data: option
		})
	} catch (err) {
		return res.status(500).json({
			success: false,
			message: 'Failed to get option, please try again',
			error: err.message
		})
	}
}
