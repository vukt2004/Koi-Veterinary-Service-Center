package com.fpt.Koi_Veterinary_Service_Center_API.dto.request;

import com.fpt.Koi_Veterinary_Service_Center_API.entity.Slot;
import com.fpt.Koi_Veterinary_Service_Center_API.entity.TravelExpense;
import com.fpt.Koi_Veterinary_Service_Center_API.entity.User;
import com.fpt.Koi_Veterinary_Service_Center_API.entity.Veterinarian;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;

@Data
public class orderRequest {
    @NotBlank(message = "orderID cannot be empty")
    private String orderID;
    @NotNull(message = "orderDate cannot be empty")
    private LocalDate orderDate;
    @NotNull(message = "slot cannot be empty")
    private Slot slot;
    @NotBlank(message = "Address cannot be empty")
    private String address;
    @NotBlank(message = "Description cannot be empty")
    private String description;
    @NotBlank(message = "Status cannot be empty")
    private String status;
    @NotNull(message = "TravelExpense cannot be empty")
    private TravelExpense travelExpense;
    @NotNull(message = "Veterinarian cannot be empty")
    private Veterinarian veterinarian;
    @NotNull(message = "User cannot be empty")
    private User user;
}
