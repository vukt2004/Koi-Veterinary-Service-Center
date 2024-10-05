package com.koi.koi.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class userRequest {
    @NotBlank(message = "Empty userid")
    private String userID;
    @NotBlank(message = "Empty password")
    private String password;
    @NotBlank(message = "Empty name")
    private String name;
    @NotBlank(message = "Empty email")
    @Email(message = "Wrong email format")
    private String email;
    @NotBlank(message = "Empty phone number")
    private String phoneNumber;
    @NotNull(message = "Empty role")
    private String role;
    @NotBlank(message = "Empty address")
    private String address;
}
