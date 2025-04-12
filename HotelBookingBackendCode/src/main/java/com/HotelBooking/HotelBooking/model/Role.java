package com.HotelBooking.HotelBooking.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;

@Entity
@Table(name = "roles")
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    @JsonIgnore
    @ManyToMany(mappedBy = "roles", fetch = FetchType.LAZY)
    private Collection<User> users = new HashSet<>();

    // ✅ Default constructor (Required by JPA)
    public Role() {
    }

    // ✅ Constructor with name
    public Role(String name) {
        this.name = name;
    }

    // ✅ Constructor with ID and name
    public Role(Long id, String name) {
        this.id = id;
        this.name = name;
    }

    // ✅ Getters
    public Long getId() {
        return id;
    }

    public String getName() {
        return name != null ? name : "";
    }

    public Collection<User> getUsers() {
        return users;
    }

    // ✅ Setters
    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setUsers(Collection<User> users) {
        this.users = users;
    }

    // ✅ Assign Role to User (Fixed)
    public void assignRoleToUser(User user) {
        if (user == null) {
            throw new IllegalArgumentException("User cannot be null");
        }
        if (user.getRoles() == null) {
            user.setRoles(new HashSet<>());  // Initialize roles if null
        }
        if (this.users == null) {
            this.users = new HashSet<>();  // Initialize users if null
        }
       user.getRoles().add(this);
        this.getUsers().add(user);
    }

    // ✅ Remove a User from Role
    public void removeUserFromRole(User user) {
        if (user != null && this.users != null) {
            user.getRoles().remove(this);
            this.users.remove(user);
        }
    }

    // ✅ Remove All Users from Role (Fixed)
    public void removeAllUsersFromRole() {
        if (this.users != null) {
            List<User> roleUsers = new ArrayList<>(this.users);  // Prevent ConcurrentModificationException
            roleUsers.forEach(this::removeUserFromRole);
        }
    }

}
