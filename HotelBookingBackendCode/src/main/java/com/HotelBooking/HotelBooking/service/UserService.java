package com.HotelBooking.HotelBooking.service;

import com.HotelBooking.HotelBooking.exception.UserAlreadyExistsException;
import com.HotelBooking.HotelBooking.model.Role;
import com.HotelBooking.HotelBooking.model.User;
import com.HotelBooking.HotelBooking.repository.RoleRepository;
import com.HotelBooking.HotelBooking.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class UserService implements IUserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;

    // ✅ Explicit constructor for dependency injection
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.roleRepository = roleRepository;
    }

    @Override
    public User registerUser(User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new UserAlreadyExistsException(user.getEmail() + " already exists");
        }

        // ✅ Encode the password before saving
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        // ✅ Fetch the "ROLE_USER" role
        Optional<Role> userRoleOpt = roleRepository.findByName("ROLE_USER");
        if (userRoleOpt.isPresent()) {
            user.setRoles(Collections.singleton(userRoleOpt.get()));
        } else {
            throw new RuntimeException("Default role 'ROLE_USER' not found in database");
        }

        // ✅ Save user
        return userRepository.save(user);
    }

    @Override
    public List<User> getUsers() {
        return userRepository.findAll();
    }

    @Transactional
    @Override
    public void deleteUser(String email) {
        User theUser = getUser(email);
        if (theUser != null) {
            userRepository.deleteByEmail(email);
        }
    }

    @Override
    public User getUser(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
    }
}
