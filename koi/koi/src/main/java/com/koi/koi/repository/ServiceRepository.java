package com.koi.koi.repository;

import com.koi.koi.entity.Service;
import jakarta.validation.constraints.NotBlank;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ServiceRepository extends JpaRepository<Service, String> {

    Optional<Service> findByServiceID(String serviceID);

}
