package com.koi.koi.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class serviceRequest {
    @NotBlank(message = "Service ID cannot be empty")
    private String serviceID;

    @NotBlank(message = "Service name cannot be empty")
    private String name;

    @NotBlank(message = "Service type cannot be empty") // Optional validation for type
    private String type;

    @NotNull(message = "Price cannot be null")
    private Float price;
}
