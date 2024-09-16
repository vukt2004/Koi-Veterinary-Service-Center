package com.koiproject.KoiVeterinaryServiceCenter.repository;

import com.koiproject.KoiVeterinaryServiceCenter.entity.Services;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ServiceRepository extends JpaRepository<Services, Long> {

}
