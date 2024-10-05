package com.koi.koi.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class loginRequest {
    @NotBlank(message = "userid is empty")
    String userID;
    @NotBlank(message = "password is empty")
    String password;
}
