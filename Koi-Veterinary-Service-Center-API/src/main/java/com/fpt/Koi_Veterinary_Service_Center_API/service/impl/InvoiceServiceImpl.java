package com.fpt.Koi_Veterinary_Service_Center_API.service.impl;

import com.fpt.Koi_Veterinary_Service_Center_API.dto.request.invoiceRequest;
import com.fpt.Koi_Veterinary_Service_Center_API.dto.response.invoiceResponse;
import com.fpt.Koi_Veterinary_Service_Center_API.entity.Invoice;
import com.fpt.Koi_Veterinary_Service_Center_API.entity.Order;
import com.fpt.Koi_Veterinary_Service_Center_API.entity.OrderDetail;
import com.fpt.Koi_Veterinary_Service_Center_API.exception.AppException;
import com.fpt.Koi_Veterinary_Service_Center_API.repository.InvoiceRepository;
import com.fpt.Koi_Veterinary_Service_Center_API.repository.OrderRepository;
import com.fpt.Koi_Veterinary_Service_Center_API.service.IInvoiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class InvoiceServiceImpl implements IInvoiceService {

    @Autowired
    private InvoiceRepository invoiceRepository;
    @Autowired
    private OrderRepository orderRepository;

    @Override
    public invoiceResponse createInvoice(invoiceRequest invoiceRequest) {
        Order order = orderRepository.findByOrderID(invoiceRequest.getOrderId()).orElseThrow(()-> new AppException("Order not found"));
        int total = order.getTravelExpense().getFee();
        List<OrderDetail> orderDetails = order.getOrderDetails();
        for(OrderDetail orderDetail : orderDetails){
            total += orderDetail.getService().getPrice() * orderDetail.getQuantity();
        }

        Invoice invoice = new Invoice();
        invoice.setInvDate(LocalDateTime.now());
        invoice.setTotal(total);
        invoice.setOrder(order);
        Invoice savedInvoice = invoiceRepository.save(invoice);

        invoiceResponse response = new invoiceResponse();
        response.setInvDate(savedInvoice.getInvDate());
        response.setOrderId(savedInvoice.getOrder().getOrderID());
        response.setTotal(savedInvoice.getTotal());
        response.setInvoiceId(savedInvoice.getInvoiceID());
        return response;
    }

    @Override
    public List<invoiceResponse> getAllInvoice() {

        List<Invoice> invoices = invoiceRepository.findAll();
        List<invoiceResponse> responses = new ArrayList<>();
        for (Invoice invoice : invoices){
            invoiceResponse response = new invoiceResponse();
            response.setInvoiceId(invoice.getInvoiceID());
            response.setInvDate(invoice.getInvDate());
            response.setOrderId(invoice.getOrder().getOrderID());
            response.setTotal(invoice.getTotal());
            responses.add(response);
        }
        return responses;
    }
}
