package com.fpt.Koi_Veterinary_Service_Center_API.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class roleRequest {
    @NotBlank(message = "roleID is empty")
    private String roleID;
    @NotBlank(message = "title is empty")
    private String title;
}
