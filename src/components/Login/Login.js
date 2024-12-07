import React, { useState, useEffect } from "react";
import "./Login.scss";
import LoginForm from "../../firebase/LoginForm/LoginForm";
import { useAppContext } from "../AppContext";

const Login = () => {
    const { currentUser, setCurrentUser } = useAppContext();
    const [userBookings, setUserBookings] = useState([]);


    useEffect(() => {
        const savedUser = JSON.parse(localStorage.getItem("currentUser"));
        if (savedUser) {
            setCurrentUser(savedUser);
            fetchUserBookings(savedUser.email); // Fetch bookings for the logged-in user
        }
    }, []);

    const fetchUserBookings = (email) => {
        const allBookings = JSON.parse(localStorage.getItem("movieBookings")) || {};
        setUserBookings(allBookings[email] || []);
    };


    const handleLoginSuccess = (user) => {
        const userDetails = { email: user.email || user };
        setCurrentUser(userDetails);  // Set the current user after successful login
        localStorage.setItem("currentUser", JSON.stringify(userDetails)); // Save user details to local storage
        fetchUserBookings(user.email); // Fetch bookings for the logged-in user
        //setUserBookings(bookings); // Update bookings state
        alert("LoggedIn Successful");
    };
    const groupBookings = (bookings = []) => {
        const grouped = {};
        bookings.forEach((booking) => {
            const key = `${booking.movie}-${booking.date}`;
            if (!grouped[key]) {
                grouped[key] = {
                    movie: booking.movie,
                    date: booking.date,
                    seats: [...booking.seats],
                };
            } else {
                grouped[key].seats = [...new Set([...grouped[key].seats, ...booking.seats])];
            }
        });
        return Object.values(grouped);
    };
    const handleLogout = () => {
        setCurrentUser(null);  // Clear the user state (logout)
        localStorage.removeItem("currentUser"); // Remove user from local storage
        setUserBookings([]);
    };

    const groupedBookings = groupBookings(userBookings);

    return (
        <div>
            {!currentUser ? (
                // Show the login form if no user is logged in
                <LoginForm onLoginSuccess={handleLoginSuccess} />
            ) : (
                // Show the bookings if the user is logged in
                <div className='user-details' >
                    <div className="user-info">
                        <h2>Welcome, {currentUser.email}</h2>
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                    <h3>Your Bookings:</h3>
                    {groupedBookings.length > 0 ? (
                        <ul>
                            {groupedBookings.map((booking, index) => (
                                <li key={index} style={{ marginBottom: "15px" }}>
                                    <h4>Movie/Show: {booking.movie}</h4>
                                    <p>Date: {booking.date}</p>
                                    <p>Seats: {booking.seats.join(", ")}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No bookings found.</p>
                    )}

                </div>
            )}
        </div>
    )
}

export default Login;