package com.koi.koi.service.impl;

import com.koi.koi.dto.request.invoiceRequest;
import com.koi.koi.dto.response.invoiceResponse;
import com.koi.koi.entity.Invoice;
import com.koi.koi.entity.Order;
import com.koi.koi.exception.AppException;
import com.koi.koi.repository.InvoiceRepository;
import com.koi.koi.repository.OrderRepository;
import com.koi.koi.service.IInvoiceService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class InvoiceServiceImpl implements IInvoiceService {

    @Autowired
    private InvoiceRepository invoiceRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Override
    public invoiceResponse createInvoice(invoiceRequest request) {
        invoiceResponse response = new invoiceResponse();
        Invoice invoice = new Invoice();
        invoice.setInvoiceID(request.getInvoiceID());
        invoice.setTotal(request.getTotal());
        invoice.setDate(request.getDate());
        Order order = orderRepository.findById(request.getOrder().getOrderID())
                        .orElseThrow(() -> new AppException("OrderID not found"));
        invoice.setOrder(order);
        Invoice savedInvoice = invoiceRepository.save(invoice);

        response.setInvoiceID(savedInvoice.getInvoiceID());
        response.setTotal(savedInvoice.getTotal());
        response.setDate(savedInvoice.getDate());
        response.setOrder(savedInvoice.getOrder());

        return response;
    }

    @Override
    public invoiceResponse updateInvoice(invoiceRequest request) {
        invoiceResponse response = new invoiceResponse();
        Invoice invoice = invoiceRepository.findById(request.getInvoiceID())
                        .orElseThrow(() -> new AppException("InvoiceID not found"));
        invoice.setInvoiceID(request.getInvoiceID());
        invoice.setTotal(request.getTotal());
        invoice.setDate(request.getDate());
        Order order = orderRepository.findById(request.getOrder().getOrderID())
                .orElseThrow(() -> new AppException("OrderID not found"));
        invoice.setOrder(order);
        Invoice savedInvoice = invoiceRepository.save(invoice);

        response.setInvoiceID(savedInvoice.getInvoiceID());
        response.setTotal(savedInvoice.getTotal());
        response.setDate(savedInvoice.getDate());
        response.setOrder(savedInvoice.getOrder());

        return response;
    }

    @Override
    @Transactional
    public void deleteInvoice(String invoiceID) {
        Invoice invoice = invoiceRepository.findById(invoiceID)
                .orElseThrow(() -> new AppException("InvoiceID not found"));
        invoiceRepository.delete(invoice);
    }

    @Override
    public invoiceResponse getInvoiceById(String invoiceID) {
        Invoice invoice = invoiceRepository.findById(invoiceID)
                .orElseThrow(() -> new AppException("InvoiceID not found"));
        invoiceResponse response = new invoiceResponse();
        response.setInvoiceID(invoice.getInvoiceID());
        response.setTotal(invoice.getTotal());
        response.setDate(invoice.getDate());
        response.setOrder(invoice.getOrder());
        return response;
    }

    @Override
    public List<invoiceResponse> getAllInvoices() {
        List<Invoice> invoices = invoiceRepository.findAll();
        List<invoiceResponse> invoiceResponses = new ArrayList<>();

        for (Invoice invoice : invoices) {
            invoiceResponse response = new invoiceResponse();
            response.setInvoiceID(invoice.getInvoiceID());
            response.setTotal(invoice.getTotal());
            response.setDate(invoice.getDate());
            response.setOrder(invoice.getOrder());
            invoiceResponses.add(response);
        }
        return invoiceResponses;
    }
}
