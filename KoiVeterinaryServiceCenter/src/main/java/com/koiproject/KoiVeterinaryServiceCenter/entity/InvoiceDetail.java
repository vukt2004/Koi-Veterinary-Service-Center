package com.koiproject.KoiVeterinaryServiceCenter.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "invoice_details")
public class InvoiceDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long invoiceDetailId;

    @ManyToOne
    @JoinColumn(name = "invoice_id", nullable = false)
    private Invoice invoice;

    @ManyToOne
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;

    @ManyToOne
    @JoinColumn(name = "service_id", nullable = false)
    private Services service;

    private int quantity;
}
