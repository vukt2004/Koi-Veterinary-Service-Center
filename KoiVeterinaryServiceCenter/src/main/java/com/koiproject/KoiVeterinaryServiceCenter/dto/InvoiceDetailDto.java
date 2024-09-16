package com.koiproject.KoiVeterinaryServiceCenter.dto;

import lombok.Data;

@Data
public class InvoiceDetailDto {
    private Long invoiceId;
    private String orderId;
    private int quantity;
    private OrderDto order;
}
