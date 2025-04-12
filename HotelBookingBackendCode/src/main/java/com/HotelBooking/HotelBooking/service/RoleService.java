package com.HotelBooking.HotelBooking.service;

import com.HotelBooking.HotelBooking.exception.RoleAlreadyExistException;
import com.HotelBooking.HotelBooking.exception.UserAlreadyExistsException;
import com.HotelBooking.HotelBooking.model.Role;
import com.HotelBooking.HotelBooking.model.User;
import com.HotelBooking.HotelBooking.repository.RoleRepository;
import com.HotelBooking.HotelBooking.repository.UserRepository;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RoleService implements IRoleService {
    private final RoleRepository roleRepository;
    private final UserRepository userRepository;

    public RoleService(RoleRepository roleRepository, UserRepository userRepository) {
        this.roleRepository = roleRepository;
        this.userRepository = userRepository;
    }

    @Override
    public List<Role> getRoles() {
        return roleRepository.findAll();
    }

    @Override
    public Role createRole(Role theRole) {
        String roleName = "ROLE_" + theRole.getName().toUpperCase();
        Role role = new Role(roleName);
        if (roleRepository.existsByName(roleName)) {
            throw new RoleAlreadyExistException(theRole.getName() + " role already exists");
        }
        return roleRepository.save(role);
    }

    @Override
    public void deleteRole(Long roleId) {
        this.removeAllUsersFromRole(roleId);
        roleRepository.deleteById(roleId);
    }

    @Override
    public Role findByName(String name) {
        return roleRepository.findByName(name).orElseThrow(() -> new IllegalArgumentException("Role not found"));
    }

    @Override
    public User removeUserFromRole(Long userId, Long roleId) {
        Optional<User> user = userRepository.findById(userId);
        Optional<Role> role = roleRepository.findById(roleId);
        if (user.isPresent() && role.isPresent() && role.get().getUsers().contains(user.get())) {
            role.get().removeUserFromRole(user.get());
            roleRepository.save(role.get());
            return user.get();
        }
        throw new UsernameNotFoundException("User not found");
    }

    @Override
    public User assignRoleToUser(Long userId, Long roleId) {
        Optional<User> user = userRepository.findById(userId);
        Optional<Role> role = roleRepository.findById(roleId);
        if (user.isPresent() && role.isPresent()) {
            if (user.get().getRoles().contains(role.get())) {
                throw new UserAlreadyExistsException(
                        user.get().getFirstName() + " is already assigned to the " + role.get().getName() + " role");
            }
            role.get().assignRoleToUser(user.get());
            roleRepository.save(role.get());
            return user.get();
        }
        throw new IllegalArgumentException("User or Role not found");
    }

    @Override
    public Role removeAllUsersFromRole(Long roleId) {
        Optional<Role> role = roleRepository.findById(roleId);
        if (role.isPresent()) {
            role.get().removeAllUsersFromRole();
            return roleRepository.save(role.get());
        }
        throw new IllegalArgumentException("Role not found");
    }
}
