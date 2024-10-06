package com.koi.koi.repository;

import com.koi.koi.entity.Services;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ServiceRepository extends JpaRepository<Services, String> {

    Optional<Services> findByServiceID(String serviceID);

}
