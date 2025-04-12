
import React, { useState } from "react";
import moment from "moment";
import { cancelBooking, getBookingByConfirmationCode } from "../utils/ApiFunctions";

const FindBooking = () => {
	const [confirmationCode, setConfirmationCode] = useState("");
	const [error, setError] = useState(null);
	const [successMessage, setSuccessMessage] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [bookingInfo, setBookingInfo] = useState({
		id: "",
		bookingConfirmationCode: "",
		room: { id: "", roomType: "" },
		roomNumber: "",
		checkInDate: "",
		checkOutDate: "",
		guestName: "",
		guestEmail: "",
		numOfAdults: "",
		numOfChildren: "",
		totalNumOfGuest: "",
	});

	const emptyBookingInfo = {
		id: "",
		bookingConfirmationCode: "",
		room: { id: "", roomType: "" },
		roomNumber: "",
		checkInDate: "",
		checkOutDate: "",
		guestName: "",
		guestEmail: "",
		numOfAdults: "",
		numOfChildren: "",
		totalNumOfGuest: "",
	};
	const [isDeleted, setIsDeleted] = useState(false);

	const handleInputChange = (event) => {
		setConfirmationCode(event.target.value);
	};

	const handleFormSubmit = async (event) => {
		event.preventDefault();
		setIsLoading(true);

		try {
			const data = await getBookingByConfirmationCode(confirmationCode);
			setBookingInfo(data);
			setError(null);
		} catch (error) {
			setBookingInfo(emptyBookingInfo);
			if (error.response && error.response.status === 404) {
				setError(error.response.data.message);
			} else {
				setError(error.message);
			}
		}

		setTimeout(() => setIsLoading(false), 2000);
	};

	const handleBookingCancellation = async (bookingId) => {
		try {
			await cancelBooking(bookingInfo.id);
			setIsDeleted(true);
			setSuccessMessage("Booking has been cancelled successfully!");
			setBookingInfo(emptyBookingInfo);
			setConfirmationCode("");
			setError(null);
		} catch (error) {
			setError(error.message);
		}
		setTimeout(() => {
			setSuccessMessage("");
			setIsDeleted(false);
		}, 2000);
	};

	return (
		<div className="container d-flex flex-column align-items-center mt-5">
			<div className="col-md-6">
				<div className="card shadow-lg p-4 rounded-3">
					<h2 className="text-center mb-4 text-primary">Find My Booking</h2>

					<form onSubmit={handleFormSubmit} className="d-flex flex-column gap-3">
						<div className="input-group">
							<input
								className="form-control border-primary"
								type="text"
								id="confirmationCode"
								name="confirmationCode"
								value={confirmationCode}
								onChange={handleInputChange}
								placeholder="Enter your confirmation code"
							/>
							<button type="submit" className="btn btn-primary">
								Find Booking
							</button>
						</div>
					</form>

					{isLoading && <div className="mt-3 text-center text-muted">Finding your booking...</div>}

					{error && <div className="alert alert-danger mt-3 text-center">{error}</div>}

					{bookingInfo.bookingConfirmationCode && !isDeleted && (
						<div className="mt-4">
							<h4 className="text-center text-secondary">Booking Information</h4>
							<hr />
							<div className="p-3 rounded-3 bg-light">
								<p className="text-success fw-bold">
									Confirmation Code: {bookingInfo.bookingConfirmationCode}
								</p>
								<p><strong>Room Number:</strong> {bookingInfo.room.id}</p>
								<p><strong>Room Type:</strong> {bookingInfo.room.roomType}</p>
								<p>
									<strong>Check-in Date:</strong>{" "}
									{moment(bookingInfo.checkInDate).subtract(1, "month").format("MMM Do, YYYY")}
								</p>
								<p>
									<strong>Check-out Date:</strong>{" "}
									{moment(bookingInfo.checkOutDate).subtract(1, "month").format("MMM Do, YYYY")}
								</p>
								<p><strong>Full Name:</strong> {bookingInfo.guestName}</p>
								<p><strong>Email Address:</strong> {bookingInfo.guestEmail}</p>
								<p><strong>Adults:</strong> {bookingInfo.numOfAdults}</p>
								<p><strong>Children:</strong> {bookingInfo.numOfChildren}</p>
								<p><strong>Total Guests:</strong> {bookingInfo.totalNumOfGuest}</p>

								<div className="text-center mt-3">
									<button
										onClick={() => handleBookingCancellation(bookingInfo.id)}
										className="btn btn-danger">
										Cancel Booking
									</button>
								</div>
							</div>
						</div>
					)}

					{isDeleted && (
						<div className="alert alert-success mt-3 text-center fade show">
							{successMessage}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default FindBooking;
