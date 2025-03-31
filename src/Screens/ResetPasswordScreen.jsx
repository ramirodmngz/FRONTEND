import React from 'react'
import { useForm } from '../hooks/useForm'
import { useApiRequest } from '../hooks/useApiRequest'
import ENVIROMENT from '../config/enviroment'
import { Link } from 'react-router-dom'


const ResetPasswordScreen = () => {
	
	const initialFormState ={
		email: ''
	}

	const { formState, handleChangeInput } = useForm(initialFormState)
	const { responseApiState, postRequest } = useApiRequest(ENVIROMENT.URL_API + '/api/auth/reset-password')
	
    //asi se haria si tuvieras multiples consultas y tuvieras configurar mas de un direccion 
    // const { 
    //     responseApiState: responseApiState2, 
    //     postRequest: postRequest2 } = useApiRequest(ENVIROMENT.URL_API + '/api/auth/reset-password')
	const handleSubmitForm = async (e) =>{
		e.preventDefault()
		await postRequest(formState)
	}
	return (
		<div>
			<h1>Recupera tu contraseña</h1>
			<form onSubmit={handleSubmitForm}>
				<div>
					<label htmlFor='email'>Email</label>
					<input 
						type="email" 
						id='email' 
						name='email' 
						placeholder='email' 
						value={formState.email} 
						onChange={handleChangeInput} 
					/>
				</div>

				{responseApiState.error && <span style={{color: 'red'}}>{responseApiState.error}</span>}
				{
					responseApiState.loading
					? <span>Cargando</span>
					: (
                        responseApiState.data ? 
                        <span>se te envio un email con los passos a se</span>
                        : <button>Restablecer Contraseña</button>
                    )
				}
                <br />
                <Link to= {"/login"}>
                ya tengo cuenta
                </Link>
                <br />
                <Link to={"/register"}>
                no tengo cuenta
                </Link>

			</form>
		</div>
	)
}

export default ResetPasswordScreen
