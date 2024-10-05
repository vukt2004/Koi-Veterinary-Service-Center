package com.koi.koi.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.koi.koi.entity.Invoice;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class feedbackResponse {
    private String feedbackID;
    private String comment;
    private Float rating;
    private LocalDateTime feedbackDateTime;
    private Invoice invoice;
}
