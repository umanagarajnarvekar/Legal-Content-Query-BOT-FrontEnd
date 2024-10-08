import React from 'react'
import Login from './component/pages/layout/LoginPage'
import { Route, Routes } from 'react-router-dom'
import Register from './component/pages/layout/RegisterPage'
import Chatbot from './component/pages/layout/Chatbot'
import FaFileUpload from './component/pages/layout/FileUploadPage'



function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/Register' element={<Register />}/>
        <Route path='/chatbot' element={<Chatbot />}/>
        <Route path='/upload' element={<FaFileUpload />}/>


     
   
      </Routes>
    </div>
  )
}

export default App




























































