import {
  Card,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material'
import { type Question as QuestionType } from '../types'
import { useQuestions } from '../store/questions'
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material'
import { Footer } from './Footer'

const getBackgroundColor = (info: QuestionType, index: number) => {
  const { userSelectedAnswer, correctAnswer } = info
  console.log(index, userSelectedAnswer, correctAnswer)

  if (userSelectedAnswer == null) return 'transparent'

  if (index !== userSelectedAnswer && index !== correctAnswer)
    return 'transparent'

  if (index === correctAnswer) return 'green'

  if (index === userSelectedAnswer) return 'red'

  return 'transparent'
}

const Question = ({ info }: { info: QuestionType }) => {
  const selectAnswer = useQuestions((state) => state.selectAnswer)

  return (
    <Card variant='outlined'>
      <Typography variant='h5'>{info.question}</Typography>
      <List sx={{ bgColor: '#333' }} disablePadding>
        {info.answers.map((answer, index) => (
          <ListItem key={index} divider>
            <ListItemButton
              disabled={info.userSelectedAnswer != null}
              onClick={() => {
                selectAnswer(info.id, index)
              }}
              sx={{ backgroundColor: getBackgroundColor(info, index) }}
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
  const goNextQuestion = useQuestions((state) => state.goNextQuestion)
  const goPrevQuestion = useQuestions((state) => state.goPrevQuestion)

  const questionInfo = questions[currentQuestion]
  return (
    <>
      <Stack
        direction='row'
        gap={2}
        alignItems='center'
        justifyContent='center'
      >
        <IconButton
          onClick={goPrevQuestion}
          disabled={currentQuestion === 0}
          sx={{ color: '#fff' }}
        >
          <ArrowBackIosNew />
        </IconButton>
        <IconButton
          onClick={goNextQuestion}
          disabled={currentQuestion === questions.length - 1}
          sx={{ color: '#fff' }}
        >
          <ArrowForwardIos />
        </IconButton>
      </Stack>
      <Question info={questionInfo} />
      <Footer />
    </>
  )
}
