package com.koi.koi.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import java.time.LocalDate;

@Entity
@Table(name = "Orders")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Order {
    @Id
    @GenericGenerator( name = "orderID", type = IdGenerator.class, parameters = {
            @org.hibernate.annotations.Parameter( name = IdGenerator.VALUE_PREFIX_PARAMETER, value = "O" ),
            @org.hibernate.annotations.Parameter( name = IdGenerator.NUMBER_FORMAT_PARAMETER, value = "%01d" ) } )
    @GeneratedValue( strategy = GenerationType.SEQUENCE, generator = "orderID" )
    private String orderID;
    private LocalDate orderDate;
    @ManyToOne
    @JoinColumn(name = "slotID", nullable = false)
    private Slot slot;
    @Column(nullable = false)
    private String address;
    private String description;
    private String status;
    @ManyToOne
    @JoinColumn(name = "expenseID", nullable = false)
    private TravelExpense travelExpense;
    @ManyToOne
    @JoinColumn(name = "veterinarianID", nullable = false)
    private Veterinarian veterinarian;
    @ManyToOne
    @JoinColumn(name = "UserID", nullable = false)
    private User user;
}
