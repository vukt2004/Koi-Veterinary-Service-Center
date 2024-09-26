package com.fpt.Koi_Veterinary_Service_Center_API.repository;

import com.fpt.Koi_Veterinary_Service_Center_API.entity.Fish;
import com.fpt.Koi_Veterinary_Service_Center_API.entity.FishID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FishRepository extends JpaRepository<Fish, FishID> {

}
