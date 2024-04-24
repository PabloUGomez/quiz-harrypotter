import { useQuestions } from '../store/questions'

export const useQuestionsData = () => {
    const questions = useQuestions((state) => state.questions)

    let correct = 0
    let incorrect = 0
    let unanswered = 0
  
    questions.forEach((question) => {
      const { userSelectedAnswer, correctAnswer } = question
      console.log()
      if (userSelectedAnswer == null) return unanswered++
      if (correctAnswer === userSelectedAnswer) return correct++
      if (userSelectedAnswer !== null && userSelectedAnswer !== correctAnswer)
        return incorrect++
    })
    return { correct, incorrect, unanswered }
}