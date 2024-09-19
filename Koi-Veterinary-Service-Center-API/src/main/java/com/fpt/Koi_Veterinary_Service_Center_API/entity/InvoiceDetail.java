package com.fpt.Koi_Veterinary_Service_Center_API.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "InvoiceDetails")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@IdClass(InvoiceDetailsId.class)
public class InvoiceDetail {
    @Id
    @ManyToOne
    @JoinColumn(name = "invoiceID", nullable = false)
    private Invoice invoice;

    @Id
    @ManyToOne
    @JoinColumn(name = "orderID", nullable = false)
    private Order order;

    @Column(name = "quantity")
    private Integer quantity;
}
