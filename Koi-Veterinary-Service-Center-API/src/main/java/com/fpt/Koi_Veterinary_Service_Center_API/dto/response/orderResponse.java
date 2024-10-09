package com.fpt.Koi_Veterinary_Service_Center_API.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fpt.Koi_Veterinary_Service_Center_API.entity.enums.OrderStatus;
import lombok.Data;

import java.time.LocalDate;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class orderResponse {
    private String orderId;
    private LocalDate orderDate;
    private int slot;
    private String address;
    private String description;
    private OrderStatus status;
    private String travelExpenseId;
    private String veterinaId;
}
