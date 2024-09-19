package com.fpt.Koi_Veterinary_Service_Center_API.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "Orders")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Order {
    @Id
    private String orderID;
    private LocalDate orderDate;
    private LocalTime startTime;
    private LocalTime endTime;

    @ManyToOne
    @JoinColumn(name = "serviceID", nullable = false)
    private Service service;

    @ManyToOne
    @JoinColumn(name = "veterinarianID", nullable = false)
    private Veterinarian veterinarian;

    @ManyToOne
    private User user;
}
