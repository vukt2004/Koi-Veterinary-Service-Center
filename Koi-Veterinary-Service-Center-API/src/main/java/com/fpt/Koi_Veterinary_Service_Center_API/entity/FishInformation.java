package com.fpt.Koi_Veterinary_Service_Center_API.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "FishInformations")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@IdClass(FishInformationId.class)
public class FishInformation {
    @Id
    @Column(name = "fishID", length = 30, nullable = false)
    private String fishId;

    @Id
    @ManyToOne
    @JoinColumn(name = "userID", nullable = false)
    private User user;

    @Column(name = "weight")
    private Float weight;

    @Column(name = "age")
    private Integer age;

    @Column(name = "length")
    private Float length;

    @Column(name = "healthRecord")
    private String healthRecord;
}
