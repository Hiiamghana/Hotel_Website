import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const BookingSuccess = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Ensure we have a message or error
    const message = location.state?.message || "";
    const error = location.state?.error || "";

    

    return (
        <div className="container text-center mt-5">
            {message ? (
                <div>
                    <h3 className="text-success">Booking Successful!</h3>
                    <p className="text-success">{message}</p>
                    <button className="btn btn-primary mt-3" onClick={() => navigate("/")}>
                        Go to Home
                    </button>
                </div>
            ) : error.toLowerCase().includes("not available") ? (  // More flexible check
                <div>
                    <h3 className="text-warning">Room Already Booked!</h3> {console.log("room is booked",message)}
                    <p className="text-warning">{error}</p>
                    <button className="btn btn-secondary mt-3" onClick={() => navigate("/")}>
                        Choose Another Room
                    </button>
                </div>
            ) : (
                <div>
                    <h3 className="text-danger">Error in Booking</h3>
                    <p className="text-danger">{error || "An unknown error occurred"}</p> {/* Default error message */}
                    <button className="btn btn-danger mt-3" onClick={() => navigate("/")}>
                        Try Again
                    </button>
                </div>
            )}
        </div>
    );
};

export default BookingSuccess;
