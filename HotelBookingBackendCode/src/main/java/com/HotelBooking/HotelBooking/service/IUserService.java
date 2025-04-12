package com.HotelBooking.HotelBooking.service;

import com.HotelBooking.HotelBooking.model.User;

import java.util.List;

public interface IUserService {
    User registerUser(User user);
    List<User> getUsers();
    void deleteUser(String email);
    User getUser(String email);
}
