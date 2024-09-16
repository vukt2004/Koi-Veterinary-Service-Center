package com.koiproject.KoiVeterinaryServiceCenter.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.koiproject.KoiVeterinaryServiceCenter.entity.InvoiceDetail;

public interface InvoiceDetailRepository extends JpaRepository<InvoiceDetail, Long> {

}
