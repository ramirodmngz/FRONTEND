import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../Context/AuthContext'
import { useForm } from '../hooks/useForm'
import { useApiRequest } from '../hooks/useApiRequest'
import ENVIROMENT from '../config/enviroment'

const CreateChannelScreen = () => {
    const Navigate = useNavigate(AuthContext)
    const {createChannel} = useContext(AuthContext)

    // const [workspaceId, setWorkspaceId] = useState('')
    const formInitialState = {
        name: ''
    }
    const workspaceId = sessionStorage.getItem("workspace_id")
    const { formState, handleChangeInput } = useForm(formInitialState)
    // const { responseApiState, postRequest } = useApiRequest(`${ENVIROMENT.URL_API}/api/channels/:${workspaceId}`)
    const { responseApiState, postRequest } = useApiRequest(`${ENVIROMENT.URL_API}/api/channels/${workspaceId}`);

    useEffect(
        ()=>{
            if(responseApiState.data){
                createChannel(responseApiState.data.data.authorization_token)
                Navigate("/home")
            }
        },
        [responseApiState, createChannel, Navigate]
    )

    const handleSubmitForm = async (e)=>{
        e.preventDefault()
        await postRequest(formState)
    }

    
    return (
        <>
            <div className='create-channel'>
                <h1>crear un canal</h1>
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
                    {/* <div>
                        <label htmlFor="id">id del workspace donde quieras crear un canal</label>
                        <input
                            type="text"
                            id='id'
                            name='id'
                            required placeholder='ej. Matematicas'
                            value={formState.id}
                            onChange={handleChangeInput} />
                    </div> */}

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

export default CreateChannelScreen