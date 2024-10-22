package com.fpt.Koi_Veterinary_Service_Center_API.repository;

import com.fpt.Koi_Veterinary_Service_Center_API.entity.Feedback;
import com.fpt.Koi_Veterinary_Service_Center_API.entity.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FeedbackRepository extends JpaRepository<Feedback, String> {
    Optional<Feedback> findByInvoice(Invoice invoice);
}
