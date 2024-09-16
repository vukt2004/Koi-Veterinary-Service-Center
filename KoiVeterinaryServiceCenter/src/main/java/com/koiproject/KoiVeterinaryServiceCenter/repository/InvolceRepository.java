package com.koiproject.KoiVeterinaryServiceCenter.repository;

import com.koiproject.KoiVeterinaryServiceCenter.entity.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InvolceRepository extends JpaRepository<Invoice, Long> {
}
