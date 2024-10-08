import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from 'react';
import '../css/Upload.css'
import { useNavigate } from 'react-router-dom';
import Header from '../../common/Header'
import url from '../../assets/data/url.json'
import axios from 'axios';




const FaFileUpload = () => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const myurl = new URL(url.url) 



    const navigate = useNavigate()
 
    const handleFileChange = (event) => {
        setFile(event.target.files[0]); 
      };
   
    const handleSubmit = (event) => {
        if(file){

            event.preventDefault(); 
            setLoading(true); 
         
            const formData = new FormData();
            formData.append('file', file); 
         
            axios.post(`${myurl}upload-legal-doc`, formData, {
              headers: {
                'Content-Type': 'multipart/form-data', 
              },
            })
            .then((response) => {
              if (response.status === 200) {
                console.log('File uploaded successfully:', response.data);
                setSuccess(true); 
                navigate('/chatbot')
              }
            })
            .catch((error) => {
              console.error('Error uploading file:', error);
            })
            .finally(() => {
              setLoading(false); 
            });
        }
        else{
            alert('Upload PDF file')
        }
      };

    return (
            <div className="chatbot-container">
                <Header />    
            <div className="pdf-upload-container d-flex align-items-center justify-content-center">
            <div className="pdf-upload-box p-4">
            <h2 style={{color:"black"}} className="text-center mb-4">Upload PDF File</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                <label style={{color:"black"}} htmlFor="formFile" className="form-label">Choose a PDF File:</label>
                <input
                    className="form-control"
                    type="file"
                    id="formFile"
                    accept="application/pdf"
                    onChange={handleFileChange}
                />
                </div>
                <button type="submit" disabled={loading} className="btn btn-primary w-100">  {loading ? 'Uploading...' : 'Upload PDF'}</button>
            </form>
            {success && <p>File uploaded successfully!</p>}
            </div>
            </div>
        </div>
    );
  };
  
export default FaFileUpload