package com.fpt.Koi_Veterinary_Service_Center_API.dto.request;

import com.fpt.Koi_Veterinary_Service_Center_API.entity.Slot;
import com.fpt.Koi_Veterinary_Service_Center_API.entity.TravelExpense;
import com.fpt.Koi_Veterinary_Service_Center_API.entity.User;
import com.fpt.Koi_Veterinary_Service_Center_API.entity.Veterinarian;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public class orderRequest {
    @NotBlank(message = "orderID cannot be empty")
    private String orderID;
    @NotBlank(message = "orderDate cannot be empty")
    private LocalDate orderDate;
    @NotBlank(message = "slot cannot be empty")
    private Slot slot;
    @NotBlank(message = "Address cannot be empty")
    private String address;
    @NotBlank(message = "Description cannot be empty")
    private String description;
    @NotBlank(message = "Status cannot be empty")
    private String status;
    @NotBlank(message = "TravelExpense cannot be empty")
    private TravelExpense travelExpense;
    @NotBlank(message = "Veterinarian cannot be empty")
    private Veterinarian veterinarian;
    @NotNull(message = "User cannot be empty")
    private User user;
}
