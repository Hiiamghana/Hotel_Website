package com.HotelBooking.HotelBooking.controller;

import com.HotelBooking.HotelBooking.exception.RoleAlreadyExistException;
import com.HotelBooking.HotelBooking.model.Role;
import com.HotelBooking.HotelBooking.model.User;
import com.HotelBooking.HotelBooking.service.IRoleService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/roles")
public class RoleController {
    private final IRoleService roleService;

    public RoleController(IRoleService roleService) {
        this.roleService = roleService;
    }

    @GetMapping("/all-roles")
    public ResponseEntity<List<Role>> getAllRoles() {
        return new ResponseEntity<>(roleService.getRoles(), HttpStatus.OK);
    }

    @PostMapping("/create-new-role")
    public ResponseEntity<String> createRole(@RequestBody Role theRole) {
        try {
            roleService.createRole(theRole);
            return ResponseEntity.ok("New role created successfully!");
        } catch (RoleAlreadyExistException re) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(re.getMessage());
        }
    }

    @DeleteMapping("/delete/{roleId}")
    public ResponseEntity<String> deleteRole(@PathVariable("roleId") Long roleId) {
        roleService.deleteRole(roleId);
        return ResponseEntity.ok("Role deleted successfully!");
    }

    @PostMapping("/remove-all-users-from-role/{roleId}")
    public ResponseEntity<Role> removeAllUsersFromRole(@PathVariable("roleId") Long roleId) {
        return ResponseEntity.ok(roleService.removeAllUsersFromRole(roleId));
    }

    @PostMapping("/remove-user-from-role")
    public ResponseEntity<User> removeUserFromRole(
            @RequestParam("userId") Long userId,
            @RequestParam("roleId") Long roleId) {
        return ResponseEntity.ok(roleService.removeUserFromRole(userId, roleId));
    }

    @PostMapping("/assign-user-to-role")
    public ResponseEntity<User> assignUserToRole(
            @RequestParam("userId") Long userId,
            @RequestParam("roleId") Long roleId) {
        return ResponseEntity.ok(roleService.assignRoleToUser(userId, roleId));
    }
}
