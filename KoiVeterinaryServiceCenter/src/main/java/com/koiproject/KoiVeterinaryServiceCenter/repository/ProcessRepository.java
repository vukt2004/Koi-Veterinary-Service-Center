package com.koiproject.KoiVeterinaryServiceCenter.repository;

import com.koiproject.KoiVeterinaryServiceCenter.entity.Process;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProcessRepository extends JpaRepository<Process, Long> {
}
