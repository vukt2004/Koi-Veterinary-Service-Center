package com.koi.koi.dto.request;

import com.koi.koi.entity.Order;
import com.koi.koi.entity.Service;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class invoicedetailRequest {
    @NotBlank(message = "Service cannot be empty")
    private Service service;
    @NotBlank(message = "Order cannot be empty")
    private Order order;
    @NotBlank(message = "Quantity cannot be empty")
    private int quantity;
}
