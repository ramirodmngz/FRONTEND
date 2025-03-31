import React from 'react'
import { Link } from 'react-router-dom'
import './home.css'

const HomeScreen = () => {
	return (

		
		<div className ="home">
		<header className ="header">
			<div className ="container header-container">
				<div className ="logo-nav">
					<img src="https://a.slack-edge.com/3d92b39/marketing/img/nav/slack-salesforce-logo-nav-white.png" alt="Slack" className ="logo"/>
					<nav className ="main-nav">
						<ul>
							<li className ="dropdown">
								<a href="#">Funciones <span className ="arrow-down">▼</span></a>
							</li>
							<li className ="dropdown">
								<a href="#">Soluciones <span className ="arrow-down">▼</span></a>
							</li>
							<li>
								<a href="#">Empresa</a>
							</li>
							<li className ="dropdown">
								<a href="#">Recursos <span className ="arrow-down">▼</span></a>
							</li>
							<li>
								<a href="#">Precios</a>
							</li>
						</ul>
					</nav>
				</div>
			<div className ="header-buttons">
          <Link to = "/login">
            <button className ="btn btn-outline">INICIAR SESION</button>
          </Link>
					
					<Link to = "/create-workspace">
						<button className ="btn btn-outline">CREAR NUEVO ESPACIO DE TRABAJO</button>
					</Link>
				</div>
			</div>
		</header>
		
		{/* <!-- Contenido principal --> */}
		<main className ="main-content">
			<div className ="container">
				{/* <!-- Saludo --> */}
				<div className ="greeting">
					<h1><span className ="wave-emoji">👋</span>¡Hola otra vez! </h1>
				</div>
	
				{/* <!-- Contenedor de espacios de trabajo --> */}
				<div className ="workspaces-container">
					<div className="workspace-header">
						Espacios de trabajo de 
					</div>
	
					{/* <!-- Espacio de trabajo 1 --> */}
					<div className ="workspace-item">
						<div className ="workspace-info">
							<div className ="workspace-icon">
								<div className ="icon-left"></div>
								<div className ="icon-right"></div>
							</div>
							<div className ="workspace-details">
								<div className ="workspace-name"></div>
								<div className ="workspace-members">
									<div className ="member-avatars">
										<div className ="avatar"></div>
										<div className ="avatar"></div>
										<div className ="avatar"></div>
										<div className ="avatar"></div>
									</div>
									<span className ="member-count"></span>
								</div>
							</div>
						</div>
						<button className ="btn btn-slack" id="iniciar-slack-1">INICIAR SLACK</button>
					</div>

					{/* <!-- Ver más --> */}
					<div className ="ver-mas">
						<button id="ver-mas-btn">Ver más <span className ="arrow-down">▼</span></button>
					</div>
				</div>
	
				{/* <!-- Crear nuevo espacio de trabajo --> */}
				<div className ="new-workspace-container">
					<div className ="new-workspace-content">
						<div className ="new-workspace-text">
							<p>¿Quieres usar Slack con un equipo distinto?</p>
							<button className ="btn btn-primary" id="crear-espacio-btn">CREA UN NUEVO ESPACIO DE TRABAJO</button>
						</div>
					</div>
				</div>
	
				{/* <!-- Texto de ayuda --> */}
				<div className ="help-text">
					¿No puedes ver tu espacio de trabajo? <a href="#" className ="link">Prueba con un correo electrónico diferente →</a>
				</div>
			</div>
		</main>
	
		{/* <!-- Pie de página --> */}
		<footer className ="footer">
			<div className ="container">
				<h2>Aprende a usar Slack para trabajar</h2>
			</div>
		</footer>
	</div>			
	)
}

export default HomeScreen

// import React from 'react'
// import './home.css'
// import { SiSlack } from "react-icons/si";
// import {  data, Link } from 'react-router-dom';

// const HomeScreen = () => {
//   localStorage.setItem("username", data.username )
//   const name = localStorage.getItem("username")
//   return (
//     <>
//       <div className='main'>
//         <div className='header'>
//           <div className='icons-left'>
//             <div className='buttons-left'>
//               <button>
//                 <SiSlack /> Slack
//               </button>
//               <button>
//                 Funciones
//               </button>
//               <button>
//                 Soluciones
//               </button>
//               <button>
//                 Empresa
//               </button>
//               <button>
//                 Recursos
//               </button>
//               <button>
//                 Precios
//               </button>
//             </div>

//           </div>
//           <div className='icons-right'>
//             <div className='buttons-right'>
//               <button>
//                 HABLAR CON VENTAS
//               </button>
//               <button>
//                 <Link to ={"/login"}>INICIAR SESION</Link>
//               </button>
//             </div>
            
//           </div>
//         </div>
//         <div className='article'>
//           <h1>hola{name}</h1>
//           <h1>El motor de <h1>tu trabajo</h1></h1>
//           <button><Link to ={"/register"}>COMENZAR</Link></button>
          
//           <button>ENCONTRAR TU PLAN</button>
//           <span><b>Probar Slack es gratis</b> todo el tiempo que quieras</span>
//         </div>
//         <div><Link to="/create-workspace" >Crear un workspace</Link></div>
//         <div><Link to="/create-channel" >Crear un canal</Link></div>
//       </div>
//     </>
//   )
// }

// export default HomeScreen