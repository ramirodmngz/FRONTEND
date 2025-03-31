import { useState } from 'react'

export const useForm = (formInitialState) => {
    const [formState, setFormState] = useState(formInitialState)

    const handleChangeInput = (e) => {

        const { name, value } = e.target

        const file_value = e.target?.files
        if (file_value && file_value[0] instanceof File){
            const file = file_value[0]
            const reader = new FileReader()
            reader.onload = () =>{
                setFormState((prevFormState) => {
                    return { ...prevFormState, [name]: reader.result }
                })
            }
            reader.readAsDataURL(file)
        }
        else {
            setFormState((prevFormState) => {
                return { ...prevFormState, [name]: value }
            })
        }
        // setFormState((prevFormState) => {
        //     return { ...prevFormState, [name]: value }
        // })
    }
    return {formState, handleChangeInput}
}