package com.fpt.Koi_Veterinary_Service_Center_API.service;

import org.springframework.http.ResponseEntity;

public interface IVNPAYService {
    ResponseEntity<String> payment(int price);

    String paymentSuccess(String responseCode);
}
