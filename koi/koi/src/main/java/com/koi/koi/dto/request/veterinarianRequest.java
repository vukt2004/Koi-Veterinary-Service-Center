package com.koi.koi.dto.request;

import com.koi.koi.entity.User;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class veterinarianRequest {
    @NotBlank(message = "Empty veterinarianID")
    private String veterinarianID;
    @NotNull(message = "Empty rating")
    private Float rating;
    @NotBlank(message = "Empty status")
    private String status;
    @NotNull(message = "Empty user")
    private User user;
}
