import moment from 'moment';
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const BookingSummary = ({
    booking = {},
    payment = 0,
    isFormValid = false,
    onConfirmed = () => {} // ✅ Safe fallback if not provided
}) => {
    const checkInDate = moment(booking.checkInDate);
    const checkOutDate = moment(booking.checkOutDate);
    const numberOfDays = checkOutDate.diff(checkInDate, 'days');

    const [isProcessingPayment, setIsProcessingPayment] = useState(false);
    const navigate = useNavigate();

    const handleConfirmBooking = () => {
        if (!isFormValid) return;

        setIsProcessingPayment(true);

        setTimeout(() => {
            setIsProcessingPayment(false);
            onConfirmed(); // ✅ Safe to call even if not passed in
            navigate("/booking-success", {
                replace: true,
                state: { message: "Your booking has been confirmed!" }
            });
        }, 3000);
    };

    return (
        <div className='card card-body mt-5' style={{ minHeight: '450px' }}>
            <h4>Reservation Summary</h4>

            <p>Full Name: <strong>{booking.guestFullName}</strong></p>
            <p>Email: <strong>{booking.guestEmail}</strong></p>
            <p>Check-In Date: <strong>{checkInDate.format('MMM Do YYYY')}</strong></p>
            <p>Check-Out Date: <strong>{checkOutDate.format('MMM Do YYYY')}</strong></p>
            <p>Number of Days: <strong>{numberOfDays}</strong></p>

            <div>
                <h5>Number of Guests</h5>
                <p><strong>Adults: {booking.numOfAdults}</strong></p>
                <p><strong>Children: {booking.numOfChildren}</strong></p>
            </div>

            {payment > 0 ? (
                <>
                    <p>Total Payment: <strong>{payment}</strong></p>

                    {isFormValid ? (
                        <Button
                            variant='success'
                            onClick={handleConfirmBooking}
                            disabled={isProcessingPayment}
                        >
                            {isProcessingPayment ? (
                                <>
                                    <span className='spinner-border spinner-border-sm mr-2' role='status' aria-hidden='true'></span>
                                    Processing Payment...
                                </>
                            ) : (
                                'Confirm Booking and Proceed to Payment'
                            )}
                        </Button>
                    ) : (
                        <p className="text-danger mt-2">Please complete the form before proceeding.</p>
                    )}

                    {isProcessingPayment && (
                        <div className='d-flex justify-content-center align-items-center mt-3'>
                            <div className='spinner-border text-primary' role='status'>
                                <span className='sr-only'>Processing...</span>
                            </div>
                        </div>
                    )}
                </>
            ) : (
                <p className='text-danger'>Check-out date must be after check-in date.</p>
            )}
        </div>
    );
};

export default BookingSummary;
