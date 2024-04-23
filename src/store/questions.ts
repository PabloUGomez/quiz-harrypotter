import { create } from 'zustand'
import { type Question } from '../types.d'

interface State {
  questions: Question[]
  currentQuestion: number
  fetchQuestions: (limit: number) => Promise<void>
}

export const useQuestions = create<State>((set, get) => {
  return {
    questions: [],
    currentQuestion: 0,
    fetchQuestions: async (limit: number) => {
      set({
        questions: [
          {
            id: 1,
            question:
              '¿Quién es el director de la Escuela de Magia y Hechicería de Hogwarts en la primera película?',
            answers: [
              'Albus Dumbledore',
              'Severus Snape',
              'Minerva McGonagall',
              'Rubeus Hagrid',
            ],
            correctAnswer: 0,
          },
        ],
      })
    },
  }
})
