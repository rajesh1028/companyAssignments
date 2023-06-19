import React, { useState, useEffect } from "react";
//import { useHistory } from 'react-router-dom';

const Login = () => {
    //const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    };

    const dataSubmit = async (event) => {
        event.preventDefault();

        setError("");

        if (email && password) {
            try {
                const res = await fetch(`https://oembackend.onrender.com/user/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password }),
                });

                if (res.ok) {
                    alert('Login successful');
                    setEmail("");
                    setPassword("");
                    const data = await res.json();
                    const token = data.token;

                    localStorage.setItem("token", token);
                    localStorage.setItem("userId", data.userID);
                    window.location.href = "/";
                } else {
                    alert('Invalid credentials')
                }
            } catch (error) {
                setError(error.message);
            }
        } else {
            window.alert('Please fill in all the details');
        }
    }

    return (
        <div className="login-box">
            <h2>LOGIN PAGE</h2>
            {error && <p>{error}</p>}
            <form onSubmit={dataSubmit}>
                <div>
                    <label>Email:</label><br />
                    <input type="email" value={email} onChange={handleEmailChange} />
                </div>
                <div>
                    <label>Password:</label><br />
                    <input type="password" value={password} onChange={handlePasswordChange} />
                </div>
                <button className="sub" type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login;