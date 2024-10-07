package com.fpt.Koi_Veterinary_Service_Center_API.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class createServiceRequest {
    @NotBlank(message = "Service name cannot be empty")
    private String Name;

    @NotBlank(message = "Service type cannot be empty") // Optional validation for type
    private String Type;

    @NotNull(message = "Price cannot be null")
    private Float price;
}
