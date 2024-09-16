package com.koiproject.KoiVeterinaryServiceCenter.dto;

import lombok.Data;

import java.sql.Timestamp;

@Data
public class FeedbackDto {
    private Long feedbackId;
    private String invoiceId;
    private String comment;
    private float rating;
    private Timestamp feedbackDateTime;
}
