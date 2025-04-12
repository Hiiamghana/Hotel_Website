import React, { useEffect, useState } from 'react';
import { bookRoom, getRoomById } from '../utils/ApiFunctions';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import { Form, Button, Card, Container, Row, Col, FormControl } from 'react-bootstrap';
import BookingSummary from './BookingSummary';

const BookingForm = () => {
    const [isValidated, setIsValidated] = useState(false);
    const [isSubmited, setIsSubmited] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [roomPrice, setRoomPrice] = useState(0);
    const currentUser = localStorage.getItem("userId")
    const [booking, setBooking] = useState({
        guestFullName: "",
        guestEmail: "",
        checkInDate: "",
        checkOutDate: "",
        numOfAdults: "",
        numOfChildren: ""
    });

    const { roomId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRoomPrice = async () => {
            try {
                const response = await getRoomById(roomId);
                setRoomPrice(response.roomPrice);
            } catch (error) {
                console.error("Error fetching room price:", error);
            }
        };
        fetchRoomPrice();
    }, [roomId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBooking({ ...booking, [name]: value });
        setErrorMessage("");
    };

    const isEmailValid = (email) => {
        const gmailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        return gmailPattern.test(email);
    };

    const calculatePayment = () => {
        const checkInDate = moment(booking.checkInDate);
        const checkOutDate = moment(booking.checkOutDate);
        const diffInDays = checkOutDate.diff(checkInDate, "days");
        return diffInDays * roomPrice;
    };

    const isGuestCountValid = () => {
        if (!booking.numOfAdults || parseInt(booking.numOfAdults) < 1) {
            setErrorMessage("At least 1 adult is required.");
            return false;
        }
        return true;
    };

    const isCheckOutDateValid = () => {
        if (!moment(booking.checkOutDate).isAfter(moment(booking.checkInDate))) {
            setErrorMessage("Check-out date must be after check-in date");
            return false;
        }
        setErrorMessage("");
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isGuestCountValid() || !isCheckOutDateValid()) return;
        if (!isEmailValid(booking.guestEmail)) {
            setErrorMessage("Please enter a valid Gmail address (e.g., example@gmail.com)");
            return;
        }
        setIsValidated(true);
        setIsSubmited(true);
    };

    const handleBooking = async () => {
        try {
            const response = await bookRoom(roomId, booking);
            navigate("/booking-success", { state: { message: response } });
        } catch (error) {
            setErrorMessage(error.message);
            navigate("/booking-success", { state: { error: error.message } });
        }
    };

    return (
        <Container className="mt-5 mb-5">
            <Row>
                {/* Booking Form Column */}
                <Col md={6}>
                    <Card className="shadow-lg p-4" style={{ minHeight: '450px' , minWidth: '340px'}}>
                        <h3 className="mb-4 text-center">Reserve Your Room</h3>
                        <Form noValidate validated={isValidated} onSubmit={handleSubmit}>
                            
                            {/* Full Name */}
                            <Form.Group className="mb-3">
                                <Form.Label>Full Name:</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    name="guestFullName"
                                    value={booking.guestFullName}
                                    placeholder="Enter full name"
                                    onChange={handleInputChange}
                                />
                            </Form.Group>

                            {/* Email */}
                            <Form.Group className="mb-3">
                                <Form.Label>Email:</Form.Label>
                                <Form.Control
                                    required
                                    type="email"
                                    name="guestEmail"
                                    value={booking.guestEmail}
                                    placeholder="Enter your Gmail"
                                    onChange={handleInputChange}
                                />
                            </Form.Group>

                            {/* Check-In and Check-Out Dates in the Same Row */}
                            <Row className="mb-3">
                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Label>Check-In Date:</Form.Label>
                                        <Form.Control
                                            required
                                            type="date"
                                            name="checkInDate"
                                            value={booking.checkInDate}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Label>Check-Out Date:</Form.Label>
                                        <Form.Control
                                            required
                                            type="date"
                                            name="checkOutDate"
                                            value={booking.checkOutDate}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>

                            {/* Adults and Children in the Same Row */}
                            <Row className="mb-3">
                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Label>Adults:</Form.Label>
                                        <Form.Control
                                            required
                                            type="number"
                                            name="numOfAdults"
                                            min="1"
                                            value={booking.numOfAdults}
                                            placeholder="Number of Adults"
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Label>Children:</Form.Label>
                                        <Form.Control
                                            required
                                            type="number"
                                            name="numOfChildren"
                                            min="0"
                                            value={booking.numOfChildren}
                                            placeholder="Number of Children"
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>

                            {errorMessage && <p className="text-danger text-center">{errorMessage}</p>}
                            <Button type="submit" className="w-100 btn-primary">Continue</Button>
                        </Form>
                    </Card>
                </Col>

                {/* Booking Summary Column - shown only when form is submitted and valid */}
                
                {isSubmited && isValidated && (
                    
                    <Col md={6} >
                       
                        
                        <BookingSummary
                            booking={booking}
                            payment={calculatePayment()}
                            isFormValid={isValidated}
                            onConfirmed={handleBooking}
                        />
                        
                    </Col>
                )}
            </Row>
        </Container>
    );
};







export default BookingForm;