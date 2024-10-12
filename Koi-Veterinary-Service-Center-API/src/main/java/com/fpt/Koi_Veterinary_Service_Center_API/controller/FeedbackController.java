package com.fpt.Koi_Veterinary_Service_Center_API.controller;

import com.fpt.Koi_Veterinary_Service_Center_API.dto.request.feedbackRequest;
import com.fpt.Koi_Veterinary_Service_Center_API.dto.request.invoiceRequest;
import com.fpt.Koi_Veterinary_Service_Center_API.dto.response.feedbackResponse;
import com.fpt.Koi_Veterinary_Service_Center_API.dto.response.invoiceResponse;
import com.fpt.Koi_Veterinary_Service_Center_API.service.IFeedbackService;
import com.fpt.Koi_Veterinary_Service_Center_API.service.IInvoiceService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class FeedbackController {
    @Autowired
    private IFeedbackService feedbackService;

    @PostMapping("/feedbacks")
    public ResponseEntity<?> createFeedback(@Valid @RequestBody feedbackRequest feedbackRequest) {
        feedbackResponse response = feedbackService.createFeedback(feedbackRequest);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/feedbacks")
    public ResponseEntity<?> getAllFeedback() {
        List<feedbackResponse> responses = feedbackService.getAllFeedback();
        return new ResponseEntity<>(responses, HttpStatus.OK);
    }
}