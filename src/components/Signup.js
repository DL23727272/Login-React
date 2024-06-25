import { Link, useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import axios from "axios";
import Swal from 'sweetalert2';

    function Signup() {
        
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function submit(e) {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:8000/signup", {
                email, password
            });

            if (response.status === 201) {
                Swal.fire({
                    icon: 'success',
                    title: 'User created successfully',
                    text: response.data,
                }).then(() => {
                    navigate("/home", { state: { id: email } });
                });
            }
        } catch (error) {
            if (error.response && error.response.status === 409) {
                Swal.fire({
                    icon: 'error',
                    title: 'User already exists',
                    text: error.response.data,
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error signing up',
                    text: error.message,
                });
            }
            console.error(error);
        }
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h1 className="card-title text-center">Signup</h1>

                            <form onSubmit={submit}>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input type="email"
                                        className="form-control"
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter email"
                                        id="email"
                                        required />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input type="password"
                                        className="form-control"
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Enter password"
                                        id="password"
                                        required />
                                </div>
                                <div className="text-center mt-3 my-4">
                                    <button type="submit" className="btn btn-primary btn-block mt-3">
                                        Signup
                                    </button>

                                    <p>Or</p>
                                    <Link to="/">
                                        <button className="btn btn-primary" >
                                            Login Page
                                        </button>
                                    </Link>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;
