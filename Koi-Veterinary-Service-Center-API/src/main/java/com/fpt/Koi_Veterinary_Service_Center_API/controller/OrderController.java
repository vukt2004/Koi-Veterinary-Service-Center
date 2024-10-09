package com.fpt.Koi_Veterinary_Service_Center_API.controller;

import com.fpt.Koi_Veterinary_Service_Center_API.dto.request.createOrderRequest;
import com.fpt.Koi_Veterinary_Service_Center_API.dto.response.orderResponse;
import com.fpt.Koi_Veterinary_Service_Center_API.entity.enums.OrderStatus;
import com.fpt.Koi_Veterinary_Service_Center_API.service.IOrderService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class OrderController {
    @Autowired
    private IOrderService orderService;
    @PostMapping("/orders/add")
    public ResponseEntity<?> addOrder(@Valid @RequestBody createOrderRequest createOrderRequest) {
        orderResponse response = orderService.addOrder(createOrderRequest);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/orders")
    public ResponseEntity<?> getAllOrder() {
        List<orderResponse> responses = orderService.getAllOrder();
        return new ResponseEntity<>(responses, HttpStatus.OK);
    }

//    @GetMapping("/orders/{orderId}")
//    public ResponseEntity<?> getOrderByOrderID(@PathVariable("orderId") String orderId) {
//        orderResponse response = orderService.getOrderByOrderID(orderId);
//        return new ResponseEntity<>(response, HttpStatus.OK);
//    }

    @PutMapping("/orders/{orderId}/status")
    public ResponseEntity<?> updateOrderStatus(@PathVariable("orderId") String orderId, @RequestBody OrderStatus status) {
        orderResponse response = orderService.updateOrderStatus(orderId, status);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PutMapping("/orders/{orderId}/description")
    public ResponseEntity<?> addOrderDescription(@PathVariable("orderId") String orderId, String description) {
        orderResponse response = orderService.addOrderDescription(orderId, description);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

//    @DeleteMapping("/orders/{orderId}")
//    public ResponseEntity<?> deleteOrder(@PathVariable("orderId") String orderId) {
//        orderService.deleteOrder(orderId);
//        return new ResponseEntity<>("Deleted", HttpStatus.OK);
//    }
}
