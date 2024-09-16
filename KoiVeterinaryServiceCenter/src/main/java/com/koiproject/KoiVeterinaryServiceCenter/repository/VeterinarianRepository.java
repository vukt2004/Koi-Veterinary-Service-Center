package com.koiproject.KoiVeterinaryServiceCenter.repository;

import com.koiproject.KoiVeterinaryServiceCenter.entity.Veterinarian;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VeterinarianRepository extends JpaRepository<Veterinarian, Long> {
}
