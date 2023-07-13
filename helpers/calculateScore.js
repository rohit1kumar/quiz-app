import { Question, Option } from '../models/index.js'

export const calculateScore = async (answers, t) => {
	let score = 0
	for (const answer of answers) {
		const { questionId, optionIds } = answer

		const question = await Question.findOne(
			{
				where: { id: questionId },
				include: [Option]
			},
			{ transaction: t }
		)

		if (!question) {
			throw new Error('Question not found')
		}

		const correctOptionIds = question.Options.filter(
			(option) => option.isCorrect === true
		).map((option) => option.id)

		// Convert optionIds to numbers
		const selectedOptionIds = optionIds.map((optionId) =>
			parseInt(optionId, 10)
		)
		// if their is same selectedOptionIds then take only one
		const uniqueSelectedOptionIds = [...new Set(selectedOptionIds)]
		if (
			uniqueSelectedOptionIds.length === correctOptionIds.length &&
			uniqueSelectedOptionIds.every((optionId) =>
				correctOptionIds.includes(optionId)
			)
		) {
			score++
		}
	}
	return score
}
