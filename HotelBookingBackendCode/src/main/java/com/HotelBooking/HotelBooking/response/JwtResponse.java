package com.HotelBooking.HotelBooking.response;

import java.util.List;

public class JwtResponse {
    private Long id;
    private String email;
    private String token;
    private String type = "Bearer";
    private List<String> roles;

    // No-argument constructor
    public JwtResponse() {}

    // Parameterized constructor
    public JwtResponse(Long id, String email, String token, List<String> roles) {
        this.id = id;
        this.email = email;
        this.token = token;
        this.roles = roles;
    }

    // Getters
    public Long getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public String getToken() {
        return token;
    }

    public String getType() {
        return type;
    }

    public List<String> getRoles() {
        return roles;
    }

    // Setters
    public void setId(Long id) {
        this.id = id;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public void setRoles(List<String> roles) {
        this.roles = roles;
    }

    // toString() method
    @Override
    public String toString() {
        return "JwtResponse{" +
                "id=" + id +
                ", email='" + email + '\'' +
                ", token='" + token + '\'' +
                ", type='" + type + '\'' +
                ", roles=" + roles +
                '}';
    }
}
