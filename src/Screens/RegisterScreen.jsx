import React, { useState } from 'react'
import ENVIROMENT from '../config/enviroment'
import { ServerError } from '../utils/error.util'
import { useForm } from '../hooks/useForm'
import { useApiRequest } from '../hooks/useApiRequest'
import { Link } from 'react-router-dom'
import { SiSlack } from "react-icons/si";
import './register.css'

const RegisterScreen = () => {
    const formInitialState = {
        username: '',
        password: '',
        email: "",
        profile_image_base64: ""

    }
    const {formState, handleChangeInput} = useForm(formInitialState)

    const {responseApiState, postRequest} = useApiRequest(ENVIROMENT.URL_API + "/api/auth/register")
    
    const handleSubmitForm = async (e)=>{
            e.preventDefault()
            await postRequest(formState)
            
        
        //enviar el formulario osea el estado al backend
        //consulta HTTP
        //fetch es una funcion de q nos permite hacer consultas HTTP
        //recibe la url a consultar y un objeto de configuraciones 
        //URL : string
        // objeto : objeto {method, headers, body (solo si la consulta no es GET)}


    }
        
    return (
        <>

            <div className='main-container'>
                <div className='header-container'>
                    
                    <div className='header-text'>
                        <h1>Registar en <SiSlack />slack</h1>
                        <p>Te sugerimos que uses la direccion de correo electronico que usas en el trabajo</p>
                    </div>
                </div>            
                        <form onSubmit={handleSubmitForm} >
                            <div className='form-username'>
                                <label htmlFor="username">username</label>
                                <input 
                                type="text" 
                                id='username' 
                                name='username' 
                                required placeholder='Usuario' 
                                value={formState.username} 
                                onChange={handleChangeInput} />
                            </div>
                            <div className='form-email'>
                                <label htmlFor="email">email</label>
                                <input 
                                type="text" 
                                id='email' 
                                name='email' 
                                required placeholder='Email' 
                                value={formState.email} 
                                onChange={handleChangeInput} />
                            </div>
                            <div className='form-password'>
                                <input 
                                type="password" 
                                id='password' 
                                name='password' 
                                required placeholder='Password' 
                                value={formState.password} 
                                onChange={handleChangeInput} />
                            </div>
                            <div className='form-perfil'>
                                <label htmlFor="profile_image_base64">imagen de perfil</label>
                                <input
                                type='file'
                                id='profile_image_base64'
                                className='form-perfil'
                                name='profile_image_base64'
                                placeholder='imagen de perfil'
                                onChange={handleChangeInput}
                                />
                            </div>
                            
                    {
                        formState.profile_image_base64 && <img src={formState.profile_image_base64} alt='profile_image_base64' />
                    }
                            {/* <div className='options'>
                                <input type="checkbox" id='remember' name='remember' />
                                <label htmlFor='remember'>Recordarme</label>
                            </div> */}
                            {
                                responseApiState.error && <span style={{color:'red'}}>{responseApiState.error}</span>
                            }
                            {
                                responseApiState.loading
                                ? <span>Cargando...</span>
                                : <button className = "form-buttom"type='submit' >Registrar</button>
                            }
                            <div className='form-links'>
                                <Link to={"/login"} style={{color: "white", fontWeight:"bold", fontSize:"small", textDecoration:"none", height: "35px", backgroundColor: "rgb(73, 21, 74)", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", borderRadius:"10px", border:"gray 2px solid", padding:"10px"}}>
                                Ya tengo cuenta</Link>
                            </div>
                            
                        </form>


                
            </div>

        </>
    )
}

export default RegisterScreen