package com.koi.koi.repository;


import com.koi.koi.entity.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;


public interface InvoiceRepository extends JpaRepository<Invoice, String> {
}
