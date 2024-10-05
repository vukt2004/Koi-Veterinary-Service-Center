package com.koi.koi.service.impl;

import com.koi.koi.dto.request.orderRequest;
import com.koi.koi.dto.response.orderResponse;
import com.koi.koi.service.IOrderService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class OrderServiceImpl implements IOrderService {

    @Autowired

    @Override
    public orderResponse createOrder(orderRequest request) {
        return null;
    }

    @Override
    public orderResponse updateOrder(String orderId, orderRequest request) {
        return null;
    }

    @Override
    public void deleteOrder(String orderId) {

    }

    @Override
    public orderResponse getOrderByOrderId(String orderId) {
        return null;
    }

    @Override
    public List<orderResponse> getAllOrders() {
        return List.of();
    }
}
