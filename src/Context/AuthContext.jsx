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
            setIsAuthenticatedState(true);
        }
    }, []);
    const logout = () => {
        localStorage.removeItem('authorization_token');
        setIsAuthenticatedState(false);
    };
    const login = (authorization_token) => {
        console.log("Token al iniciar sesión:", authorization_token);
        localStorage.setItem("authorization_token", authorization_token);
        setIsAuthenticatedState(true);
    };
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