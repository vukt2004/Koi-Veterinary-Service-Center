package com.koi.koi.dto.request;

import com.koi.koi.entity.Order;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;

@Data
public class invoiceRequest {
    @NotEmpty(message = "Invoice ID cannot be empty")
    private String invoiceID;

    @NotNull(message = "Total cannot be null")
    private Integer total; // Thay đổi kiểu thành Integer để có thể kiểm tra null

    @NotNull(message = "Date cannot be null")
    private LocalDate date; // Đổi tên trường thành 'date' (viết thường) để tuân thủ quy tắc đặt tên

    @NotNull(message = "Order cannot be null")
    private Order order;
}
