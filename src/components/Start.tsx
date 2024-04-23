import { Button } from '@mui/material'
import { useQuestions } from '../store/questions'

export function Start() {
  const feachQuestions = useQuestions((state) => state.fetchQuestions)

  const handleClick = () => {
    feachQuestions(5)
  }
  return (
    <Button style={{ width : '25%'}} variant='contained' onClick={() => handleClick()}>
      Start
    </Button>
  )
}
