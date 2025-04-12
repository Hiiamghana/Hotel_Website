// import { parseISO } from 'date-fns';
// import React, { useEffect, useState } from 'react';
// import DateSlider from '../common/DateSlider';

// const BookingsTable = ({ bookingInfo, handleBookingCancellation }) => {
//     const [filteredBookings, setFilteredBookings] = useState([]);

//     // Function to filter bookings based on selected dates
//     const filterBookings = (startDate, endDate) => {
//         if (!startDate || !endDate) {
//             setFilteredBookings(bookingInfo);
//             return;
//         }

//         const filtered = bookingInfo.filter((booking) => {
//             const bookingStartDate = parseISO(booking.checkInDate).getTime();
//             const bookingEndDate = parseISO(booking.checkOutDate).getTime();
//             return (
//                 bookingStartDate >= startDate.getTime() &&
//                 bookingEndDate <= endDate.getTime()
//             );
//         });

//         setFilteredBookings(filtered);
//     };

//     // Update filtered bookings when bookingInfo changes
//     useEffect(() => {
//         setFilteredBookings(bookingInfo);
//     }, [bookingInfo]);

//     return (
//         <section className="p-4">
//             <DateSlider onDateChange={filterBookings} />
//             <div className="table-responsive">
//                 <table className="table table-striped table-bordered table-hover">
//                     <thead className="thead-dark">
//                         <tr>
//                             <th className="align-middle">S/N</th>
//                             <th className="align-middle">Booking ID</th>
//                             <th className="align-middle">Room Id</th>
//                             <th className="align-middle">Room Type</th>
//                             <th className="align-middle">Check-In Date</th>
//                             <th className="align-middle">Check-Out Date</th>
//                             <th className="align-middle">Guest Name</th>
//                             <th className="align-middle">Guest Email</th>
//                             <th className="align-middle">Adults</th>
//                             <th className="align-middle">Children</th>
//                             <th className="align-middle">Total Guests</th>
//                             <th className="align-middle">Confirmation Code</th>
//                             <th className="align-middle">Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {filteredBookings.map((booking, index) => (
//                             <tr key={booking.id}>
//                                 <td className="align-middle">{index + 1}</td>
//                                 <td className="align-middle">{booking.id}</td>
//                                 <td className="align-middle">{booking.room?.id || "N/A"}</td>
//                                 <td className="align-middle">{booking.room.roomType}</td>
//                                 <td className="align-middle">{booking.checkInDate}</td>
//                                 <td className="align-middle">{booking.checkOutDate}</td>
//                                 <td className="align-middle">{booking.guestName}</td>
//                                 <td className="align-middle">{booking.guestEmail}</td>
//                                 <td className="align-middle">{booking.numOfAdults}</td>
//                                 <td className="align-middle">{booking.numOfChildren}</td>
//                                 <td className="align-middle">{booking.totalNumOfGuest}</td>
//                                 <td className="align-middle">{booking.bookingConfirmationCode}</td>
//                                 <td className="align-middle">
//                                     <button
//                                         className="btn btn-danger btn-sm"
//                                         onClick={() =>
//                                             handleBookingCancellation(booking.id)
//                                         }
//                                     >
//                                         Cancel
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//             {filteredBookings.length === 0 && (
//                 <div className="alert alert-info mt-3">No bookings found for the selected dates.</div>
//             )}
//         </section>
//     );
// };

// export default BookingsTable;


import { parseISO } from 'date-fns';
import React, { useEffect, useState } from 'react';
import DateSlider from '../common/DateSlider';

const BookingsTable = ({ bookingInfo, handleBookingCancellation }) => {
    const [filteredBookings, setFilteredBookings] = useState([]);

    const isValidDateString = (date) => typeof date === 'string' && !isNaN(Date.parse(date));

    // Function to filter bookings based on selected dates
    const filterBookings = (startDate, endDate) => {
        if (!startDate || !endDate) {
            setFilteredBookings(bookingInfo);
            return;
        }

        const filtered = bookingInfo.filter((booking) => {
            if (!Array.isArray(booking.checkInDate) || !Array.isArray(booking.checkOutDate)) {
                return false; // Skip if dates are not in expected array format
            }

            const bookingStartDate = new Date(...booking.checkInDate).getTime();
        const bookingEndDate = new Date(...booking.checkOutDate).getTime();

        return (
            bookingStartDate >= startDate.getTime() &&
            bookingEndDate <= endDate.getTime()
        );
    });

    setFilteredBookings(filtered);
};

    useEffect(() => {
        setFilteredBookings(bookingInfo);
    }, [bookingInfo]);

    return (
        <section className="p-4">
            <DateSlider onDateChange={filterBookings} />
            <div className="table-responsive">
                <table className="table table-striped table-bordered table-hover">
                    <thead className="thead-dark">
                        <tr>
                            <th className="align-middle">S/N</th>
                            <th className="align-middle">Booking ID</th>
                            <th className="align-middle">Room Id</th>
                            <th className="align-middle">Room Type</th>
                            <th className="align-middle">Check-In Date</th>
                            <th className="align-middle">Check-Out Date</th>
                            <th className="align-middle">Guest Name</th>
                            <th className="align-middle">Guest Email</th>
                            <th className="align-middle">Adults</th>
                            <th className="align-middle">Children</th>
                            <th className="align-middle">Total Guests</th>
                            <th className="align-middle">Confirmation Code</th>
                            <th className="align-middle">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredBookings.map((booking, index) => (
                            <tr key={booking.id}>
                                <td className="align-middle">{index + 1}</td>
                                <td className="align-middle">{booking.id}</td>
                                <td className="align-middle">{booking.room?.id || "N/A"}</td>
                                <td className="align-middle">{booking.room?.roomType || "N/A"}</td>
                                <td className="align-middle">{new Date(...booking.checkInDate).toLocaleDateString('en-GB')}</td>
                                <td className="align-middle">{new Date(...booking.checkOutDate).toLocaleDateString('en-GB')}</td>
                                <td className="align-middle">{booking.guestName}</td>
                                <td className="align-middle">{booking.guestEmail}</td>
                                <td className="align-middle">{booking.numOfAdults}</td>
                                <td className="align-middle">{booking.numOfChildren}</td>
                                <td className="align-middle">{booking.totalNumOfGuest}</td>
                                <td className="align-middle">{booking.bookingConfirmationCode}</td>
                                <td className="align-middle">
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() =>
                                            handleBookingCancellation(booking.id)
                                        }
                                    >
                                        Cancel
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {filteredBookings.length === 0 && (
                <div className="alert alert-info mt-3">No bookings found for the selected dates.</div>
            )}
        </section>
    );
};

export default BookingsTable;
