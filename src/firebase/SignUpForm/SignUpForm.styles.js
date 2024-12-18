import styled from 'styled-components';

// Container for the signup form
export const SignupFormContainer = styled.div`
  max-width: 400px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

// Heading for the form
export const Heading = styled.h2`
  margin-bottom: 20px;
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

// Signup button styling
export const SignupButton = styled.button`
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  color: white;
  background-color: #007bff;
`;

// Error message styling
export const ErrorMessage = styled.div`
  color: red;
  margin-bottom: 15px;
`;
