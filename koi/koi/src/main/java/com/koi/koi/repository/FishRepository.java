package com.koi.koi.repository;

import com.koi.koi.entity.Fish;
import com.koi.koi.entity.FishID;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FishRepository extends JpaRepository<Fish, FishID> {
    List<Fish> findAllByUser_UserID(String userID);
    Optional<Fish> findByFishID(String fishID);
}
