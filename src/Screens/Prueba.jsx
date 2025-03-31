// import React, { useEffect, useState } from "react";
// import { useApiRequest } from "../hooks/useApiRequest";
// import { useWorkspaceForm } from "../hooks/useWorkspacesForm";
// import ENVIROMENT from "../config/enviroment";
// import { useNavigate } from "react-router-dom";

// const NewWorkspaces = () => {
//     const { formState, handleChangeInput, addTeamMember } = useWorkspaceForm();
//     const { responseApiState, postRequest } = useApiRequest(
//         ENVIROMENT.URL_API + "/api/workspace"
//     );
//     const navigate = useNavigate()

//     const [currentStep, setCurrentStep] = useState(1);

//     const handleSubmitForm = async (e) => {
//         e.preventDefault();

//         const data = {
//             name: formState.name,
//             profilePicture: formState.profilePicture,
//             teamMembers: formState.teamMembers,
//             activity: formState.activity,
//         };

//         await postRequest(data);

//         if (responseApiState.data) {
//             setCurrentStep(currentStep + 1);
//         }
//     };

//     const handleAddMember = (e) => {
//         e.preventDefault();
//         addTeamMember(formState.email);
//         setCurrentStep(currentStep + 1);
//     };

//     const handleAddActivity = (e) => {
//         e.preventDefault();
//         console.log("Actividad añadida:", formState.activity);
//         setCurrentStep(currentStep + 1);
//     };

//     useEffect(() => {
//         if (responseApiState.data && currentStep === 1) {
//             setCurrentStep(currentStep + 1);
//         }
//     }, [responseApiState.data, currentStep]);

//     useEffect(() => {
//         if (currentStep === 4) {
//             navigate('/workspaces')
//         }
//     }, [currentStep, navigate])

//     return (
//         <div className="contenedorPrincipal">
//             <div className="contenedorSideBar"></div>
//             <div className="contenedorContenido">
//                 {currentStep === 1 && (
//                     <div>
//                         <span>Paso 1 de 5</span>
//                         <h1>¿Cómo te llamas?</h1>
//                         <p>
//                             Agregar tu nombre y foto de perfil ayuda a que tus compañeros de
//                             equipo te reconozcan y puedan conectarse contigo más fácilmente.
//                         </p>
//                         <div className="ContenedorForm1">
//                             <form onSubmit={handleSubmitForm}>
//                                 <div>
//                                     <label>Nombre</label>
//                                     <input
//                                         type="text"
//                                         placeholder="Nombre"
//                                         name="name"
//                                         value={formState.name}
//                                         onChange={handleChangeInput}
//                                     />
//                                 </div>
//                                 <div>
//                                     <label>Foto de perfil</label>
//                                     <input
//                                         type="file"
//                                         name="profilePicture"
//                                         onChange={handleChangeInput}
//                                     />
//                                 </div>
//                                 <button type="submit">Siguiente</button>
//                             </form>
//                         </div>
//                     </div>
//                 )}

//                 {currentStep === 2 && (
//                     <div className="ContenedorPaso2">
//                         <span>Paso 2 de 5</span>
//                         <h2>¿Quién más está en el equipo?</h2>
//                         <span>Agregar compañero por correo electrónico</span>
//                         <form onSubmit={handleAddMember}>
//                             <div>
//                                 <input
//                                     type="email"
//                                     placeholder="Email"
//                                     name="email"
//                                     value={formState.email}
//                                     onChange={handleChangeInput}
//                                 />
//                             </div>
//                             <div>
//                                 <button type="submit">Agregar</button>
//                             </div>
//                         </form>
//                     </div>
//                 )}

//                 {currentStep === 3 && (
//                     <div className="ContenedorPaso3">
//                         <span>Paso 3 de 5</span>
//                         <h2>¿En qué está trabajando tu equipo en este momento?</h2>
//                         <span>
//                             Puede ser cualquier cosa: un proyecto, una campaña, un evento o el
//                             acuerdo que intentas cerrar.
//                         </span>
//                         <form onSubmit={handleAddActivity}>
//                             <div>
//                                 <input
//                                     type="text"
//                                     name="activity"
//                                     placeholder="Nombre de la actividad"
//                                     value={formState.activity}
//                                     onChange={handleChangeInput}
//                                 />
//                             </div>
//                             <div>
//                                 <button type="submit">Agregar</button>
//                             </div>
//                         </form>
//                     </div>
//                 )}

//                 {currentStep === 4 && (
//                     <div>
//                         <span>Paso 4 de 4</span>
//                         <h3>¡Tu espacio de trabajo está listo!</h3>
//                     </div>
//                 )}


//             </div>
//         </div>
//     );
// };

// export default NewWorkspaces;