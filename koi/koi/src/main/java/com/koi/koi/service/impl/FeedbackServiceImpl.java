package com.koi.koi.service.impl;

import com.koi.koi.dto.request.feedbackRequest;
import com.koi.koi.dto.response.feedbackResponse;
import com.koi.koi.entity.Feedback;
import com.koi.koi.entity.Invoice;
import com.koi.koi.exception.AppException;
import com.koi.koi.repository.FeedbackRepository;
import com.koi.koi.repository.InvoiceRepository;
import com.koi.koi.service.IFeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class FeedbackServiceImpl implements IFeedbackService {

    @Autowired
    private FeedbackRepository feedbackRepository;

    @Autowired
    private InvoiceRepository invoiceRepository;

    @Override
    public feedbackResponse save(feedbackRequest request) {
        feedbackResponse response = new feedbackResponse();
        Feedback feedback = new Feedback();

        feedback.setFeedbackID(request.getFeedbackID());
        feedback.setComment(request.getComment());
        feedback.setRating(request.getRating());
        feedback.setFeedbackDateTime(request.getFeedbackDateTime());

        Invoice invoice = invoiceRepository.findById(request.getInvoiceID())
                .orElseThrow(() -> new AppException("invoice not found"));
        feedback.setInvoice(invoice);

        Feedback savedFeedback = feedbackRepository.save(feedback);
        response.setFeedbackID(savedFeedback.getFeedbackID());
        response.setComment(savedFeedback.getComment());
        response.setRating(savedFeedback.getRating());
        response.setFeedbackDateTime(savedFeedback.getFeedbackDateTime());
        response.setInvoice(savedFeedback.getInvoice());

        return response;
    }

    @Override
    public List<feedbackResponse> findAllFeedbacksByInvoiceID(String invoiceID) {
        List<Feedback> feedbacks = feedbackRepository.findAllByInvoice_InvoiceID(invoiceID);
        List<feedbackResponse> feedbackResponses = new ArrayList<>();
        for (Feedback feedback : feedbacks) {
            feedbackResponse response = new feedbackResponse();
            response.setFeedbackID(feedback.getFeedbackID());
            response.setComment(feedback.getComment());
            response.setRating(feedback.getRating());
            response.setFeedbackDateTime(feedback.getFeedbackDateTime());
            response.setInvoice(feedback.getInvoice());
            feedbackResponses.add(response);
        }
        return feedbackResponses;
    }
}
