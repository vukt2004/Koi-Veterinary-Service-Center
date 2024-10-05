package com.koi.koi.repository;

import com.koi.koi.entity.InvoiceDetail;
import com.koi.koi.entity.InvoiceDetailsId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InvoiceDetailRepository extends JpaRepository<InvoiceDetail, InvoiceDetailsId> {
}
