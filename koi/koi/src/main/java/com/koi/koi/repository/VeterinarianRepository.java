package com.koi.koi.repository;

import com.koi.koi.entity.Veterinarian;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface VeterinarianRepository extends JpaRepository<Veterinarian, String> {
    Optional<Veterinarian> findByVeterinarianID(String veterinarianID);

    List<Veterinarian> findAllByName(String name);
}
