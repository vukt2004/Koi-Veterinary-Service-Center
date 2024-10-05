package com.koi.koi.service;

import com.koi.koi.dto.request.feedbackRequest;
import com.koi.koi.dto.response.feedbackResponse;

import java.util.List;

public interface IFeedbackService {

    feedbackResponse save(feedbackRequest request);

    List<feedbackResponse> findAllFeedbacksByInvoiceID(String invoiceID);
}
