import React ,{useState,useEffect} from "react";
import "./Booking.scss"
import { useAppContext } from "../AppContext";

const Booking = ({data}) => {
    const [showBooking, setShowBooking] = useState(false);
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [bookedSeats, setBookedSeats] = useState([]);
    const {currentUser } = useAppContext();

    useEffect(() => {
        const allBookings = JSON.parse(localStorage.getItem('movieBookings')) || {};
        const currentUserBookings = allBookings[currentUser?.email] || [];
        
        // Collect all booked seats from the current user's bookings
        const allBookedSeats = currentUserBookings.reduce((seats, booking) => {
            if (booking.date === selectedDate) {
                return [...seats, ...booking.seats];
            }
            return seats;
        }, []);

        setBookedSeats(allBookedSeats);  // Update booked seats
    }, [selectedDate, currentUser]);

    const handleSeatClick = (seat) => {
        if (bookedSeats.includes(seat)) {
            alert(`Seat ${seat} is already booked.`);
            return;
        }
        setSelectedSeats((prevSeats) =>
            prevSeats.includes(seat)
                ? prevSeats.filter((s) => s !== seat)
                : [...prevSeats, seat]
        );
    };
    const saveBookingToLocalStorage = (booking) => {
        const existingBookings = JSON.parse(localStorage.getItem("movieBookings")) || {};
        const userBookings = existingBookings[currentUser.email] || [];
        const updatedBookings=[...userBookings,booking];
        localStorage.setItem(
            "movieBookings",
            JSON.stringify({
                ...existingBookings,
                [currentUser.email]: updatedBookings,
                
            })

        );
       // setShowBooking(updatedBookings);
        console.log(localStorage.getItem("movieBookings"));
    };

    const handleBookTicket = () => {
        if (!selectedDate || selectedSeats.length === 0) {
            alert("Please select a date and at least one seat.");
            return;
        }

        const booking = {
            movie: data.Title,
            date: selectedDate,
            seats: selectedSeats,
        };

        saveBookingToLocalStorage(booking);
        alert(`Booked ${selectedSeats.length} seat(s) for ${selectedDate}`);
        setShowBooking(false);
        setSelectedDate("");
    };



    return (
        <div>
            {currentUser &&
                <div className="book-ticket">
                    <button onClick={() => setShowBooking(true)}>Book Ticket</button>
                </div>
            }
            {showBooking && (
                <div className='booking-modal'>
                    <div className='modal-content'>
                        <h2>Book Tickets for {data.Title}</h2>
                        <div className='date-picker'>
                            <label>Select Date:</label>
                            <input
                                type="date"
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                            />
                        </div>
                        <div className='seat-selection'>
                            <h3>Select Seats:</h3>
                            <div className='seats'>
                                {[...Array(30).keys()].map((seat) => (
                                    <div
                                        key={seat}
                                        value={0}
                                        className={`seat ${selectedSeats.includes(seat + 1) ? 'selected' : ''} ${bookedSeats.includes(seat + 1) ? 'booked' : ''}`}
                                        onClick={() => handleSeatClick(seat + 1)}
                                    >
                                        {seat + 1}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className='modal-actions'>
                            <button onClick={handleBookTicket}>Confirm Booking</button>
                            <button onClick={() => setShowBooking(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
            <div></div>
        </div>
    )
}

export default Booking;
