package com.koiproject.KoiVeterinaryServiceCenter.dto;

import lombok.Data;

import java.util.List;

@Data
public class VeterinarianDto {
    private Long veterinarianId;
    private float rating;
    private String userId;
    private String status;
    private List<OrderDto> orders;
    private List<ProcessDto> processes;
    private List<ScheduleDto> schedules;
}
