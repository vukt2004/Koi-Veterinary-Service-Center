package com.fpt.Koi_Veterinary_Service_Center_API.service.impl;

import com.fpt.Koi_Veterinary_Service_Center_API.dto.request.feedbackRequest;
import com.fpt.Koi_Veterinary_Service_Center_API.dto.response.feedbackResponse;
import com.fpt.Koi_Veterinary_Service_Center_API.entity.Feedback;
import com.fpt.Koi_Veterinary_Service_Center_API.entity.Invoice;
import com.fpt.Koi_Veterinary_Service_Center_API.exception.AppException;
import com.fpt.Koi_Veterinary_Service_Center_API.repository.FeedbackRepository;
import com.fpt.Koi_Veterinary_Service_Center_API.repository.InvoiceRepository;
import com.fpt.Koi_Veterinary_Service_Center_API.service.IFeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class FeedbackServiceImpl implements IFeedbackService {

    @Autowired
    private FeedbackRepository feedbackRepository;
    @Autowired
    private InvoiceRepository invoiceRepository;

    @Override
    public feedbackResponse createFeedback(feedbackRequest feedbackRequest) {
        Invoice invoice = invoiceRepository.findByInvoiceID(feedbackRequest.getInvoiceId()).orElseThrow(()-> new AppException("Invoice not found"));
        Feedback feedback = new Feedback();
        feedback.setComment(feedbackRequest.getComment());
        feedback.setFeedbackDateTime(LocalDateTime.now());
        feedback.setRating(feedbackRequest.getRating());
        feedback.setInvoice(invoice);
        Feedback savedFeedback = feedbackRepository.save(feedback);

        feedbackResponse response = new feedbackResponse();
        response.setFeedbackId(savedFeedback.getFeedbackId());
        response.setComment(savedFeedback.getComment());
        response.setRating(savedFeedback.getRating());
        response.setFeedbackDateTime(savedFeedback.getFeedbackDateTime());
        response.setInvoiceId(savedFeedback.getInvoice().getInvoiceID());
        return response;
    }

    @Override
    public List<feedbackResponse> getAllFeedback() {
        List<feedbackResponse> responses = new ArrayList<>();
        List<Feedback> feedbacks = feedbackRepository.findAll();
        for (Feedback feedback : feedbacks){
            feedbackResponse response = new feedbackResponse();
            response.setFeedbackId(feedback.getFeedbackId());
            response.setComment(feedback.getComment());
            response.setRating(feedback.getRating());
            response.setFeedbackDateTime(feedback.getFeedbackDateTime());
            response.setInvoiceId(feedback.getInvoice().getInvoiceID());
            responses.add(response);
        }
        return responses;
    }
}
