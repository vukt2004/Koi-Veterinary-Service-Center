package com.fpt.Koi_Veterinary_Service_Center_API.service;

import com.fpt.Koi_Veterinary_Service_Center_API.dto.response.invoiceResponse;
import org.springframework.http.ResponseEntity;

public interface IVNPAYService {
    ResponseEntity<String> payment(String orderId);

    invoiceResponse paymentSuccess(String responseCode, String Total, String orderId);
}
