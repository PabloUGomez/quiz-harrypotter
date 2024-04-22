import { Container, Stack, Typography } from '@mui/material'
import Hogwarts from './components/icons/Hogwarts'
function App() {
  return (
    <main>
      <Container maxWidth='sm'>
        <Stack alignItems='center' justifyContent='center'>
          <Hogwarts />
          <Typography variant='h2' component='h1'>
            Harry Potter Quiz
          </Typography>
        </Stack>
      </Container>
    </main>
  )
}

export default App
