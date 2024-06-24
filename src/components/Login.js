import { Link, useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import axios from "axios";

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function submit(e) {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:8000/login", {
                email, password
            });

            if (response.data === "exist") {
                navigate("/home", { state: { id: email } }); 
            } else if (response.data === "notExist") {
                alert("User has not signed up");
            }
        } catch (error) {
            alert("Wrong details or server error");
            console.error(error);
        }
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h1 className="card-title text-center">Login</h1>
                            <form onSubmit={submit}>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" 
                                        className="form-control" 
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter email" 
                                        id="email" required 
                                     />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input 
                                        type="password" 
                                        className="form-control"
                                        onChange={(e) => setPassword(e.target.value)} 
                                        placeholder="Enter password" 
                                        id="password" 
                                        required 
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary btn-block mt-3">Login</button>
                                <div className="text-center mt-3">
                                    <p>Or</p>
                                    <Link to="/signup">Signup Page</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
