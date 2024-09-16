package com.koiproject.KoiVeterinaryServiceCenter.dto;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class ScheduleDto {
    private Long scheduleId;
    private String veterinarianId;
    private LocalDate scheduleDate;
    private LocalTime startTime;
    private LocalTime endTime;
}
