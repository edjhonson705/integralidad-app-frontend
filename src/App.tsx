import { useState } from 'react'
import './App.css'
import AppIntegralidad from './AppIntegralidad'
import LoginForm from './LoginForm'

/**
 * Aplicacion principal
 * @returns 
 */
function App() {
  
  const [usuarioAutenticado, setUsuarioAutenticado] = useState({
    username:sessionStorage.getItem('usuario')
  });

  /**   
   * 
   */
  const onSalir = ()=> {
    sessionStorage.setItem('usuario','');
    setUsuarioAutenticado({username:''});
  }

  /**
   * JSX
   */
  return (
    <>
      {
        usuarioAutenticado.username == 'administrador'
          ? <AppIntegralidad onSalir={onSalir}/>
          : <LoginForm onAutenticar={setUsuarioAutenticado} />
      }
    </>
  )
}

export default App
