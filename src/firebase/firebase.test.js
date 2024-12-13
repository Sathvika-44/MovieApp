import { signInWithGoogle, signInWithEmail, signUpWithEmailAndPassword } from './firebase';  // Adjust the import path
import { getAuth, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider } from 'firebase/auth';

// Mock Firebase methods
jest.mock('firebase/auth', () => ({
    getAuth: jest.fn(),
    createUserWithEmailAndPassword: jest.fn(),
    signInWithEmailAndPassword: jest.fn(),
    signInWithPopup: jest.fn(),
    GoogleAuthProvider: jest.fn(),
}));

describe('Firebase authentication functions', () => {
    
    // Test for Google Sign-In
    it('should sign in with Google successfully', async () => {
        const mockUser = { email: 'test@example.com' };
        signInWithPopup.mockResolvedValue({ user: mockUser });  // Mock successful Google sign-in
        
        const user = await signInWithGoogle();
        
        expect(user).toEqual(mockUser);
        expect(signInWithPopup).toHaveBeenCalledTimes(1);  // Ensure the function is called once
    });

    // Test for Email Sign-In
    it('should sign in with email and password successfully', async () => {
        const mockUser = { email: 'test@example.com' };
        signInWithEmailAndPassword.mockResolvedValue({ user: mockUser });  // Mock successful email sign-in
        
        const user = await signInWithEmail('test@example.com', 'password123');
        
        expect(user).toEqual(mockUser);
        expect(signInWithEmailAndPassword).toHaveBeenCalledTimes(1);  // Ensure the function is called once
    });

    // Test for Email Sign-Up
    it('should sign up with email and password successfully', async () => {
        const mockUser = { email: 'newuser@example.com' };
        createUserWithEmailAndPassword.mockResolvedValue({ user: mockUser });  // Mock successful sign-up
        
        const user = await signUpWithEmailAndPassword('newuser@example.com', 'password123');
        
        expect(user).toEqual(mockUser);
        expect(createUserWithEmailAndPassword).toHaveBeenCalledTimes(1);  // Ensure the function is called once
    });

    // Test for Google Sign-In Failure
    it('should throw an error if Google sign-in fails', async () => {
        const mockError = new Error('Google sign-in failed');
        signInWithPopup.mockRejectedValue(mockError);  // Mock sign-in failure
        
        await expect(signInWithGoogle()).rejects.toThrow('Google sign-in failed');
    });

    // Test for Email Sign-In Failure
    it('should throw an error if email sign-in fails', async () => {
        const mockError = new Error('Invalid email or password');
        signInWithEmailAndPassword.mockRejectedValue(mockError);  // Mock sign-in failure
        
        await expect(signInWithEmail('test@example.com', 'wrongpassword')).rejects.toThrow('Invalid email or password');
    });

    // Test for Email Sign-Up Failure
    it('should throw an error if email sign-up fails', async () => {
        const mockError = new Error('Sign-up failed');
        createUserWithEmailAndPassword.mockRejectedValue(mockError);  // Mock sign-up failure
        
        await expect(signUpWithEmailAndPassword('newuser@example.com', 'password123')).rejects.toThrow('Sign-up failed');
    });
});
