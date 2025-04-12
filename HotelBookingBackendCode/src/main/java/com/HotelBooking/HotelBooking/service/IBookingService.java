package com.HotelBooking.HotelBooking.service;

import com.HotelBooking.HotelBooking.model.BookedRoom;

import java.util.List;

public interface IBookingService {
    void cencelBooking(Long bookingId);

    String saveBooking(Long roomId, BookedRoom bookingRequest);

    BookedRoom findByBookingConfirmationCode(String confirmationCode);

    List<BookedRoom> getAllBookings();

  void cancelBooking(Long bookingId);

    List<BookedRoom> getAllBookingByRoomId(Long roomId);

    List<BookedRoom> getBookingsByUserEmail(String email);
}
