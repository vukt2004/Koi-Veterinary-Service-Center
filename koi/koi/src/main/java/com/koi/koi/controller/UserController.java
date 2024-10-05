package com.koi.koi.controller;

import com.koi.koi.dto.request.loginRequest;
import com.koi.koi.dto.request.userRequest;
import com.koi.koi.dto.response.loginResponse;
import com.koi.koi.dto.response.userResponse;
import com.koi.koi.service.IUserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserController {
    @Autowired
    private IUserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody userRequest userRequest) {
        userResponse response = userService.register(userRequest);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody loginRequest loginRequest) {
        loginResponse response = userService.login(loginRequest);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/User/Id/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> getUserById(@PathVariable("id") String id) {
        userResponse user = userService.getUserByID(id);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @GetMapping("/User")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> getAllUser() {
        List<userResponse> users = userService.getAllUser();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @GetMapping("/User/name/{name}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> getAllUserByName(@PathVariable("name") String name) {
        List<userResponse> users = userService.getAllUserByName(name);
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @GetMapping("/User/role/{role}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> getAllUserByRole(@PathVariable("role") String role) {
        List<userResponse> users = userService.getAllUserByRole(role);
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @DeleteMapping("/User/delete/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> deleteUserById(@PathVariable("id") String id) {
        userService.deleteUserByID(id);
        return new ResponseEntity<>("Deleted", HttpStatus.OK);
    }

    @PutMapping("/User/update")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> updateUser(@Valid @RequestBody userRequest userRequest) {
        userResponse response = userService.updateUser(userRequest);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
}
