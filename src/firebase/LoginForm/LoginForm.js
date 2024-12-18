import React, { useState } from "react";
import { signInWithGoogle, signInWithEmail } from "../firebase";
// import "./LoginForm.scss";
import { Link } from "react-router-dom";
import { Divider, ErrorMessage, Input, InputGroup, Label, LoginFormContainer ,LoginButton,GoogleLoginButton, Info, Heading} from "./LoginForm.styles";

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
        <LoginFormContainer>
            <Heading>Login</Heading>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <form data-testid="login-form" onSubmit={handleEmailLogin}>
                <InputGroup>
                    <Label htmlFor="email">Email</Label>
                    <Input
                        type="email"
                        id="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </InputGroup>
                <InputGroup>
                    <Label htmlFor="password">Password</Label>
                    <Input
                        type="password"
                        id="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </InputGroup>
                <LoginButton type="submit" data-testid="login-button" className="login-button">Login</LoginButton>
            </form>
            <Divider>OR</Divider>
            <GoogleLoginButton onClick={handleGoogleLogin}
                data-testid="google-login-button"
                className="google-login-button">
                Login with Google
            </GoogleLoginButton>
            <Info id="info">Don't have the account,<Link to="/signup" style={{ color: "blue" }}>Register</Link></Info>
        </LoginFormContainer>
    );
};

export default LoginForm;
