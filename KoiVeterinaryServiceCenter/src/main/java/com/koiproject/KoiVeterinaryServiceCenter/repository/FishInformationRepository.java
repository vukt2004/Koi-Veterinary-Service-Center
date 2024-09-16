package com.koiproject.KoiVeterinaryServiceCenter.repository;

import com.koiproject.KoiVeterinaryServiceCenter.entity.FishInformation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FishInformationRepository extends JpaRepository<FishInformation, Long> {
}
