package com.HotelBooking.HotelBooking.controller;

import com.HotelBooking.HotelBooking.exception.InvalidBookingRequestException;
import com.HotelBooking.HotelBooking.exception.ResourceNotFoundException;
import com.HotelBooking.HotelBooking.model.BookedRoom;
import com.HotelBooking.HotelBooking.model.Room;
import com.HotelBooking.HotelBooking.response.BookingResponse;
import com.HotelBooking.HotelBooking.response.RoomResponse;
import com.HotelBooking.HotelBooking.service.IBookingService;
import com.HotelBooking.HotelBooking.service.IRoomService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/booking")
public class BookingController {

    private final IBookingService bookingService;
    private final IRoomService roomService;

    public BookingController(IBookingService bookingService, IRoomService roomService) {
        this.bookingService = bookingService;
        this.roomService = roomService;
    }

    @GetMapping("/all-bookings")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<List<BookingResponse>> getAllBookings() {
        List<BookingResponse> bookingResponses = bookingService.getAllBookings().stream()
                .map(this::getBookingResponse)
                .collect(Collectors.toList());
        return ResponseEntity.ok(bookingResponses);
    }

    @GetMapping("/confirmation/{confirmationCode}")
    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> getBookingByConfirmationCode(@PathVariable String confirmationCode) {
        try {
            return ResponseEntity.ok(getBookingResponse(bookingService.findByBookingConfirmationCode(confirmationCode)));
        } catch (ResourceNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        }
    }

    @PostMapping("/room/{roomId}/booking")
    public ResponseEntity<String> saveBooking(@PathVariable Long roomId, @RequestBody BookedRoom bookingRequest) {
        try {
            String confirmationCode = bookingService.saveBooking(roomId, bookingRequest);
            return ResponseEntity.ok("Room booked successfully, Your booking confirmation code is: " + confirmationCode);
        } catch (InvalidBookingRequestException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{bookingId}/delete")
    public ResponseEntity<String> cancelBooking(@PathVariable Long bookingId){
        bookingService.cancelBooking(bookingId);
        return ResponseEntity.ok("Booking deleted successfully");
        }


    @GetMapping("/user/{email}/bookings")
    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
    public ResponseEntity<List<BookingResponse>> getBookingsByUserEmail(@PathVariable String email) {
        List<BookedRoom> bookings = bookingService.getBookingsByUserEmail(email);
        List<BookingResponse> bookingResponses = new ArrayList<>();
        for (BookedRoom booking : bookings) {
            BookingResponse bookingResponse = getBookingResponse(booking);
            bookingResponses.add(bookingResponse);
        }
        return ResponseEntity.ok(bookingResponses);
    }


    private BookingResponse getBookingResponse(BookedRoom booking) {
        Room room = roomService.getRoomById(booking.getRoom().getId()).orElseThrow();
        return new BookingResponse(booking.getBookingId(), booking.getCheckInDate(), booking.getCheckOutDate(), booking.getGuestFullName(), booking.getGuestEmail(), booking.getNumOfAdults(), booking.getNumOfChildren(), booking.getTotalNumOfGuests(), booking.getBookingConfirmationCode(), new RoomResponse(room.getId(), room.getRoomType(), room.getRoomPrice()));
    }
}


