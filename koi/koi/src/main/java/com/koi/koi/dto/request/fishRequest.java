package com.koi.koi.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class fishRequest {
        @NotBlank(message = "Empty fish ID")
        private String fishID;

        @NotNull(message = "Weight cannot be null")
        private Float weight;

        @NotNull(message = "Length cannot be null")
        private Float length;

        @NotNull(message = "Month cannot be null")
        private Integer month;

        @NotBlank(message = "Empty description")
        private String description;

        @NotBlank(message = "Empty user ID")
        private String userID;
}
