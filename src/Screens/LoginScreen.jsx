import React, { useContext, useEffect } from 'react'
import { useForm } from '../hooks/useForm'
import { useApiRequest } from '../hooks/useApiRequest'
import ENVIROMENT from '../config/enviroment'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../Context/AuthContext'
import "./login.css"
import { SiSlack } from "react-icons/si";





const LoginScreen = () => {
  const Navigate = useNavigate()
  const { login } = useContext(AuthContext)
  const initialFormState = {
    email: '',
    password: ''
  }

  const { formState, handleChangeInput } = useForm(initialFormState)
  const { responseApiState, postRequest } = useApiRequest(ENVIROMENT.URL_API + "/api/auth/login")

  useEffect(() => {
    if (responseApiState.data) {
      // console.log("estado de respuesta de la api", responseApiState)
      login(responseApiState.data.data.authorization_token)
      Navigate("/home")

    }
  },
    //cada vez q cambie mi estado de respuesta ejecutare el efecto 
    [responseApiState, login, Navigate])


  const handleSubmitForm = async (e) => {
    e.preventDefault()
    await postRequest(formState)
    // console.log("estado de respuesta de la api dentro del handlesubmit", responseApiState)
  }

  return (
    <>
      <div className='main-container'>
        <div className='header-container'>
          
          <div className='header-text'>
            <h1>Iniciar sesión en <SiSlack />slack</h1>
            <p>Te sugerimos que uses la direccion de correo electronico que usas en el trabajo</p>
          </div>



        </div>

        <form>
          <div className='form-email'>
            <label htmlFor="email">email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder='nombre@work-email.com'
              value={formState.email}
              onChange={handleChangeInput} />
          </div>
          <div className='form-password'>
            <label htmlFor="password">password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder='password'
              value={formState.password}
              onChange={handleChangeInput} />

          </div>
          {
            responseApiState.error && <span style={{ color: 'red' }}>{responseApiState.error}</span>

          }
          {
            responseApiState.loading
              ? <span>Cargando...</span>
              : <button type='submit' className='form-button' onClick={handleSubmitForm}>Login</button>
          }
          <div className='form-links'>
            <button ><Link to="/reset-password" style={{ color: "white", textDecoration: "none", fontWeight: "bold", height: "35px" }}>Olvidé mi contraseña</Link></button>
            <button><Link to="/register" style={{ color: "white", textDecoration: "none", fontWeight: "bold", height: "35px" }}>Registrate</Link></button>

          </div>

        </form>

      </div>

    </>
  )
}

export default LoginScreen