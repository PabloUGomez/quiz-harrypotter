import { create } from 'zustand'
import { type Question } from '../types.d'
import { persist } from 'zustand/middleware'

interface State {
  questions: Question[]
  currentQuestion: number
  fetchQuestions: (limit: number) => Promise<void>
  selectAnswer: (questionId: number, answerIndex: number) => void
  goNextQuestion: () => void
  goPrevQuestion: () => void
  reset: () => void
}

export const useQuestions = create<State>()(
  persist(
    (set, get) => {
      return {
        questions: [],
        currentQuestion: 0,
        fetchQuestions: async (limit: number) => {
          const res = await fetch(`http://localhost:5173/data.json`)
          const json = await res.json()
          const questions = json.sort(() => Math.random() - 0.5).slice(0, limit)
          set({ questions })
        },
        selectAnswer: (questionId: number, answerIndex: number) => {
          const { questions } = get()
          const newQuestions = structuredClone(questions)
          const questionIndex = newQuestions.findIndex(
            (q) => q.id === questionId
          )
          const questionInfo = newQuestions[questionIndex]
          const isCorrectUserAnswer = questionInfo.correctAnswer === answerIndex
          newQuestions[questionIndex] = {
            ...questionInfo,
            userSelectedAnswer: answerIndex,
            isCorrectUserAnswer,
          }
          set({ questions: newQuestions })
        },
        goNextQuestion: () => {
          const { questions, currentQuestion } = get()
          const nextQuestion = currentQuestion + 1
          if (nextQuestion < questions.length) {
            set({ currentQuestion: nextQuestion })
          }
        },
        goPrevQuestion: () => {
          const { currentQuestion } = get()
          const prevQuestion = currentQuestion - 1
          if (prevQuestion >= 0) {
            set({ currentQuestion: prevQuestion })
          }
        },
        reset: () => {
          set({ currentQuestion: 0, questions: [] })
        },
      }
    },
    {
      name: 'questions',
    }
  )
)
