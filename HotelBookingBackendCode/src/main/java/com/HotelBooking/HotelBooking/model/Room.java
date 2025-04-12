package com.HotelBooking.HotelBooking.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.sql.Blob;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "room_type", nullable = false)
    private String roomType;

    @Column(name = "room_price", nullable = false)
    private BigDecimal roomPrice;

    @Column(name = "is_booked", nullable = false)
    private boolean isBooked = false;

    @Lob
    private Blob photo;

    @OneToMany(mappedBy = "room", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<BookedRoom> bookings = new ArrayList<>();

    public Room() {}

    public Room(Long id, String roomType, BigDecimal roomPrice, boolean isBooked, Blob photo, List<BookedRoom> bookings) {
        this.id = id;
        this.roomType = roomType;
        this.roomPrice = roomPrice;
        this.isBooked = isBooked;
        this.photo = photo;
        this.bookings = bookings != null ? bookings : new ArrayList<>();
    }

    public void addBooking(BookedRoom booking) {
        bookings.add(booking);
        booking.setRoom(this);
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getRoomType() { return roomType; }
    public void setRoomType(String roomType) { this.roomType = roomType; }
    public BigDecimal getRoomPrice() { return roomPrice; }
    public void setRoomPrice(BigDecimal roomPrice) { this.roomPrice = roomPrice; }
    public boolean isBooked() { return isBooked; }
    public void setBooked(boolean booked) { isBooked = booked; }
    public Blob getPhoto() { return photo; }
    public void setPhoto(Blob photo) { this.photo = photo; }
    public List<BookedRoom> getBookings() { return bookings; }
    public void setBookings(List<BookedRoom> bookings) { this.bookings = bookings; }
}
