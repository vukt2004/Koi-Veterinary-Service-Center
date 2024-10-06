package com.koi.koi.service;

import com.koi.koi.dto.request.orderRequest;
import com.koi.koi.dto.response.orderResponse;

import java.util.List;

public interface IOrderService {
    orderResponse createOrder(orderRequest request);
    orderResponse updateOrder(orderRequest request);
    void deleteOrder(String orderId);
    orderResponse getOrderByOrderId(String orderId);
    List<orderResponse> getAllOrders();
}
