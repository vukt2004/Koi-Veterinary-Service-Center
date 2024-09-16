package com.koiproject.KoiVeterinaryServiceCenter.service.user;

import com.koiproject.KoiVeterinaryServiceCenter.dto.UserDto;
import com.koiproject.KoiVeterinaryServiceCenter.entity.Role;
import com.koiproject.KoiVeterinaryServiceCenter.entity.User;
import com.koiproject.KoiVeterinaryServiceCenter.exception.AlreadyExistsException;
import com.koiproject.KoiVeterinaryServiceCenter.exception.ResourceNotFoundException;
import com.koiproject.KoiVeterinaryServiceCenter.repository.RoleRepository;
import com.koiproject.KoiVeterinaryServiceCenter.repository.UserRepository;
import com.koiproject.KoiVeterinaryServiceCenter.request.CreateUserRequest;
import com.koiproject.KoiVeterinaryServiceCenter.request.UserUpdateRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService implements IUserService{

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    @Override
    public User getUserById(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + userId));
    }

    @Override
    public User createUser(CreateUserRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new AlreadyExistsException("Email already exists: " + request.getEmail());
        }
        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());
        user.setPhoneNumber(request.getPhoneNumber());
        Role role = roleRepository.findById(request.getRoleId())
                .orElseThrow(() -> new ResourceNotFoundException("Role not found with ID: " + request.getRoleId()));
        user.setRole(role);
        // Set other fields as necessary
        return userRepository.save(user);
    }

    @Override
    public User updateUser(UserUpdateRequest request, Long userId) {
        return userRepository.findById(userId).map(existingUser -> {
            existingUser.setName(request.getName());
            existingUser.setPhoneNumber(request.getPhoneNumber());
            existingUser.setAddress(request.getAddress());

            return userRepository.save(existingUser);
        }).orElseThrow(() -> new ResourceNotFoundException("User not found!"));
    }

    @Override
    public void deleteUser(Long userId) {
        userRepository.findById(userId).ifPresentOrElse(userRepository::delete, () -> {
            throw new ResourceNotFoundException("User not found!");
        });
    }


}
