package com.koiproject.KoiVeterinaryServiceCenter.dto;

import lombok.Data;

@Data
public class ProcessDto {
    private Long processId;
    private String veterinarianId;
    private String description;
    private Boolean status;
}
