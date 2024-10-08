import React, { useState } from "react";
import "../css/Auth.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import LoginSectionRight from  '../../common/LoginSectionRight'
import url from '../../assets/data/url.json'
import axios from "axios";
 
const Register = () => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
      const myurl = new URL(url.url)
 
      const [errors, setErrors] = useState({});
      const navigate = useNavigate();
   
      const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
   
      const validateForm = () => {
        let formErrors = {};
       
        if (!formData.first_name.trim()) {
          formErrors.fullName = "Full Name is required";
        }
        if (!formData.first_name.trim()) {
          formErrors.lst_name = "Full Name is required";
        }
   
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email) {
          formErrors.email = "Email is required";
        } else if (!emailRegex.test(formData.email)) {
          formErrors.email = "Invalid email format";
        }
   
        // Password validation
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
   
        if (!formData.password) {
          formErrors.password = "Password is required";
        } else if (!passwordRegex.test(formData.password)) {
          formErrors.password = "Password must contain at least 6 characters, one uppercase, one lowercase, one number, and one special character";
        }
   
        // Confirm Password validation
        if (!formData.confirmPassword) {
          formErrors.confirmPassword = "Confirm Password is required";
        } else if (formData.password !== formData.confirmPassword) {
          formErrors.confirmPassword = "Passwords do not match";
        }
   
        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
      };
   
 
    const handleSubmit =  (event) => {
      event.preventDefault();
        if (!validateForm()) {
          return;        
        }
          axios.post(`${myurl}registration`, {
            first_name:  formData.first_name,
            last_name: formData.last_name,
            email: formData.email,
            password: formData.password
          })
          .then((response) => {
            if (response.status === 200) {
              alert('Account Created, Login')
           
              console.log('Register successful:', response.data);
              navigate('/');
            }
        })
          .catch((error) => {
            alert('Unable to create a account');
            console.error('Error logging in:', error);
          });
      }
   
  return (
    <section
      className="h-100 gradient-form"
      style={{ backgroundColor: "#eee" }}
    >
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-xl-10">
            <div className="card rounded-3 text-black">
              <div className="row g-0">
                <div className="col-lg-6">
                  <div className="card-body p-md-5 mx-md-4">
                    <div className="text-center">
                      <h4 className="mt-1 mb-5 pb-1">The Bayer Team</h4>
                    </div>
 
                    <form onSubmit={handleSubmit}>
                      <p>Create your account</p>
 
                      <div data-mdb-input-init className="form-outline mb-2">
                      <label className="form-label" htmlFor="formName">
                          First Name
                        </label>
                        <input
                          type="text"
                          id="FirstName"
                          name="first_name"
                          className="form-control"
                          placeholder="First Name"
                          value={formData.fullName}
                          onChange={handleChange}
                          required
                        />
 
                        {errors.fullName && <p className="text-danger">{errors.fullName}</p>}
                      </div>
                      <div data-mdb-input-init className="form-outline mb-2">
                      <label className="form-label" htmlFor="formName">
                          Last Name
                        </label>
                        <input
                          type="text"
                          id="LastName"
                          name="last_name"
                          className="form-control"
                          placeholder="Last Name"
                          value={formData.fullName}
                          onChange={handleChange}
                          required
                        />
 
                        {errors.fullName && <p className="text-danger">{errors.fullName}</p>}
                      </div>
 
                      <div data-mdb-input-init className="form-outline mb-2">
                      <label className="form-label" htmlFor="formEmail">
                          Email
                        </label>
                        <input
                          type="email"
                          id="formEmail"
                          name="email"
                          className="form-control"
                          placeholder="Email address"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
 
                        {errors.email && <p className="text-danger">{errors.email}</p>}
                      </div>
 
 
                      <div data-mdb-input-init className="form-outline mb-2">
                      <label className="form-label" htmlFor="formPassword">
                          Password
                        </label>
                        <input
                          type="password"
                          id="formPassword"
                          name="password"
                          className="form-control"
                          placeholder="Password"
                          value={formData.password}
                          onChange={handleChange}
                          required
                        />
 
                        {errors.password && <p className="text-danger">{errors.password}</p>}
                      </div>
 
 
                      <div data-mdb-input-init className="form-outline mb-2">
                      <label className="form-label" htmlFor="formConfirmPassword">
                          Confirm Password
                        </label>
                        <input
                          type="password"
                          id="formConfirmPassword"
                          name="confirmPassword"
                          className="form-control"
                          placeholder="Confirm Password"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          required
                        />
                        {errors.confirmPassword && <p className="text-danger">{errors.confirmPassword}</p>}
                      </div>
 
                      <div className="text-center  pt-1 mb-3 pb-1">
                        <button
                          type="submit"
                          data-mdb-button-init
                          data-mdb-ripple-init
                          className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3"
                        >
                          Register
                        </button>
                      </div>
 
                      <div className="d-flex align-items-center justify-content-center pb-4">
                        <p className="mb-0 me-2">Already have an account?</p>
                        <button
                          type="button"
                          data-mdb-button-init
                          data-mdb-ripple-init
                          className="btn btn-outline-danger"
                        >
                          <Link  style={{ textDecoration: 'none', color: 'inherit' }} to='/'>Log in</Link>
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                <LoginSectionRight />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
 
export default Register;