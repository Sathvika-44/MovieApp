import React, { useState } from "react";
import { signInWithGoogle, signInWithEmail } from "../firebase";
import "./LoginForm.scss";
import { Link } from "react-router-dom";

const LoginForm = ({ onLoginSuccess }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleEmailLogin = async (e) => {
        e.preventDefault();
        try {
            const user = await signInWithEmail(email, password);
            console.log("Email login successful:", user);
            setError("");
            onLoginSuccess(user); // Pass user data back to the parent
        } catch (err) {
            console.error("Email login error:", err.message);
            setError("Invalid email or password. Please try again.");
        }
    };

    const handleGoogleLogin = async () => {
        try {
            const user = await signInWithGoogle();
            console.log("Google login successful:", user);
            setError("");
            onLoginSuccess(user); // Pass user data back to the parent
        } catch (err) {
            console.error("Google login error:", err.message);
            setError("Google login failed. Please try again.");
        }
    };

    return (
        <div className="login-form-container">
            <h2>Login</h2>
            {error && <div className="error-message">{error}</div>}
            <form data-testid="login-form" onSubmit={handleEmailLogin}>
                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" data-testid="login-button" className="login-button">Login</button>
            </form>
            <div className="divider">OR</div>
            <button onClick={handleGoogleLogin}
                data-testid="google-login-button"
                className="google-login-button">
                Login with Google
            </button>
            <p id="info">Don't have the account,<Link to="/signup" style={{ color: "blue" }}>Register</Link></p>
        </div>
    );
};

export default LoginForm;
