package com.HotelBooking.HotelBooking.controller;

import com.HotelBooking.HotelBooking.exception.PhotoRetrivalException;
import com.HotelBooking.HotelBooking.exception.ResourceNotFoundException;
import com.HotelBooking.HotelBooking.model.BookedRoom;
import com.HotelBooking.HotelBooking.model.Room;
import com.HotelBooking.HotelBooking.response.BookingResponse;
import com.HotelBooking.HotelBooking.response.RoomResponse;
import com.HotelBooking.HotelBooking.service.BookingService;
import com.HotelBooking.HotelBooking.service.IRoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.sql.rowset.serial.SerialBlob;
import java.io.IOException;
import java.math.BigDecimal;
import java.sql.Blob;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Optional;


@RestController

@CrossOrigin("*")
@RequestMapping("/rooms")
public class RoomController {


    @Autowired
    private  IRoomService roomService;
    @Autowired
    private BookingService bookingService;


    @PostMapping("/add/new-room")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<RoomResponse> addNewRoom(
           @RequestParam("photo") MultipartFile photo,
           @RequestParam("roomType") String roomType ,
           @RequestParam("roomPrice") BigDecimal roomPrice) throws SQLException, IOException {

        Room savedRoom = roomService.addNewRoom(photo ,roomType,roomPrice);
        RoomResponse response= new RoomResponse(savedRoom.getId(), savedRoom.getRoomType(),
                savedRoom.getRoomPrice());
        return ResponseEntity.ok(response);

    }

    @GetMapping("/room/types")
    public List<String> getRoomTypes(){
        return roomService.getAllRoomTypes();
    }


    @GetMapping("/all-rooms")
    public ResponseEntity<List<RoomResponse>> getAllRoom() throws SQLException {
        System.out.println("enter into all rooms\n\n");
        List<Room> rooms = roomService.getAllRooms();
        List<RoomResponse> roomResponses = new ArrayList<>();

        for (Room room : rooms) {
//            room.toString();
            byte[] photoByte = roomService.getRoomPhotoByRoomId(room.getId());

            if (photoByte != null && photoByte.length > 0) {
                String base64Photo = Base64.getEncoder().encodeToString(photoByte);
                RoomResponse roomResponse = getRoomResponse(room);
                roomResponse.setPhoto(base64Photo);
                System.out.println();
                roomResponses.add(roomResponse);
            }
        }

        return ResponseEntity.ok(roomResponses);
    }


    @DeleteMapping("/delete/room/{roomId}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<String>deleteRoom(@PathVariable Long roomId){
        roomService.deleteRoom(roomId);
        return ResponseEntity.ok("Success");
    }

    @PutMapping("/update/{roomId}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<RoomResponse> updateRoom(
            @PathVariable Long roomId,
            @RequestParam(required = false) String roomType,
            @RequestParam(required = false) BigDecimal roomPrice,
            @RequestParam(required = false) MultipartFile photo
    ) throws IOException, SQLException {
        byte[] photoBytes = (photo != null && !photo.isEmpty())
                ? photo.getBytes()
                : roomService.getRoomPhotoByRoomId(roomId); // ✅ Keep old image if null

        Blob photoBlob = (photoBytes != null && photoBytes.length > 0)
                ? new SerialBlob(photoBytes)
                : null;

        Room updatedRoom = roomService.updateRoom(roomId, roomType, roomPrice, photoBytes);
        updatedRoom.setPhoto(photoBlob);

        RoomResponse roomResponse = getRoomResponse(updatedRoom);
        return ResponseEntity.ok(roomResponse);
    }


@GetMapping("/room/{roomId}")
    public ResponseEntity<Optional<RoomResponse>>getRoomById(@PathVariable Long roomId){
        Optional<Room>theRoom= roomService.getRoomById(roomId);
        return theRoom.map(room ->{
            RoomResponse roomResponse= getRoomResponse(room);
            return ResponseEntity.ok(Optional.of(roomResponse));
        } ).orElseThrow(() -> new ResourceNotFoundException("Room not found"));

    }

    @GetMapping("/available-rooms")
    public ResponseEntity<List<RoomResponse>> getAvailableRooms(
            @RequestParam("checkInDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkInDate,
            @RequestParam("checkOutDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)LocalDate checkOutDate,
            @RequestParam("roomType") String roomType) throws SQLException {
        List<Room> availableRooms = roomService.getAvailableRooms(checkInDate, checkOutDate, roomType);
        List<RoomResponse> roomResponses = new ArrayList<>();
        for (Room room : availableRooms){
            byte[] photoBytes = roomService.getRoomPhotoByRoomId(room.getId());
            if (photoBytes != null && photoBytes.length > 0){
                String photoBase64 = Base64.getEncoder().encodeToString(photoBytes);
                RoomResponse roomResponse = getRoomResponse(room);
                roomResponse.setPhoto(photoBase64);
                roomResponses.add(roomResponse);
            }
        }
        if(roomResponses.isEmpty()){
            return ResponseEntity.noContent().build();
        }else{
            return ResponseEntity.ok(roomResponses);
        }
    }



    private RoomResponse getRoomResponse(Room room) {
        List<BookedRoom> bookings = getAllBookingRoomId(room.getId());

        List<BookingResponse> bookingInfo = bookings.stream().map(booking -> new BookingResponse(
                        booking.getBookingId(),
                        booking.getCheckInDate(),
                        booking.getCheckOutDate(),
                        booking.getBookingConfirmationCode()
                ))
                .toList();

        byte[] photoBytes = null;
        Blob photoBlob= room.getPhoto();
        if (photoBlob != null){
            try{
                photoBytes = photoBlob.getBytes(1 ,(int) photoBlob.length());

            }catch (SQLException e){
                throw new PhotoRetrivalException("Error to retrive photo");

            }
        }
        return new RoomResponse(room.getId(),
                room.getRoomType(),
                room.getRoomPrice(),
                room.isBooked(), photoBytes ,bookingInfo );



    }


    private List<BookedRoom> getAllBookingRoomId(Long roomId) {
        return bookingService.getAllBookingByRoomId(roomId);
    }

    private void getRoomPhotoByRoomId(Long id) {
    }
}
