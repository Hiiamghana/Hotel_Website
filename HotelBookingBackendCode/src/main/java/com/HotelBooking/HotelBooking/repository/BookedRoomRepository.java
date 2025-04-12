package com.HotelBooking.HotelBooking.repository;

import com.HotelBooking.HotelBooking.model.BookedRoom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookedRoomRepository extends JpaRepository<BookedRoom,Long > {
    List<BookedRoom> findByRoomId(Long roomId);

}
