package com.koi.koi.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.koi.koi.entity.Order;
import com.koi.koi.entity.Service;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class invoicedetailResponse {
    private Service service;
    private Order order;
    private int quantity;
}
