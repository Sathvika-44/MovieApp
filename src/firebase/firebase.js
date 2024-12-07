
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup,signInWithEmailAndPassword,createUserWithEmailAndPassword  } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDtNKQ27IvOTrw2o1Jy4w07DXwsR51h83M",
  authDomain: "react-movie-app-6c6c9.firebaseapp.com",
  projectId: "react-movie-app-6c6c9",
  storageBucket: "react-movie-app-6c6c9.firebasestorage.app",
  messagingSenderId: "922186643690",
  appId: "1:922186643690:web:2c5883752610efbf81bf93",
  measurementId: "G-WTR8XZ0399"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.error("Error during sign-in", error);
    throw error;
  }
};

export const signInWithEmail = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        console.error("Email/password login error:", error.message);
        throw error;
    }
};

export const signUpWithEmailAndPassword = async (email, password) => {
  try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      return userCredential.user;
  } catch (error) {
      console.error(" SignUp error:", error.message);
      throw error;
  }
};