import React, { useContext, useEffect } from "react"
import { useForm } from '../hooks/useForm.jsx'
import { useApiRequest } from '../hooks/useApiRequest.jsx'
import ENVIROMENT from '../config/enviroment.js'
import { AuthContext } from '../Context/AuthContext.jsx'
import { useNavigate } from "react-router-dom"


const CreateWorkspaceScreen = () => {
    const Navigate = useNavigate()
    const { createWorkspace } = useContext(AuthContext)
    const formInitialState = {
        name: '',
    }
    const { formState, handleChangeInput } = useForm(formInitialState)
    const { responseApiState, postRequest } = useApiRequest(ENVIROMENT.URL_API + "/api/workspaces")

    useEffect(() => {
        if (responseApiState.data) {
            // console.log("estado de respuesta de la api", responseApiState)
            createWorkspace(responseApiState.data.data.authorization_token)
            Navigate("/home")

        }
    },
        //cada vez q cambie mi estado de respuesta ejecutare el efecto 
        [responseApiState, createWorkspace, Navigate])

    const handleSubmitForm = async (e) => {
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
                    <h1>Crear un espacio de trabajo</h1>
                    </div>
                </div>
                
                <form onSubmit={handleSubmitForm} >
                    <div className="form-email">
                        <label htmlFor="name">name</label>
                        <input
                            type="text"
                            id='name'
                            name='name'
                            required placeholder='ej. Matematicas'
                            value={formState.name}
                            onChange={handleChangeInput} />
                    </div>
                    {
                        responseApiState.error && <span style={{ color: 'red' }}>{responseApiState.error}</span>
                    }
                    {
                        responseApiState.loading
                            ? <span>Cargando</span>
                            : <button className="form-button" type='submit' >Crear</button>
                    }


                </form>
            </div>

        </>
    )
}

export default CreateWorkspaceScreen