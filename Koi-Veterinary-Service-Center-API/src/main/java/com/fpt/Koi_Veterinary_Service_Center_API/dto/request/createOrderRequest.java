package com.fpt.Koi_Veterinary_Service_Center_API.dto.request;

import com.fpt.Koi_Veterinary_Service_Center_API.entity.OrderDetail;
import com.fpt.Koi_Veterinary_Service_Center_API.entity.enums.OrderStatus;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;
@Data
public class createOrderRequest {
    @NotNull(message = "day cannot be empty")
    private LocalDate day;
    @NotNull(message = "slot cannot be empty")
    private int slot;
    @NotBlank(message = "Address cannot be empty")
    private String address;
    @NotNull(message = "Status cannot be empty")
    private OrderStatus status;
    @NotBlank(message = "UserId cannot be empty")
    private String userID;
    @NotNull(message = "VeterinaId cannot be empty")
    private String veterinaID;
    @NotNull(message = "Service cannot be empty")
    private String serviceId;
    @NotNull(message = "Service cannot be empty")
    @Min(value = 1, message = "Quantity must be at least 1")
    private int quantity;
}
