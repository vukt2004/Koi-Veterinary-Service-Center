package com.koi.koi.service.impl;

import com.koi.koi.dto.request.invoicedetailRequest;
import com.koi.koi.dto.response.invoicedetailResponse;
import com.koi.koi.entity.InvoiceDetail;
import com.koi.koi.entity.InvoiceDetailsId;
import com.koi.koi.entity.Services;
import com.koi.koi.exception.AppException;
import com.koi.koi.repository.InvoiceDetailRepository;
import com.koi.koi.repository.OrderRepository;
import com.koi.koi.repository.ServiceRepository;
import com.koi.koi.service.IInvoiceDetailService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class InvoiceDetailServiceImpl implements IInvoiceDetailService {
    @Autowired
    private InvoiceDetailRepository invoiceDetailRepository;

    @Autowired
    private ServiceRepository serviceRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Override
    public invoicedetailResponse createInvoiceDetail(invoicedetailRequest request) {
        invoicedetailResponse response = new invoicedetailResponse();
        InvoiceDetail invoiceDetail = new InvoiceDetail();
        Services service = serviceRepository.findByServiceID(request.getService().getServiceID())
                        .orElseThrow(() -> new AppException("Service not found"));
        invoiceDetail.setService(service);
        invoiceDetail.setQuantity(request.getQuantity());
        InvoiceDetail savedInvoiceDetail = invoiceDetailRepository.save(invoiceDetail);

        response.setService(savedInvoiceDetail.getService());
        response.setOrder(savedInvoiceDetail.getOrder());
        response.setQuantity(savedInvoiceDetail.getQuantity());
        return response;
    }

    @Override
    public invoicedetailResponse updateInvoiceDetail(InvoiceDetailsId invoiceDetailId, invoicedetailRequest request) {
        invoicedetailResponse response = new invoicedetailResponse();
        InvoiceDetail invoiceDetail = invoiceDetailRepository.findById(invoiceDetailId)
                .orElseThrow(() -> new AppException("InvoiceDetailsId not found"));
        Services service = serviceRepository.findByServiceID(request.getService().getServiceID())
                .orElseThrow(() -> new AppException("Service not found"));
        invoiceDetail.setService(service);
        invoiceDetail.setQuantity(request.getQuantity());
        InvoiceDetail savedInvoiceDetail = invoiceDetailRepository.save(invoiceDetail);

        response.setService(savedInvoiceDetail.getService());
        response.setOrder(savedInvoiceDetail.getOrder());
        response.setQuantity(savedInvoiceDetail.getQuantity());
        return response;
    }

    @Override
    @Transactional
    public void deleteInvoiceDetail(InvoiceDetailsId invoiceDetailId) {
        InvoiceDetail invoiceDetail = invoiceDetailRepository.findById(invoiceDetailId)
                .orElseThrow(() -> new AppException("InvoiceDetailsId not found"));
        invoiceDetailRepository.delete(invoiceDetail);
    }

    @Override
    public invoicedetailResponse getInvoiceDetailById(InvoiceDetailsId invoiceDetailId) {
        InvoiceDetail invoiceDetail = invoiceDetailRepository.findById(invoiceDetailId)
                .orElseThrow(() -> new AppException("InvoiceDetailsId not found"));
        invoicedetailResponse response = new invoicedetailResponse();
        response.setService(invoiceDetail.getService());
        response.setOrder(invoiceDetail.getOrder());
        response.setQuantity(invoiceDetail.getQuantity());
        return response;
    }

    @Override
    public List<invoicedetailResponse> getAllInvoiceDetails() {
        List<InvoiceDetail> invoiceDetails = invoiceDetailRepository.findAll();
        List<invoicedetailResponse> responses = new ArrayList<>();
        for (InvoiceDetail invoiceDetail: invoiceDetails) {
            invoicedetailResponse response = new invoicedetailResponse();
            response.setService(invoiceDetail.getService());
            response.setOrder(invoiceDetail.getOrder());
            response.setQuantity(invoiceDetail.getQuantity());
            responses.add(response);
        }
        return responses;
    }
}
