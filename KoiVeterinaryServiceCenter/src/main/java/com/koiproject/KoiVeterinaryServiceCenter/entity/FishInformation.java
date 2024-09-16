package com.koiproject.KoiVeterinaryServiceCenter.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "fish_information")
public class FishInformation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long fishId;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private Float weight;
    private Integer age;
    private Float length;
    private String healthRecord;
}
