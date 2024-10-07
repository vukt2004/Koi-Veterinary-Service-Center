package com.fpt.Koi_Veterinary_Service_Center_API.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.time.LocalTime;

@Data
public class slotRequest {
    @NotBlank(message = "Slot is empty")
    private int slot;
    private LocalTime startTime;
    private LocalTime endTime;
}
