package com.koi.koi.dto.request;

import com.koi.koi.entity.Invoice;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class feedbackRequest {
    @NotBlank(message = "Service ID cannot be empty")
    private String feedbackID;
    @NotBlank(message = "Comment cannot be empty")
    private String comment;
    @NotNull(message = "Empty rating")
    private Float rating;
    @NotBlank(message = "FeedbackDateTime cannot be empty")
    private LocalDateTime feedbackDateTime;
    @NotNull(message = "InvoiceID cannot be empty")
    private String invoiceID;
}
