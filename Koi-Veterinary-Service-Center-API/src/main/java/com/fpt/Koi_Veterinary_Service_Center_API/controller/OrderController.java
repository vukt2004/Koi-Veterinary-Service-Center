package com.fpt.Koi_Veterinary_Service_Center_API.controller;

import com.fpt.Koi_Veterinary_Service_Center_API.dto.request.createOrderRequest;
import com.fpt.Koi_Veterinary_Service_Center_API.dto.request.orderDescriptionRequest;
import com.fpt.Koi_Veterinary_Service_Center_API.dto.request.orderServiceReqest;
import com.fpt.Koi_Veterinary_Service_Center_API.dto.response.orderResponse;
import com.fpt.Koi_Veterinary_Service_Center_API.entity.OrderDetail;
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
    @PostMapping("/orders")
    public ResponseEntity<?> createOrder(@Valid @RequestBody createOrderRequest createOrderRequest) {
        orderResponse response = orderService.addOrder(createOrderRequest);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/orders")
    public ResponseEntity<?> getAllOrder() {
        List<orderResponse> responses = orderService.getAllOrder();
        return new ResponseEntity<>(responses, HttpStatus.OK);
    }

    @GetMapping("/orders/{orderId}")
    public ResponseEntity<?> getOrderByOrderID(@PathVariable("orderId") String orderId) {
        orderResponse response = orderService.getOrderByOrderID(orderId);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PutMapping("/orders/{orderId}/status")
    public ResponseEntity<?> updateOrderStatus(@PathVariable("orderId") String orderId, @RequestBody OrderStatus status) {
        orderResponse response = orderService.updateOrderStatus(orderId, status);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PutMapping("/orders/{orderId}/description")
    public ResponseEntity<?> addOrderDescription(@PathVariable("orderId") String orderId, @Valid @RequestBody orderDescriptionRequest description) {
        orderResponse response = orderService.addOrderDescription(orderId, description);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/orders/{orderId}/services")
    public ResponseEntity<?> addServiceToOrder(@PathVariable("orderId") String orderId, @Valid @RequestBody orderServiceReqest orderServiceReq) {
        orderResponse response = orderService.addServiceToOrder(orderId, orderServiceReq);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping("/orders/{orderId}/services/{serviceID}")
    public ResponseEntity<?> removeServiceFromOrder(@PathVariable("orderId") String orderId, @PathVariable("serviceID") String serviceID) {
        orderResponse response = orderService.removeServiceFromOrder(orderId,serviceID);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
