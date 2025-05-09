package com.HotelBooking.HotelBooking.response;

import java.time.LocalDate;

public class BookingResponse {

    private Long id;
    private LocalDate checkInDate;
    private LocalDate checkOutDate;
    private String guestName;
    private String guestEmail;
    private int numOfAdults;
    private int numOfChildren;
    private int totalNumOfGuest;
    private String bookingConfirmationCode;
    private RoomResponse room;

    // ✅ Full Constructor (For creating objects with all values)
    public BookingResponse(Long id, LocalDate checkInDate, LocalDate checkOutDate,
                           String guestName, String guestEmail, int numOfAdults,
                           int numOfChildren, int totalNumOfGuest,
                           String bookingConfirmationCode, RoomResponse room) {
        this.id = id;
        this.checkInDate = checkInDate;
        this.checkOutDate = checkOutDate;
        this.guestName = guestName;
        this.guestEmail = guestEmail;
        this.numOfAdults = numOfAdults;
        this.numOfChildren = numOfChildren;
        this.totalNumOfGuest = totalNumOfGuest;
        this.bookingConfirmationCode = bookingConfirmationCode;
        this.room = room;
    }

    // ✅ Constructor with only essential fields
    public BookingResponse(Long id, LocalDate checkInDate, LocalDate checkOutDate, String bookingConfirmationCode) {
        this.id = id;
        this.checkInDate = checkInDate;
        this.checkOutDate = checkOutDate;
        this.bookingConfirmationCode = bookingConfirmationCode;
    }

    // ✅ Default (No-Argument) Constructor
    public BookingResponse() {
        // This is required for frameworks like Hibernate and Jackson
    }

    // ✅ Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public LocalDate getCheckInDate() { return checkInDate; }
    public void setCheckInDate(LocalDate checkInDate) { this.checkInDate = checkInDate; }

    public LocalDate getCheckOutDate() { return checkOutDate; }
    public void setCheckOutDate(LocalDate checkOutDate) { this.checkOutDate = checkOutDate; }

    public String getGuestName() { return guestName; }
    public void setGuestName(String guestName) { this.guestName = guestName; }

    public String getGuestEmail() { return guestEmail; }
    public void setGuestEmail(String guestEmail) { this.guestEmail = guestEmail; }

    public int getNumOfAdults() { return numOfAdults; }
    public void setNumOfAdults(int numOfAdults) { this.numOfAdults = numOfAdults; }

    public int getNumOfChildren() { return numOfChildren; }
    public void setNumOfChildren(int numOfChildren) { this.numOfChildren = numOfChildren; }

    public int getTotalNumOfGuest() { return totalNumOfGuest; }
    public void setTotalNumOfGuest(int totalNumOfGuest) { this.totalNumOfGuest = totalNumOfGuest; }

    public String getBookingConfirmationCode() { return bookingConfirmationCode; }
    public void setBookingConfirmationCode(String bookingConfirmationCode) { this.bookingConfirmationCode = bookingConfirmationCode; }

    public RoomResponse getRoom() { return room; }
    public void setRoom(RoomResponse room) { this.room = room; }
}
