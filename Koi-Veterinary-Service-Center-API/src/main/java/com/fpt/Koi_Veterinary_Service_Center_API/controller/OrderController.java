package com.fpt.Koi_Veterinary_Service_Center_API.controller;

import com.fpt.Koi_Veterinary_Service_Center_API.dto.response.userResponse;
import com.fpt.Koi_Veterinary_Service_Center_API.service.IOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class OrderController {
    @Autowired
    private IOrderService iOrderService;

//    @GetMapping("/Order/")
//    @PreAuthorize("hasAuthority('ADMIN')")
//    public ResponseEntity<?> testPayment(@PathVariable("id") String id) {
//        userResponse user = iOrderService.testPayment(id);
//        return new ResponseEntity<>(user, HttpStatus.OK);
//    }

}
