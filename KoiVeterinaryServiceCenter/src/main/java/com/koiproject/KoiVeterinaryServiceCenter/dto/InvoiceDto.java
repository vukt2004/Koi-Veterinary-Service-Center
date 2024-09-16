package com.koiproject.KoiVeterinaryServiceCenter.dto;

import lombok.Data;

import java.sql.Timestamp;
import java.util.List;

@Data
public class InvoiceDto {
    private Long invoiceId;
    private String userId;
    private String veterinarianId;
    private float total;
    private Timestamp invoiceDate;
    private List<FeedbackDto> feedbacks;
    private List<InvoiceDetailDto> invoiceDetails;
}
