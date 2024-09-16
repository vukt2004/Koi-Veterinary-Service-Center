package com.koiproject.KoiVeterinaryServiceCenter.dto;

import lombok.Data;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Data
public class OrderDto {
    private Long orderId;
    private String serviceId;
    private String veterinarianId;
    private String userId;
    private LocalDate orderDate;
    private LocalTime startTime;
    private LocalTime endTime;
    private List<InvoiceDetailDto> invoiceDetails;
    private InvoiceDto invoice;
}
