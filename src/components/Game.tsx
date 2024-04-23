import {
  Card,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material'
import { type Question as QuestionType } from '../types'
import { useQuestions } from '../store/questions'

const Question = ({ info }: { info: QuestionType }) => {
  const selectAnswer = useQuestions((state) => state.selectAnswer)

  const handleClick = (answerIndex: number) => () => {
    selectAnswer(info.id, answerIndex)
  }

  const getBackgroundColor = (index: number) => {
    const { userSelectedAnswer, correctAnswer } = info

    if (userSelectedAnswer === null) return 'transparent'

    if (index !== userSelectedAnswer && index !== correctAnswer)
      return 'transparent'

    if (index === correctAnswer) return 'green'

    if (index === userSelectedAnswer) return 'red'

    return 'transparent'
  }
  return (
    <Card variant='outlined'>
      <Typography variant='h5'>{info.question}</Typography>
      <List sx={{ bgColor: '#333' }} disablePadding>
        {info.answers.map((answer, index) => (
          <ListItem key={index} divider>
            <ListItemButton
              disabled={info.userSelectedAnswer !== null}
              onClick={handleClick(index)}
              sx={{ backgroundColor: getBackgroundColor(index) }}
            >
              <ListItemText primary={answer} sx={{ textAlign: 'center' }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Card>
  )
}

export const Game = () => {
  const questions = useQuestions((state) => state.questions)
  const currentQuestion = useQuestions((state) => state.currentQuestion)

  const questionInfo = questions[currentQuestion]
  return <Question info={questionInfo} />
}
