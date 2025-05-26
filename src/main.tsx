import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './index.css'
//import App from './App.tsx'
import AppIntegralidad from './AppIntegralidad';

createRoot(document.getElementById('root')!).render(
  <StrictMode>   
      <AppIntegralidad />    
  </StrictMode>,
)




