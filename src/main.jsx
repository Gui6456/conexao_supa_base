import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import Companies from './Companies.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
  
    <Companies/>
  </StrictMode>,
)
