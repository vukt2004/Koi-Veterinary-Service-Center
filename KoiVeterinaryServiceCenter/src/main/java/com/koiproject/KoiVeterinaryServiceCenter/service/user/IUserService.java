package com.koiproject.KoiVeterinaryServiceCenter.service.user;

import com.koiproject.KoiVeterinaryServiceCenter.dto.UserDto;
import com.koiproject.KoiVeterinaryServiceCenter.entity.User;
import com.koiproject.KoiVeterinaryServiceCenter.request.CreateUserRequest;
import com.koiproject.KoiVeterinaryServiceCenter.request.UserUpdateRequest;

import java.util.List;

public interface IUserService {

    public User getUserById(Long userId);

    public User createUser(CreateUserRequest request);

    public User updateUser(UserUpdateRequest request, Long userId);

    public void deleteUser(Long userId);

}
