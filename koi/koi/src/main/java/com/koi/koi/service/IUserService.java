package com.koi.koi.service;

import com.koi.koi.dto.request.loginRequest;
import com.koi.koi.dto.request.userRequest;
import com.koi.koi.dto.response.loginResponse;
import com.koi.koi.dto.response.userResponse;
import jakarta.validation.Valid;

import java.util.List;

public interface IUserService {
    userResponse register(userRequest userRequest);

    loginResponse login(loginRequest loginRequest);

    userResponse getUserByID(String id);

    List<userResponse> getAllUser();

    List<userResponse> getAllUserByName(String name);

    List<userResponse> getAllUserByRole(String role);

    void deleteUserByID(String id);

    userResponse updateUser(@Valid userRequest userRequest);
}
