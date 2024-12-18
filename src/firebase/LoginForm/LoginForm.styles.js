import styled from 'styled-components';

// Container for the login form
export const LoginFormContainer = styled.div`
  max-width: 400px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

// Heading and paragraph text
export const Heading = styled.h2`
  margin-bottom: 20px;
  color: black;
`;

// Info section text
export const Info = styled.div`
  color: #333;
`;

// Input group container
export const InputGroup = styled.div`
  margin-bottom: 15px;
  text-align: left;
`;

// Label for input fields
export const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  color: #555;
`;

// Input fields styling
export const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

// Buttons
export const LoginButton = styled.button`
  width: 100%;
  margin-top: 10px;
  padding:10px;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  color: white;
  background-color: #007bff;
`;

// Google login button styling
export const GoogleLoginButton = styled.button`
  width: 100%;
  margin-top: 10px;
  padding:10px;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  color: white;
  background-color: #db4437;

  &:hover {
    background-color: #c53727;
  }
`;

// Divider between sections
export const Divider = styled.div`
  margin: 20px 0;
  color: #777;
`;

// Error message styling
export const ErrorMessage = styled.div`
  color: red;
  margin-bottom: 15px;
`;
