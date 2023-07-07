import User from './user.js'
import Quiz from './quiz.js'
import Question from './question.js'
import Option from './option.js'
import Participant from './participant.js'

User.hasMany(Quiz)
Quiz.belongsTo(User)

Quiz.hasMany(Question, { onDelete: 'CASCADE' })
Question.belongsTo(Quiz)

Question.hasMany(Option, { onDelete: 'CASCADE' })
Option.belongsTo(Question)

Quiz.hasMany(Participant)
Participant.belongsTo(Quiz)

export { User, Quiz, Question, Option, Participant }
