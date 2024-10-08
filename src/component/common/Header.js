import React from 'react'
import { useNavigate } from 'react-router-dom';
import '../pages/css/Chatbot.css'//'../../CSS/Chatbot.css'

function Header() {
    const navigate = useNavigate()
    const handelLogout = () =>{
        localStorage.removeItem("tokenhackerrank");
        navigate('/')
    }
    
  return (
    
        <div style={{display:"flex", justifyContent:"space-around"}}>
            <h2 className="text-center p-3"><string>HCLTec</string>h</h2>
            <h1 className="text-center p-2"><strong>Content Query Engin</strong></h1>
            <div className="text-center p-3">
                <button onClick={handelLogout} type="button" class="btn btn-link">Logout</button>
            </div>
        </div>
    
  )
}

export default Header