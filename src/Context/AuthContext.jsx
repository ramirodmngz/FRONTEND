// import { createContext } from "preact";
// import { useEffect, useState } from "preact/hooks";

// export const AuthContext = createContext()

// const AuthContextProvider = ({children}) =>{
//     /* Aca manejen todas las funcionalidades relacionadas al usuario y auth */
//     let isAuthenticatedInitialState = sessionStorage.getItem('authorization_token')
//     const [isAuthenticatedState, setIsAutheticatedState] = useState(isAuthenticatedInitialState)
//     useEffect(
//         () =>{
//             const token = sessionStorage.getItem('authorization_token')
//             if(token){
//                 setIsAutheticatedState(true)
//             }
//         },
//         []
//     )
//     const logout = () =>{
//         sessionStorage.removeItem('authorization_token')
//         setIsAutheticatedState(false)
//     }

//     const login = (authorization_token)=>{
//         sessionStorage.setItem('authorization_token', authorization_token)
//         setIsAutheticatedState(true)
//     }

//     const createWorkspace = (authorization_token)=>{
//         sessionStorage.setItem('authorization_token', authorization_token)
//         setIsAutheticatedState(true)
//     }

//     const createChannel = (authorization_token)=>{
//         sessionStorage.setItem('authorization_token', authorization_token)
//         setIsAutheticatedState(true)
//     }

//     return (
//         <AuthContext.Provider value={{isAuthenticatedState, logout, login, createWorkspace, createChannel }}>
//             {children}
//         </AuthContext.Provider>
//     )
// }

// export default AuthContextProvider
import { createContext } from "preact";
import { useEffect, useState } from "preact/hooks";
export const AuthContext = createContext();
const AuthContextProvider = ({ children }) => {
    // Cambiado a localStorage
    let isAuthenticatedInitialState = localStorage.getItem('authorization_token');
    const [isAuthenticatedState, setIsAuthenticatedState] = useState(isAuthenticatedInitialState);
    useEffect(() => {
        const token = localStorage.getItem('authorization_token');
        if (token) {
            // Hacer una solicitud al backend para verificar si el token es válido
            fetch(`${import.meta.env.VITE_URL_API}/verify-token`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            })
            .then(response => response.json())
            .then(data => {
                if (data.isValid) {
                    setIsAuthenticatedState(true); // El token es válido
                } else {
                    setIsAuthenticatedState(false); // Token no válido
                    localStorage.removeItem('authorization_token'); // Limpiar el token inválido
                }
            })
            .catch(() => {
                setIsAuthenticatedState(false);
                localStorage.removeItem('authorization_token');
            });
        }
    }, []);// Esto verifica el token antes de que el estado de autenticación se marque como true.
    const logout = () => {
        localStorage.removeItem('authorization_token');
        setIsAuthenticatedState(false);
    };
    const login = async (username, password) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_URL_API}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            const data = await response.json();
            if (response.ok && data.token) {
                // Guarda el token en el localStorage
                localStorage.setItem("authorization_token", data.token);
                setIsAuthenticatedState(true); // Marca al usuario como autenticado
            } else {
                console.error('Credenciales incorrectas');
            }
        } catch (error) {
            console.error('Error al hacer login', error);
        }
    };
    // const login = (authorization_token) => {
    //     console.log("Token al iniciar sesión:", authorization_token);
    //     localStorage.setItem("authorization_token", authorization_token);
    //     setIsAuthenticatedState(true);
    // };
    const createWorkspace = (authorization_token) => {
        // Validar token antes de guardar
        if (!authorization_token) {
            console.error("Token es undefined o null en createWorkspace");
            return; // Detener si el token es inválido
        }
        // Guardar token si es válido
        console.log("Token guardado correctamente:", authorization_token);
        localStorage.setItem("authorization_token", authorization_token);
        setIsAuthenticatedState(true);
    };
    const createChannel = (authorization_token) => {
        localStorage.setItem('authorization_token', authorization_token);
        setIsAuthenticatedState(true);
    };
    return (
        <AuthContext.Provider value={{ isAuthenticatedState, logout, login, createWorkspace, createChannel }}>
            {children}
        </AuthContext.Provider>
    );
};
export default AuthContextProvider;