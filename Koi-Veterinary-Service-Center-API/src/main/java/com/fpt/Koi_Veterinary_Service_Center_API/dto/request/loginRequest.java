package com.fpt.Koi_Veterinary_Service_Center_API.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class loginRequest {
    @NotBlank(message = "Empty userid")
    String userID;
    @NotBlank(message = "Empty password")
    String password;
}
