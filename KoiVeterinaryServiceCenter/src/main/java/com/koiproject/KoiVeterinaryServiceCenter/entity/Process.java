package com.koiproject.KoiVeterinaryServiceCenter.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "processes")
public class Process {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long processId;

    @ManyToOne
    @JoinColumn(name = "veterinarian_id", nullable = false)
    private Veterinarian veterinarian;

    private String description;
    private Boolean status;
}
