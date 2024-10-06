package com.koi.koi.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.koi.koi.entity.Order;
import com.koi.koi.entity.Services;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class invoicedetailResponse {
    private Services service;
    private Order order;
    private int quantity;
}
