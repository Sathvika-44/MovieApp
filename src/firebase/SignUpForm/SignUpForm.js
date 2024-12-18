import React, { useState } from "react";
import { signUpWithEmailAndPassword } from "../firebase";
//  import "./SignUpForm.scss";
import { useNavigate } from "react-router-dom";
import { SignupFormContainer, 
    Heading, 
    InputGroup, 
    Label, 
    Input, 
    SignupButton, 
    ErrorMessage  } from "./SignUpForm.styles";

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
        <SignupFormContainer>
            <Heading>Sign Up</Heading>
            {error && <ErrorMessage data-testid="error-message" className="error-message">{error}</ErrorMessage>}
            <form onSubmit={handleSignUp}>
                <InputGroup>
                    <Label htmlFor="email">Email</Label>
                    <Input
                        type="email"
                        id="email"
                        data-testid="email"
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
                        data-testid="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </InputGroup>
                <InputGroup>
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input
                        type="password"
                        id="confirm-password"
                        data-testid="confirm-password"
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </InputGroup>
                <SignupButton type="submit" className="signup-button">SignUp</SignupButton>
            </form>
        </SignupFormContainer>
    );
};

export default SignUpForm;
