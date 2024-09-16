package com.koiproject.KoiVeterinaryServiceCenter.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name = "veterinarians")
public class Veterinarian {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long veterinarianId;

    private Float rating;
    private String status;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @OneToMany(mappedBy = "veterinarian", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Order> orders;

    @OneToMany(mappedBy = "veterinarian", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Process> processes;

    @OneToMany(mappedBy = "veterinarian", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Schedule> schedules;
}
