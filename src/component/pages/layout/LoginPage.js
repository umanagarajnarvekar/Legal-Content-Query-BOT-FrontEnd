import React, { useState } from "react";
import "../css/Auth.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import url from '../../assets/data/url.json'
import LoginSectionRight from '../../common/LoginSectionRight'//"./Common/LoginSectionRight";
import axios from "axios";

const Login = () => {

    const [login, setlogin] = useState({email: '',"password": '',});
      const myurl = new URL(url.url) 
      const navigate = useNavigate(); 
    
      const handleChange = (event) => {
        const { name, value } = event.target;
        setlogin({...login,[name]: value,});
      };
    
      const handleSubmit =  (event) => {
        event.preventDefault();
        axios.post(`${myurl}auth`, {
            email:login.email,
            password:login.password
        })
        .then((response) => {
          if (response.status === 200) {
            console.log('Login successful:', response.data);
            navigate('/upload'); 
          }
        })
        .catch((error) => {
          alert('Invalid credentials');
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
                    {console.log(`${myurl}/token`)}
                    <form onSubmit={handleSubmit}>
                      <p>Please login to your account</p>

                      <div data-mdb-input-init className="form-outline mb-2">
                      <label className="form-label" htmlFor="form2Example11">
                          Username
                        </label>
                        <input
                          required
                          type="email"
                          id="form2Example11"
                          className="form-control"
                          placeholder="Email address"
                          name="email"
                          onChange={handleChange}
                        />

                      </div>

                      <div data-mdb-input-init className="form-outline mb-2">
                      <label className="form-label" htmlFor="form2Example22">
                          Password
                        </label>
                        <input
                          required
                          type="password"
                          id="form2Example22"
                          className="form-control"
                          name="password"
                          onChange={handleChange}
                        />
                      </div>

                      <div className="text-center pt-1 mb-5 pb-1">
                        <button
                          type="submit"
                          data-mdb-button-init
                          data-mdb-ripple-init
                          className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3"
                        >
                          Log in
                        </button>
                      </div>

                      <div className="d-flex align-items-center justify-content-center pb-4">
                        <p className="mb-0 me-2">Don't have an account?</p>
                        <button
                          type="button"
                          data-mdb-button-init
                          data-mdb-ripple-init
                          className="btn btn-outline-danger"
                        >
                          <Link
                            style={{ textDecoration: "none", color: "inherit" }}
                            to="/register"
                          >
                            Create new
                          </Link>
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

export default Login;
