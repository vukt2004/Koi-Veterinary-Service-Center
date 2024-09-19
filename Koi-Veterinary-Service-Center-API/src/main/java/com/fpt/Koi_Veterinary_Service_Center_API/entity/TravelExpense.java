package com.fpt.Koi_Veterinary_Service_Center_API.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "TravelExpenses")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TravelExpense {
    @Id
    private String expenseID;
    private Float expenseAmount;
    private String startLocation;
    private String endLocation;
}
