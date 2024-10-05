package com.koi.koi.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.koi.koi.entity.Order;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.time.LocalDate;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class invoiceResponse {
    private String invoiceID;
    private int total;
    private LocalDate Date;
    private Order order;
}
