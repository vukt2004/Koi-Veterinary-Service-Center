package com.koi.koi.repository;

import com.koi.koi.entity.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FeedbackRepository extends JpaRepository<Feedback, String> {
    List<Feedback> findAllByInvoice_InvoiceID(String invoiceID);
    List<Feedback> findAllByRating(Float rating);
}
