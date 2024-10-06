package com.koi.koi.service.impl;

import com.koi.koi.dto.request.orderRequest;
import com.koi.koi.dto.response.orderResponse;
import com.koi.koi.entity.Order;
import com.koi.koi.entity.User;
import com.koi.koi.entity.Veterinarian;
import com.koi.koi.exception.AppException;
import com.koi.koi.repository.OrderRepository;
import com.koi.koi.repository.UserRepository;
import com.koi.koi.repository.VeterinarianRepository;
import com.koi.koi.service.IOrderService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class OrderServiceImpl implements IOrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private VeterinarianRepository veterinarianRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public orderResponse createOrder(orderRequest request) {
        orderResponse response = new orderResponse();
        Order order = new Order();
        order.setOrderID(request.getOrderID());
        order.setOrderDate(request.getOrderDate());
        order.setSlot(request.getSlot());
        order.setAddress(request.getAddress());
        order.setDescription(request.getDescription());
        order.setStatus(request.getStatus());
        order.setTravelExpense(request.getTravelExpense());
        Veterinarian veterinarian = veterinarianRepository.findByVeterinarianID(request.getVeterinarian().getVeterinarianID())
                        .orElseThrow(() -> new AppException("VeterinarianID not found"));
        order.setVeterinarian(veterinarian);

        User user = userRepository.findByUserID(request.getUser().getUserID())
                        .orElseThrow(() -> new AppException("User not found"));
        order.setUser(user);

        Order savedOrder = orderRepository.save(order);
        response.setOrderID(savedOrder.getOrderID());
        response.setOrderDate(savedOrder.getOrderDate());
        response.setSlot(savedOrder.getSlot());
        response.setAddress(savedOrder.getAddress());
        response.setDescription(savedOrder.getDescription());
        response.setDescription(savedOrder.getStatus());
        response.setStatus(savedOrder.getStatus());
        response.setTravelExpense(savedOrder.getTravelExpense());
        response.setVeterinarian(savedOrder.getVeterinarian());
        response.setUser(savedOrder.getUser());

        return response;
    }

    @Override
    public orderResponse updateOrder(orderRequest request) {
        orderResponse response = new orderResponse();
        Order order = orderRepository.findById(request.getOrderID())
                        .orElseThrow(() -> new AppException("OrderID not found"));
        order.setOrderID(request.getOrderID());
        order.setOrderDate(request.getOrderDate());
        order.setSlot(request.getSlot());
        order.setAddress(request.getAddress());
        order.setDescription(request.getDescription());
        order.setStatus(request.getStatus());
        order.setTravelExpense(request.getTravelExpense());
        Veterinarian veterinarian = veterinarianRepository.findByVeterinarianID(request.getVeterinarian().getVeterinarianID())
                .orElseThrow(() -> new AppException("VeterinarianID not found"));
        order.setVeterinarian(veterinarian);

        User user = userRepository.findByUserID(request.getUser().getUserID())
                .orElseThrow(() -> new AppException("User not found"));
        order.setUser(user);

        Order savedOrder = orderRepository.save(order);
        response.setOrderID(savedOrder.getOrderID());
        response.setOrderDate(savedOrder.getOrderDate());
        response.setSlot(savedOrder.getSlot());
        response.setAddress(savedOrder.getAddress());
        response.setDescription(savedOrder.getDescription());
        response.setDescription(savedOrder.getStatus());
        response.setStatus(savedOrder.getStatus());
        response.setTravelExpense(savedOrder.getTravelExpense());
        response.setVeterinarian(savedOrder.getVeterinarian());
        response.setUser(savedOrder.getUser());

        return response;
    }

    @Override
    @Transactional
    public void deleteOrder(String orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new AppException("Order not found"));
        orderRepository.delete(order);
    }

    @Override
    public orderResponse getOrderByOrderId(String orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new AppException("OrderID not found"));
        orderResponse response = new orderResponse();
        response.setOrderID(order.getOrderID());
        response.setOrderDate(order.getOrderDate());
        response.setSlot(order.getSlot());
        response.setAddress(order.getAddress());
        response.setDescription(order.getDescription());
        response.setDescription(order.getStatus());
        response.setStatus(order.getStatus());
        response.setTravelExpense(order.getTravelExpense());
        response.setVeterinarian(order.getVeterinarian());
        response.setUser(order.getUser());
        return response;
    }

    @Override
    public List<orderResponse> getAllOrders() {
        List<Order> orders = orderRepository.findAll();
        List<orderResponse> orderResponses = new ArrayList<>();
        for (Order order : orders) {
            orderResponse response = new orderResponse();
            response.setOrderID(order.getOrderID());
            response.setOrderDate(order.getOrderDate());
            response.setSlot(order.getSlot());
            response.setAddress(order.getAddress());
            response.setDescription(order.getDescription());
            response.setDescription(order.getStatus());
            response.setStatus(order.getStatus());
            response.setTravelExpense(order.getTravelExpense());
            response.setVeterinarian(order.getVeterinarian());
            response.setUser(order.getUser());
            orderResponses.add(response);
        }
        return  orderResponses;
    }
}
