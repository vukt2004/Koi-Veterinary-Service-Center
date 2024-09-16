package com.koiproject.KoiVeterinaryServiceCenter.dto;

import lombok.Data;

import java.util.List;

@Data
public class ServiceDto {
    private Long serviceId;
    private String name;
    private String type;
    private float price;
    private List<OrderDto> orders;
    private List<InvoiceDetailDto> invoiceDetails;
}
