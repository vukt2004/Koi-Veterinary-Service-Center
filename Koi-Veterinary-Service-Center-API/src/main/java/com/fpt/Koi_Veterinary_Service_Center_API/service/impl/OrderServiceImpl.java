package com.fpt.Koi_Veterinary_Service_Center_API.service.impl;

import com.fpt.Koi_Veterinary_Service_Center_API.dto.request.createOrderRequest;

import com.fpt.Koi_Veterinary_Service_Center_API.dto.response.orderResponse;
import com.fpt.Koi_Veterinary_Service_Center_API.entity.*;
import com.fpt.Koi_Veterinary_Service_Center_API.entity.enums.OrderStatus;
import com.fpt.Koi_Veterinary_Service_Center_API.exception.AppException;
import com.fpt.Koi_Veterinary_Service_Center_API.repository.*;
import com.fpt.Koi_Veterinary_Service_Center_API.service.IOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class OrderServiceImpl implements IOrderService {

    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private VeterinarianRepository veterinarianRepository;
    @Autowired
    private OrderDetailRepository orderDetailRepository;
    @Autowired
    private SlotRepository slotRepository;
    @Autowired
    private TravelExpenseRepository travelExpenseRepository;
    @Autowired
    private ServiceRepository serviceRepository;

    @Override
    public orderResponse addOrder(createOrderRequest createOrderRequest) {

        Veterinarian veterinarian = veterinarianRepository.findByVeterinarianID(createOrderRequest.getVeterinaID()).orElseThrow(()-> new AppException("Veterinarian not found"));
        User user = userRepository.findByUserID(createOrderRequest.getUserID()).orElseThrow(()-> new AppException("User not found"));
        Slot slot = slotRepository.findBySlot(createOrderRequest.getSlot()).orElseThrow(()-> new AppException("Slot not found"));
        com.fpt.Koi_Veterinary_Service_Center_API.entity.Service service = serviceRepository.findByServiceID(createOrderRequest.getServiceId()).orElseThrow(()-> new AppException("Service not found"));

        //check if address in request is valid
        List<TravelExpense> travelExpenses = travelExpenseRepository.findAll();
        TravelExpense travelExpense = new TravelExpense();
        boolean t = false;
        for(TravelExpense singleTravelExpense : travelExpenses){
            if(createOrderRequest.getAddress().contains(singleTravelExpense.getEndLocation())){
                travelExpense = singleTravelExpense;
                t = true;
                break;
            }
        }
        if(!t){
            throw new AppException("Location not registered");
        }

        Order order = new Order();
        order.setVeterinarian(veterinarian);
        order.setUser(user);
        order.setStatus(createOrderRequest.getStatus());
        order.setOrderDate(createOrderRequest.getDay());
        order.setSlot(slot);
        order.setAddress(createOrderRequest.getAddress());
        order.setTravelExpense(travelExpense);
        Order savedOrder = orderRepository.save(order);

        OrderDetail orderDetail = new OrderDetail();
        orderDetail.setOrder(order);
        orderDetail.setQuantity(createOrderRequest.getQuantity());
        orderDetail.setService(service);
        orderDetailRepository.save(orderDetail);

        orderResponse response = new orderResponse();
        response.setAddress(savedOrder.getAddress());
        response.setSlot(savedOrder.getSlot().getSlot());
        response.setOrderId(savedOrder.getOrderID());
        response.setStatus(savedOrder.getStatus());
        response.setOrderDate(savedOrder.getOrderDate());
        response.setVeterinaId(savedOrder.getVeterinarian().getVeterinarianID());
        response.setTravelExpenseId(savedOrder.getTravelExpense().getExpenseID());
        return response;
    }

    @Override
    public List<orderResponse> getAllOrder() {
        List<Order> orders = orderRepository.findAll();
        List<orderResponse> orderResponses = new ArrayList<>();
        for (Order order : orders) {
            orderResponse response = new orderResponse();
            response.setAddress(order.getAddress());
            response.setSlot(order.getSlot().getSlot());
            response.setOrderId(order.getOrderID());
            response.setStatus(order.getStatus());
            response.setOrderDate(order.getOrderDate());
            response.setVeterinaId(order.getVeterinarian().getVeterinarianID());
            response.setTravelExpenseId(order.getTravelExpense().getExpenseID());
            response.setDescription(order.getDescription());
            orderResponses.add(response);
        }
        return orderResponses;
    }

//    @Override
//    public orderResponse getOrderByOrderID(String orderId) {
//        return null;
//    }

    @Override
    public orderResponse updateOrderStatus(String orderId, OrderStatus status) {
        Order order = orderRepository.findByOrderID(orderId).orElseThrow(()-> new AppException("Order not found"));
        order.setStatus(status);
        Order savedOrder = orderRepository.save(order);
        orderResponse response = new orderResponse();
        response.setAddress(savedOrder.getAddress());
        response.setSlot(savedOrder.getSlot().getSlot());
        response.setOrderId(savedOrder.getOrderID());
        response.setStatus(savedOrder.getStatus());
        response.setOrderDate(savedOrder.getOrderDate());
        response.setVeterinaId(savedOrder.getVeterinarian().getVeterinarianID());
        response.setTravelExpenseId(savedOrder.getTravelExpense().getExpenseID());
        response.setDescription(savedOrder.getDescription());
        return response;
    }

    @Override
    public orderResponse addOrderDescription(String orderId, String description) {
        Order order = orderRepository.findByOrderID(orderId).orElseThrow(()-> new AppException("Order not found"));
        order.setDescription(description);
        Order savedOrder = orderRepository.save(order);
        orderResponse response = new orderResponse();
        response.setAddress(savedOrder.getAddress());
        response.setSlot(savedOrder.getSlot().getSlot());
        response.setOrderId(savedOrder.getOrderID());
        response.setStatus(savedOrder.getStatus());
        response.setOrderDate(savedOrder.getOrderDate());
        response.setVeterinaId(savedOrder.getVeterinarian().getVeterinarianID());
        response.setTravelExpenseId(savedOrder.getTravelExpense().getExpenseID());
        response.setDescription(savedOrder.getDescription());
        return response;
    }

//    @Override
//    public void deleteOrder(String orderId) {
//
//    }
}
