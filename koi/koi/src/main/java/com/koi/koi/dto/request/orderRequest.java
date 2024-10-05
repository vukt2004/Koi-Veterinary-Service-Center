package com.koi.koi.dto.request;

import com.koi.koi.entity.Slot;
import com.koi.koi.entity.TravelExpense;
import com.koi.koi.entity.User;
import com.koi.koi.entity.Veterinarian;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.time.LocalDate;

@Data
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
    @NotBlank(message = "User cannot be empty")
    private User user;
}
