import React ,{useState,useEffect} from "react";
// import "./Booking.scss"
import { useAppContext } from "../../common/AppContext/AppContext";
import {  BookTicketButton,
    BookingModal,
    ModalContent,
    DatePicker,
    SeatSelection,
    Seats,
    ModalActions,
    StyledButton,
    Seat, } from "./Booking.styles";

const Booking = ({data}) => {
    const [showBooking, setShowBooking] = useState(false);
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [bookedSeats, setBookedSeats] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const {currentUser } = useAppContext()||{};

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
            setErrorMessage(`Seat ${seat} is already booked.`);
            return;
        }
        setErrorMessage(""); 
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
        console.log(localStorage.getItem("movieBookings"));
    };

    const handleBookTicket = () => {
        if (!selectedDate || selectedSeats.length === 0) {
            setErrorMessage("Please select a date and at least one seat.");
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
                    <BookTicketButton onClick={() => setShowBooking(true)}>Book Ticket</BookTicketButton>
                </div>
            }
            {showBooking && (
                <BookingModal>
                    <ModalContent>
                        <h2>Book Tickets for {data.Title}</h2>
                        <DatePicker>
                            <label htmlFor="date-input">Select Date:</label>
                            <input
                                id="date-input"
                                type="date"
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                            />
                        </DatePicker>
                        <SeatSelection>
                            <h3>Select Seats:</h3>
                            {errorMessage && <div role="alert" className="error-message">{errorMessage}</div>}
                            <Seats>
                                {[...Array(30).keys()].map((seat) => (
                                    <Seat
                                        key={seat}
                                        value={0}
                                        className={`seat ${selectedSeats.includes(seat + 1) ? 'selected' : ''} ${bookedSeats.includes(seat + 1) ? 'booked' : ''}`}
                                        onClick={() => handleSeatClick(seat + 1)}
                                    >
                                        {seat + 1}
                                    </Seat>
                                ))}
                            </Seats>
                        </SeatSelection>
                        <ModalActions>
                            <StyledButton onClick={handleBookTicket}>Confirm Booking</StyledButton>
                            <StyledButton onClick={() => setShowBooking(false)}>Cancel</StyledButton>
                        </ModalActions>
                    </ModalContent>
                </BookingModal>
            )}
        </div>
    )
}

export default Booking;
