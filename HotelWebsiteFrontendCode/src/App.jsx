import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min"; // Ensure Bootstrap JS is loaded

import AddRoom from "./room/AddRoom";
import ExistingRooms from "./room/ExistingRooms";
import Home from "./home/Home";
import EditRoom from "./room/EditRoom";
import ViewRoom from "./room/ViewRoom";
import Footer from "./layout/Footer";
import NavBar from "./layout/NavBar";
import RoomListing from "./room/RoomListing";
import Admin from "./admin/Admin";
import CheckOut from "./bookings/CheckOut";
import BookingSuccess from "./bookings/BookingSuccess";
import { Bookings } from "./bookings/Bookings";
import FindBooking from "./bookings/FindBooking";
import Login from "./components/auth/Login";
import Registration from "./components/auth/Registration";
import Profile from "./components/auth/Profile";
import Logout from "./components/auth/Logout";
import AuthProvider from "./components/auth/AuthProvider";
import RequireAuth from "./components/auth/RequireAuth";




function App() {
  return (
    <AuthProvider>
    <main>
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <NavBar />

        <main className="flex-grow-1 container mt-3">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/edit-room/:roomId" element={<EditRoom />} />
            <Route path="/existing-rooms" element={<ExistingRooms />} />
            <Route path="/add-room" element={<AddRoom />} />

            <Route
							path="/book-room/:roomId"
							element={
								<RequireAuth>
									<CheckOut />
								</RequireAuth>
							}
						/>


            <Route path="/book-room/:roomId" element={<CheckOut />} />
            <Route path="/browse-all-rooms" element={<RoomListing />} />
            <Route path="/view-room/:roomId" element={<ViewRoom />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/booking-success" element={<BookingSuccess />} />
            <Route path="/existing-booking" element={<Bookings />} />
            <Route path="/find-booking" element={<FindBooking/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Registration/>} />
            <Route path="/profile" element={<Profile/>} />
            <Route path="/logout" element={<Logout/>} />

            {/* Fallback 404 Page */}
            <Route path="*" element={<h2 className="text-center mt-5">404 - Page Not Found</h2>} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
    </main>
    </AuthProvider>
  );
}

export default App;
