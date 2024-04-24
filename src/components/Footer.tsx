import { Button } from '@mui/material'
import { useQuestionsData } from '../hooks/useQuestionData'
import { useQuestions } from '../store/questions'

export const Footer = () => {
  const { correct, incorrect, unanswered } = useQuestionsData()
  const reset = useQuestions((state) => state.reset)

  return (
    <footer
      style={{
        marginTop: '16px',
        gap: '4px',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <h3 style={{ margin: '0' }}>Score:</h3>
      <span style={{ gap: '4px', display: 'flex' }}>
        <p>Correct: {correct}</p>
        <p>Incorrect: {incorrect}</p>
        <p>Unanswered: {unanswered}</p>
      </span>
      <Button onClick={() => reset()}>Restart</Button>
    </footer>
  )
}
