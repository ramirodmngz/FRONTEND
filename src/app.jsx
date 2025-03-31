import React from 'react'
import {Routes, Route} from 'react-router-dom'
import LoginScreen from './Screens/LoginScreen.jsx'
import RegisterScreen from './Screens/RegisterScreen.jsx'
import ResetPasswordScreen  from './Screens/ResetPasswordScreen.jsx'
import RewritePasswordScreen from './Screens/RewritePasswordScreen.jsx'
import ProtectedRoute from './Components/ProtectedRoute.jsx'
import HomeScreen from './Screens/HomeScreen.jsx'
import CreateWorkspaceScreen from './Screens/CreateWorkspaceScreen.jsx'
import CreateChannelScreen from './Screens/CreateChannelScreen.jsx'



function App() {
  return (
    <div>
      <Routes>
          <Route path="/login" element={<LoginScreen />} />
        
          <Route path="/register" element ={<RegisterScreen />} />

          <Route path="/home" element ={<HomeScreen />} />

          <Route path="/" element={<HomeScreen/>}/>

          <Route path="/create-workspace" element={<CreateWorkspaceScreen/>}/>
          <Route path="/create-channel" element={<CreateChannelScreen/>}/>



        

        <Route element={<ProtectedRoute/>} >
          <Route path='/reset-password' element={<ResetPasswordScreen/>}/>
        </Route>
        
        <Route element={<ProtectedRoute/>} >
          <Route path='/rewrite-password' element={<RewritePasswordScreen/>}/>
        </Route>
        
      </Routes>
      
    </div>
  )
}
export default App