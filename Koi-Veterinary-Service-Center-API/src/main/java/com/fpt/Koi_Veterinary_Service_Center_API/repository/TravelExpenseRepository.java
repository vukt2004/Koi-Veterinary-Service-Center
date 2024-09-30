package com.fpt.Koi_Veterinary_Service_Center_API.repository;

import com.fpt.Koi_Veterinary_Service_Center_API.entity.TravelExpense;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TravelExpenseRepository extends JpaRepository<TravelExpense, String> {
}
