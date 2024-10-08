import React, { useState } from 'react';
import  '../css/Chatbot.css'
import 'bootstrap/dist/css/bootstrap.min.css'; 
import Header from '../../common/Header'
import url from '../../assets/data/url.json'
import axios from 'axios';

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [loading,setLoading] = useState(false)
    const myurl = new URL(url.url) 

    const handleSend = (e) => {
        e.preventDefault();
        setLoading(true)
        if (input.trim()) {
          setMessages((prev) => [...prev, { text: input, type: 'user' }]);      
          axios
            .post(`${myurl}legal-bot`, {
              query: input,
            })
            .then((response) => {
              if (response.status === 200) {
                setLoading(false)
                setInput('');
                const data = response.data[0].response;
                setMessages((prev) => [...prev, { text: data, type: 'bot' }]);
              } 
            })
            .catch((error) => {
              console.error('Error during API call:', error);
            });
        }
      };

    return (
        <div className="chatbot-container">
            <Header />
            <div className="chat-window">
                {messages.map((message, index) => (
                    <p key={index} className={`message ${message.type}`}>
                        {message.text}
                    </p>
                ))}
            </div>
            <form className="chat-input-form d-flex align-items-center" onSubmit={handleSend}>
                <input
                    type="textarea"
                    className="form-control chat-input me-2"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={loading?'Fetching query...' : "Type your message..." }
                />
                <button disabled={input.length<8?true:false} type="submit" className="btn send-button">
                    Send
                </button>
            </form>
        </div>
    );
};

export default Chatbot;
