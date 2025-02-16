import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Board from '@components/board/Board'
import Title from '@components/title/Title'
import './index.scss'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <>
      <Title />
      <Board />
    </>
  </StrictMode>,
)
