package com.fpt.Koi_Veterinary_Service_Center_API.controller;


import com.fpt.Koi_Veterinary_Service_Center_API.service.IVNPAYService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class VNPAYController {
    @Autowired
    private IVNPAYService ivnpayService;

    @PostMapping("/payment")
    public ResponseEntity<?> TestPayment() {
        return new ResponseEntity<>(ivnpayService.payment(50000000), HttpStatus.OK);
    }

    @GetMapping("/payment-success")
    public ResponseEntity<?> paymentSuccess(@RequestParam("vnp_ResponseCode") String responseCode) {
        String response = ivnpayService.paymentSuccess(responseCode);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

}
