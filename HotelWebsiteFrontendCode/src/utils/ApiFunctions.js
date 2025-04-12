import axios from "axios";

const API_BASE_URL = 'http://localhost:8080' 
export const api = axios.create({
    baseURL: "http://localhost:8080"
});


export const getHeader = (isFormData = false) => {
    const token = localStorage.getItem("token");

    const headers = {
        Authorization: `Bearer ${token}`
    };

    if (!isFormData) {
        headers["Content-Type"] = "application/json";
    }

    return headers;
};



// // ✅ Function to add a new room

export async function addRoom(photo, roomType, roomPrice) {
    const formData = new FormData();
    formData.append("photo", photo);
    formData.append("roomType", roomType);
    formData.append("roomPrice", roomPrice);

    const response = await api.post("/rooms/add/new-room", formData, {
        headers: getHeader(true) // ✅ true = FormData mode
    });

    console.log(response.status + " OK ADD");
    return response.status === 200 || response.status === 201;
}






// ✅ Function to get room types
export async function getRoomType() {
    try {
        const response = await api.get("/rooms/room/types");
        return response.data;
    } catch (error) {
        throw new Error("Error fetching room type");
    }
}

// ✅ Function to get all rooms
export async function getAllRooms() {
    try {
        const result = await api.get("/rooms/all-rooms");
        return result.data;
    } catch (error) {
        console.error("Error fetching rooms:", error.response?.data || error.message);
        throw new Error("Error fetching rooms");
    }
}

// // ✅ Function to delete a room by ID

export async function deleteRoom(roomId) {
    try {
        const result = await api.delete(`/rooms/delete/room/${roomId}`, {
            headers: getHeader()
        });
        return result.status;
    } catch (error) {
        console.error("Error deleting room:", error.response?.data || error.message);
        throw new Error(`Error deleting room: ${error.response?.data || error.message}`);
    }
}




export async function updateRoom(roomId, roomData) {
    const formData = new FormData();
    formData.append("roomType", roomData.roomType);
    formData.append("roomPrice", roomData.roomPrice);
    if (roomData.photo) {
        formData.append("photo", roomData.photo);
    }

    const response = await api.put(`/rooms/update/${roomId}`, formData, {
        headers: getHeader(true)  // ✅ Send token + correct content type
    });

    return response;
}





// ✅ Function to get a room by ID
export async function getRoomById(roomId) {
    try {
        const response = await api.get(`/rooms/room/${roomId}`);
        return response.status === 200 ? response.data : null;
    } catch (error) {
        console.error("Error fetching room:", error);
        throw new Error("Could not fetch room details.");
    }
}






export async function bookRoom(roomId, booking) {
	try {
		const response = await api.post(
			`/booking/room/${roomId}/booking`, // ✅ FIXED PATH
			booking,
			{ headers: getHeader() }
		);
		return response.data;
	} catch (error) {
		console.error("Booking Error:", error.response?.data || error.message);
		if (error.response && error.response.data) {
			throw new Error(error.response.data);
		} else {
			throw new Error(`Error booking room: ${error.message}`);
		}
	}
}



// ✅ FIXED: Added headers to get all bookings
export async function getAllBookings() {
    try {
        const result = await api.get(`/booking/all-bookings`, {
            headers: getHeader()
        });
        
        const bookings = result.data.map(booking => {
            const checkIn = new Date(...booking.checkInDate);    // e.g., [2025, 4, 5]
            const checkOut = new Date(...booking.checkOutDate);  // e.g., [2025, 4, 6]
        
            return {
                ...booking,
                checkInDateFormatted: checkIn.toLocaleDateString('en-GB'),   // or 'en-US'
                checkOutDateFormatted: checkOut.toLocaleDateString('en-GB')
            };
        });
        
        console.log(bookings);
        return bookings;
        
    } catch (error) {
        console.error("Error fetching bookings:", error.response?.data || error.message);
        throw new Error(`Error fetching bookings: ${error.message}`);
    }
}








export async function getBookingByConfirmationCode(confirmationCode) {
    try {
        console.log("Fetching booking for confirmation code:", confirmationCode);
        const response = await api.get(`/booking/confirmation/${confirmationCode}`, {
            headers: getHeader() // Ensure Authorization token is included
        });

        console.log("Booking Data:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching confirmation:", error.response?.data || error.message);
        throw new Error(error.response?.data || "Error finding booking");
    }
}





export async function cancelBooking(bookingId) {
    try {
        const response = await api.delete(`/booking/${bookingId}/delete`, {
            headers: getHeader()  // ✅ Ensure the Authorization token is included
        });
        return response.data;
    } catch (error) {
        console.error("Error canceling booking:", error.response?.data || error.message);
        throw new Error("Error canceling booking");
    }
}


// ✅ Function to get available rooms
export async function getAvailableRooms(checkInDate, checkOutDate, roomType) {
    const result = await api.get(
        `rooms/available-rooms?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&roomType=${roomType}`
    );
    return result;
}

// ✅ Function to register a user
export async function registerUser(registration) {
    try {
        const response = await api.post("/auth/register-user", registration);
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data);
        } else {
            throw new Error(`User registration error: ${error.message}`);
        }
    }
}

// ✅ Function to login a user
export async function loginUser(login) {
    try {
        const response = await api.post("/auth/login", login);
        if (response.status >= 200 && response.status < 300) {
            return response.data;
        } else {
            return null;
        }
    } catch (error) {
        console.error(error);
        return null;
    }
}

// ✅ Function to get user profile
export async function getUserProfile(userId) {
    try {
        const response = await api.get(`users/profile/${userId}`, {
            headers: getHeader()
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

// ✅ Function to delete a user
export async function deleteUser(userId) {
    try {
        const response = await api.delete(`/users/delete/${userId}`, {
            headers: getHeader()
        });
        return response.data;
    } catch (error) {
        return error.message;
    }
}

// ✅ Function to get a single user
export async function getUser(userId) {
    try {
        const response = await api.get(`/users/${userId}`, {
            headers: getHeader()
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}



// ✅ Corrected function export
export async function getBookingsByUserId(userId, token) {
    try {
        const response = await axios.get(`${API_BASE_URL}/booking/user/${userId}/bookings`, {
            headers: getHeader(token),
        })
        return response.data
    } catch (error) {
        console.error("Error fetching bookings:", error.response?.data || error.message)
        throw new Error("Failed to fetch bookings")
    }
}

