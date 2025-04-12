package com.HotelBooking.HotelBooking.service;

import com.HotelBooking.HotelBooking.exception.InvalidBookingRequestException;
import com.HotelBooking.HotelBooking.exception.ResourceNotFoundException;
import com.HotelBooking.HotelBooking.model.BookedRoom;
import com.HotelBooking.HotelBooking.model.Room;
import com.HotelBooking.HotelBooking.repository.BookedRoomRepository;
import com.HotelBooking.HotelBooking.repository.BookingRepository;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookingService implements IBookingService {

    private final BookingRepository bookingRepository;
    private final IRoomService roomService;
    private final BookedRoomRepository bookedRoomRepository;

    @Autowired
    public BookingService(BookingRepository bookingRepository, IRoomService roomService, BookedRoomRepository bookedRoomRepository) {
        this.bookingRepository = bookingRepository;
        this.roomService = roomService;
        this.bookedRoomRepository = bookedRoomRepository;
    }

    @Override
    public List<BookedRoom> getAllBookings() {
        return bookingRepository.findAll();
    }

    @Override
    public void cancelBooking(Long bookingId) {
        bookingRepository.deleteById(bookingId);



    }

    public List<BookedRoom> getAllBookingByRoomId(Long roomId) {
        return bookedRoomRepository.findByRoomId(roomId);
    }

    @Override
    public List<BookedRoom> getBookingsByUserEmail(String email) {
        return bookingRepository.findByGuestEmail(email);
    }

    @Override
    public void cencelBooking(Long bookingId) {
        bookingRepository.deleteById(bookingId);
    }

    @Override
    public String saveBooking(Long roomId, BookedRoom bookingRequest) {
        System.out.println("hiii"+bookingRequest.toString());
        if (bookingRequest.getCheckOutDate().isBefore(bookingRequest.getCheckInDate())) {
            throw new InvalidBookingRequestException("Check-in date must come before check-out date.");
        }

        Room room = roomService.getRoomById(roomId).orElseThrow(() ->
                new InvalidBookingRequestException("Room not found.")
        );

        List<BookedRoom> existingBookings = room.getBookings();
        if (!roomIsAvailable(bookingRequest, existingBookings)) {
            throw new InvalidBookingRequestException("Sorry! This room is not available for the selected dates.");
        }

        // Generate confirmation code before adding booking
        String bookingCode = RandomStringUtils.randomNumeric(10);
        bookingRequest.setBookingConfirmationCode(bookingCode);

        // Link booking to the room
        room.addBooking(bookingRequest);

        // Save booking
        bookedRoomRepository.save(bookingRequest);

        return bookingCode;
    }

    @Override
    public BookedRoom findByBookingConfirmationCode(String confirmationCode) {
        return bookingRepository.findByBookingConfirmationCode(confirmationCode)
                .orElseThrow(()-> new ResourceNotFoundException("No booking found with booking code :"+confirmationCode));
    }

    private boolean roomIsAvailable(BookedRoom bookingRequest, List<BookedRoom> existingBookings) {
        return existingBookings.stream().noneMatch(existingBooking ->
                (bookingRequest.getCheckInDate().isBefore(existingBooking.getCheckOutDate()) &&
                        bookingRequest.getCheckOutDate().isAfter(existingBooking.getCheckInDate())) ||
                        bookingRequest.getCheckInDate().equals(existingBooking.getCheckInDate()) ||
                        bookingRequest.getCheckOutDate().equals(existingBooking.getCheckOutDate()) ||
                        bookingRequest.getCheckInDate().equals(existingBooking.getCheckOutDate()) ||
                        bookingRequest.getCheckOutDate().equals(existingBooking.getCheckInDate())
        );
    }
}




