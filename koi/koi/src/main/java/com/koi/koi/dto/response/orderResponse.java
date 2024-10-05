package com.koi.koi.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.koi.koi.entity.Slot;
import com.koi.koi.entity.TravelExpense;
import com.koi.koi.entity.User;
import com.koi.koi.entity.Veterinarian;
import lombok.Data;

import java.time.LocalDate;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class orderResponse {
    private String orderID;
    private LocalDate orderDate;
    private Slot slot;
    private String address;
    private String description;
    private String status;
    private TravelExpense travelExpense;
    private Veterinarian veterinarian;
    private User user;
}
