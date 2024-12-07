import React, { useState } from "react";
import { signUpWithEmailAndPassword } from "../firebase";
 import "./SignUpForm.scss";
import { useNavigate } from "react-router-dom";

const SignUpForm = ({ }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const navigate=useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            if (password === confirmPassword) {
                const user = await signUpWithEmailAndPassword(email, password);
                console.log("SignUp successful:", user);
                setError("");
                navigate("/login");
            } else {
                setError("Password and Confirm password are not same");
            }

        } catch (err) {
            console.error("Error while SignUp :", err.message);
            setError("Failed to SignUp. Please try again.");
        }
    };

    return (
        <div className="signup-form-container">
            <h2>Sign Up</h2>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSignUp}>
                <div className="input-group">
                    <label>Email</label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label>Password</label>
                    <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label>Password</label>
                    <input
                        type="password"
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="signup-button">SignUp</button>
            </form>
        </div>
    );
};

export default SignUpForm;
