package com.fpt.Koi_Veterinary_Service_Center_API.service;

import com.fpt.Koi_Veterinary_Service_Center_API.dto.request.createOrderRequest;
import com.fpt.Koi_Veterinary_Service_Center_API.dto.response.orderResponse;
import com.fpt.Koi_Veterinary_Service_Center_API.entity.enums.OrderStatus;
import jakarta.validation.Valid;

import java.util.List;

public interface IOrderService {

    orderResponse addOrder(createOrderRequest createOrderRequest);

    List<orderResponse> getAllOrder();

//    orderResponse getOrderByOrderID(String orderId);

    orderResponse updateOrderStatus(String orderId, OrderStatus status);

    orderResponse addOrderDescription(String orderId, String description);

//    void deleteOrder(String orderId);
}
