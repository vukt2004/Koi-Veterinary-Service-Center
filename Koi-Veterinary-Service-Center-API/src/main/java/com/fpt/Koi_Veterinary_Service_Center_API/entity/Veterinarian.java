package com.fpt.Koi_Veterinary_Service_Center_API.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "Veterinarians")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Veterinarian {
    @Id
    private String veterinarianID;
    private Float rating;
    private String status;

    @ManyToOne
    private User user;
}
