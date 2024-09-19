package com.fpt.Koi_Veterinary_Service_Center_API.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "Schedules")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Schedule {
    @Id
    @Column(name = "scheduleID", length = 30, nullable = false)
    private String scheduleId;

    @ManyToOne
    @JoinColumn(name = "veterinarianID", nullable = false)
    private Veterinarian veterinarian;

    @Column(name = "scheduleDate")
    private LocalDate scheduleDate;

    @Column(name = "startTime")
    private LocalTime startTime;

    @Column(name = "endTime")
    private LocalTime endTime;
}
