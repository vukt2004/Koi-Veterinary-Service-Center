package com.fpt.Koi_Veterinary_Service_Center_API.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "Process")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Process {
    @Id
    @Column(name = "proccessID", length = 30, nullable = false)
    private String processId;

    @ManyToOne
    @JoinColumn(name = "veterinarianID", nullable = false)
    private Veterinarian veterinarian;

    @Column(name = "Description", length = 100)
    private String description;

    @Column(name = "status")
    private Boolean status;
}
