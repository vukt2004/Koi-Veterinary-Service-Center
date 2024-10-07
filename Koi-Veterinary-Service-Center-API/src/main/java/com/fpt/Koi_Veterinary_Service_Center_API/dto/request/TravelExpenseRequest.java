package com.fpt.Koi_Veterinary_Service_Center_API.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class TravelExpenseRequest {
    @NotBlank(message = "expenseID cannot be empty")
    private String ExpenseID;
    @NotNull(message = "fee cannot be empty")
    private int Fee;
    @NotBlank(message = "Location cannot be empty")
    private String EndLocation;
}
