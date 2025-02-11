import React from 'react'
import './registerCss.css'

const RegisterScreen = () => {
  return (
    <div >
        <div className='body'>
            <div className='glass-container'>
                <div className='login-box'>
                    <h2>Login</h2>
                    <form >
                        <input type="text" id='username' name='username' required placeholder='Usuario' />
                        <input type="password" id='password' name='password' required placeholder='Contraseña' />
                            <div className='options'>
                                <input type="checkbox" id='remember' name='remember' />
                                <label htmlFor='remember'>Recordarme</label>
                                <a href="#">Olvidé mi contraseña</a>


                            </div>
                        <button type='submit'>Login</button>
                        <p>No tienes cuenta? <a href="#" id='register'>Registrate</a></p>
                    </form>

                </div>

            </div>
        </div>
        
    </div>
  )
}

export default RegisterScreen