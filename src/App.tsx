import { Container, Stack, Typography } from '@mui/material'
import Hogwarts from './components/icons/Hogwarts'
import { Start } from './components/Start'
import { useQuestions } from './store/questions'
import { Game } from './components/Game'
function App() {
  const questions = useQuestions((state) => state.questions)

  return (
    <main>
      <Container maxWidth='sm'>
        <Stack alignItems='center' justifyContent='center'>
          <Hogwarts />
          <Typography variant='h3' component='h1'>
            Harry Potter Quiz
          </Typography>
        </Stack>
        <Stack spacing={2} sx={{ mt: 4 }} alignItems='center'>
          {questions.length > 0 && <Game />}
          {questions.length === 0 && <Start />}
        </Stack>
      </Container>
    </main>
  )
}

export default App
