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


    // useEffect(() => {
    //     if (responseApiState.data) {
    //         // const workspaceId = responseApiState.data.data.id;
    //         // sessionStorage.setItem("workspace_id", workspaceId); // Guardar ID
    //         createWorkspace(responseApiState.data.data.authorization_token);
    //         localStorage.setItem("authorization_token", responseApiState.data.data.authorization_token);
    //         Navigate("/home");
    //     }
    // }, [responseApiState, createWorkspace, Navigate]);

    // useEffect(() => {
    //     if (responseApiState.data) {
    //         // Acceder al token de manera segura
    //         const token = responseApiState.data?.data?.authorization_token;
    //         // Validar que el token exista
    //         if (token) {
    //             console.log("Token válido recibido:", token);
    //             createWorkspace(token); // Enviar token al contexto
    //             Navigate("/home"); // Redirigir al home
    //         } else {
    //             console.error("Token es undefined o no existe");
    //         }
    //     }
    // }, [responseApiState, createWorkspace, Navigate]);

    useEffect(() => {
        if (responseApiState.data) {
            const token = responseApiState.data.authorization_token;
            if (token) {
                console.log("Token válido recibido:", token);
                localStorage.setItem("authorization_token", token); // Guardar el token en localStorage
                createWorkspace(token); // Guardar el token en el contexto
                Navigate("/home"); // Redirigir a la página de inicio
            } else {
                console.error("Token es undefined o no existe");
            }
        }
    }, [responseApiState, createWorkspace, Navigate]);

    

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
            <div className='name'>
                <h1>crear un workspace</h1>
                <form onSubmit={handleSubmitForm} >
                    <div>
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
                            : <button className="form-buttom" type='submit' >Crear</button>
                    }
                    

                </form>
            </div>

        </>
    )
}

export default CreateWorkspaceScreen