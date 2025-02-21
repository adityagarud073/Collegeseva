import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import "../style/style.scss";

const Login = () => {
  const navigate = useNavigate();
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      setLoading(true);
      // Send a POST request to your backend endpoint for user login
      const response = await fetch("http://localhost:4000/api/v1/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // If login successful, redirect to the home page
        navigate("/");
      } else {
        // If login failed, display error message
        setErr(true);
      }
    } catch (err) {
      console.error("Error logging in:", err);
      setErr(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='formContainer'>
      <div className='formWrapper'>
        <span className='logo'>College Seva</span>
        <span className='title'>Login</span>
        <form onSubmit={handleSubmit}>
          <input type='email' placeholder='Email' />
          <input type='password' placeholder='Password' />
          <button disabled={loading}>Login</button>
          {err && <span>Incorrect email or password</span>}
        </form>
        <p>
          {" "}
          Don't have an account ? <Link to='/register'>Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
