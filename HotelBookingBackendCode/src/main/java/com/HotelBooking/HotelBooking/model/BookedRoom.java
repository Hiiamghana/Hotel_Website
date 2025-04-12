package com.HotelBooking.HotelBooking.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class BookedRoom {
    @Override
    public String toString() {
        return "BookedRoom{" +
                "bookingId=" + bookingId +
                ", checkInDate=" + checkInDate +
                ", checkOutDate=" + checkOutDate +
                ", guestFullName='" + guestFullName + '\'' +
                ", guestEmail='" + guestEmail + '\'' +
                ", numOfAdults=" + numOfAdults +
                ", numOfChildren=" + numOfChildren +
                ", totalNumOfGuests=" + totalNumOfGuests +
                ", bookingConfirmationCode='" + bookingConfirmationCode + '\'' +
                ", room=" + room +
                '}';
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookingId;

    @Column(name = "check_in_date", nullable = false)
    private LocalDate checkInDate;

    @Column(name = "check_out_date", nullable = false)
    private LocalDate checkOutDate;

    @Column(name = "guest_full_name", nullable = false)
    private String guestFullName;

    @Column(name = "guest_email", nullable = false)
    private String guestEmail;

    @Column(name = "num_of_adults", nullable = false)
    private int numOfAdults;

    @Column(name = "num_of_children", nullable = false)
    private int numOfChildren;

    @Column(name = "total_num_of_guests", nullable = false)
    private int totalNumOfGuests;

    @Column(name = "booking_confirmation_code", unique = true, nullable = false)
    private String bookingConfirmationCode;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id", nullable = false)
    private Room room;

    public BookedRoom() {}

    public BookedRoom(Long bookingId, LocalDate checkInDate, LocalDate checkOutDate, String guestFullName, String guestEmail, int numOfAdults, int numOfChildren, int totalNumOfGuests, String bookingConfirmationCode, Room room) {
        this.bookingId = bookingId;
        this.checkInDate = checkInDate;
        this.checkOutDate = checkOutDate;
        this.guestFullName = guestFullName;
        this.guestEmail = guestEmail;
        this.numOfAdults = numOfAdults;
        this.numOfChildren = numOfChildren;
        this.totalNumOfGuests = totalNumOfGuests;
        this.bookingConfirmationCode = bookingConfirmationCode;
        this.room = room;
    }

    public Long getBookingId() { return bookingId; }
    public void setBookingId(Long bookingId) { this.bookingId = bookingId; }

    public LocalDate getCheckInDate() { return checkInDate; }
    public void setCheckInDate(LocalDate checkInDate) { this.checkInDate = checkInDate; }

    public LocalDate getCheckOutDate() { return checkOutDate; }
    public void setCheckOutDate(LocalDate checkOutDate) { this.checkOutDate = checkOutDate; }

    public String getGuestFullName() { return guestFullName; }
    public void setGuestFullName(String guestFullName) { this.guestFullName = guestFullName; }

    public String getGuestEmail() { return guestEmail; }
    public void setGuestEmail(String guestEmail) { this.guestEmail = guestEmail; }

    public int getNumOfAdults() { return numOfAdults; }
    public void setNumOfAdults(int numOfAdults) {
        this.numOfAdults = numOfAdults;
        calculateTotalNumberOfGuests();
    }

    public int getNumOfChildren() { return numOfChildren; }
    public void setNumOfChildren(int numOfChildren) {
        this.numOfChildren = numOfChildren;
        calculateTotalNumberOfGuests();
    }

    public int getTotalNumOfGuests() { return totalNumOfGuests; }
    public void setTotalNumOfGuests(int totalNumOfGuests) { this.totalNumOfGuests = totalNumOfGuests; }

    public String getBookingConfirmationCode() { return bookingConfirmationCode; }
    public void setBookingConfirmationCode(String bookingConfirmationCode) { this.bookingConfirmationCode = bookingConfirmationCode; }

    public Room getRoom() { return room; }
    public void setRoom(Room room) { this.room = room; }

    private void calculateTotalNumberOfGuests() {
        this.totalNumOfGuests = this.numOfAdults + this.numOfChildren;
    }

}
