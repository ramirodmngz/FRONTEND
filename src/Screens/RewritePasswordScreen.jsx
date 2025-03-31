import React, { useEffect } from 'react'
import { useForm } from '../hooks/useForm'
import { useApiRequest } from '../hooks/useApiRequest'
import ENVIROMENT from '../config/enviroment'
import { useNavigate, useSearchParams } from 'react-router-dom'



const RewritePasswordScreen = () => {
	const navigate = useNavigate()
    const [searchParams] = useSearchParams(window.location.search)
    const reset_token = searchParams.get('reset_token')
    // const [resetTokenState, setResetTokenState] = useState(searchParams.get('reset_token'))
    useEffect(()=>{
                
                
                if(!reset_token){
                    navigate("/login")
                }
            },
            []
        )

	
    
//     useEffect(()=>{
//         const searchParams = new URLSearchParams(window.location.search)
//         const reset_token = searchParams.get('reset_token')
//         if(!reset_token){
//             navigate("/login")
//         }
//     },
//     []
// )
    

	const initialFormState ={
		password: ''
	}

	const { formState, handleChangeInput } = useForm(initialFormState)
	const { responseApiState, putRequest } = useApiRequest(ENVIROMENT.URL_API + '/api/auth/rewrite-password')
	
    //asi se haria si tuvieras multiples consultas y tuvieras configurar mas de un direccion 
    // const { 
    //     responseApiState: responseApiState2, 
    //     postRequest: postRequest2 } = useApiRequest(ENVIROMENT.URL_API + '/api/auth/reset-password')

	useEffect(()=>{
		if(responseApiState.data){
			navigate("/login")
		}
	},
	[responseApiState.data]
	)
	const handleSubmitForm = async (e) =>{
		e.preventDefault()
        //                nueva contraseña               reset token
		await putRequest({password: formState.password, reset_token})
		navigate("/login")
	}

	
	return (
		<div>
			<h1>Establecer nueva contraseña</h1>
			<form onSubmit={handleSubmitForm}>
				<div>
					<label htmlFor='password'>Nueva contraseña</label>
					<input 
						type="text" 
						id='password' 
						name='password' 
						placeholder='NuevaContraseña' 
						value={formState.password} 
						onChange={handleChangeInput} 
					/>
				</div>

				{responseApiState.error && <span style={{color: 'red'}}>{responseApiState.error}</span>}
				{
					responseApiState.loading
					? <span>Cargando</span>
					: (
                        responseApiState.data ? 
                        <span>Enviado</span>
                        : <button>Establecer nueva contraseña</button>
                    )
				}

			</form>
		</div>
	)
}

export default RewritePasswordScreen
