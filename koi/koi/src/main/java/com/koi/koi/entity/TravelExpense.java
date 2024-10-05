package com.koi.koi.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name = "TravelExpenses")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TravelExpense {
    @Id
    @GenericGenerator( name = "exID", type = IdGenerator.class, parameters = {
            @org.hibernate.annotations.Parameter( name = IdGenerator.VALUE_PREFIX_PARAMETER, value = "E" ),
            @org.hibernate.annotations.Parameter( name = IdGenerator.NUMBER_FORMAT_PARAMETER, value = "%01d" ) } )
    @GeneratedValue( strategy = GenerationType.SEQUENCE, generator = "exID" )
    private String expenseID;
    @Column(nullable = false)
    private int Fee;
    @Column(nullable = false)
    private String endLocation;
}
