import { useState } from 'react'
import { ServerError } from "../utils/error.util"

export const useApiRequest = (url) => {

    //nos conviene guardarlo en el hook porque no es algo que vaya a variar entre componentes
    const initialResponseApiState = {
        loading: false,
        error: null,
        data: null
    }


    const [responseApiState, setResponseApiState] = useState(initialResponseApiState)



    const postRequest = async (body) => {
        try {
            // Obtener el token del localStorage
            const token = localStorage.getItem("authorization_token");
            if (!token) {
                console.error("Token no encontrado");
                return;
            }
            // Hacer la solicitud con el token
            const response = await fetch('http://localhost:3000/api/workspaces', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Pasar el token en la cabecera
                },
                body: JSON.stringify(body),
            });
            const data = await response.json();
            console.log(data);
            if (data.ok) {
                setResponseApiState({ ...initialResponseApiState, data: data });
                Navigate("/home"); // Redirigir al home después de crear el workspace
            } else {
                throw new Error(data.message); // Manejo del error del servidor
            }
        } catch (error) {
            setResponseApiState((prevState) => {
                return { ...prevState, error: error.message || "no se pudo enviar la informacion al servidor" };
            });
        } finally {
            setResponseApiState((prevState) => {
                return { ...prevState, loading: false };
            });
        }
    };

    const putRequest = async (body) => {
        try {
            setResponseApiState({ ...initialResponseApiState, loading: true })
            const response = await fetch(
                url,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(body)
                }
            )
            const data = await response.json()

            if (data.ok) {
                setResponseApiState((prevState) => {
                    return { ...prevState, data: data }
                })
            } else {
                throw new ServerError(data.message, data.status)
            }
        }
        catch (error) {
            setResponseApiState((prevState) => {
                if (error.status) { //verificamos si es un error del servidor 
                    return { ...prevState, error: error.message }
                }
                return { ...prevState, error: "no se pudo enviar la informacion al servidor" }
            })

        }

        finally {
            setResponseApiState((prevState) => {
                return { ...prevState, loading: false }
            })
        }

    }


    return { responseApiState, postRequest, putRequest }




}