package com.koiproject.KoiVeterinaryServiceCenter.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@Entity
@Table(name = "schedules")
public class Schedule {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long scheduleId;

    @ManyToOne
    @JoinColumn(name = "veterinarian_id", nullable = false)
    private Veterinarian veterinarian;

    private LocalDate scheduleDate;
    private LocalTime startTime;
    private LocalTime endTime;

}
