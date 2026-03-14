import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Authcontext } from '../src/features/auth/Authcontext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Authcontext>
    <App />
  </Authcontext>
  </BrowserRouter>
)
