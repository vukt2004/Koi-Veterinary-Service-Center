package com.fpt.Koi_Veterinary_Service_Center_API.controller;


import com.fpt.Koi_Veterinary_Service_Center_API.dto.response.invoiceResponse;
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

    @PostMapping("/payment/{orderId}")
    public ResponseEntity<?> TestPayment(@PathVariable("orderId") String orderId) {
        return new ResponseEntity<>(ivnpayService.payment(orderId), HttpStatus.OK);
    }

    @GetMapping("/payment-success")
    public ResponseEntity<?> paymentSuccess(@RequestParam("vnp_OrderInfo") String orderId, @RequestParam("vnp_Amount") String Total, @RequestParam("vnp_ResponseCode") String responseCode) {
        invoiceResponse response = ivnpayService.paymentSuccess(responseCode, Total, orderId);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

}
