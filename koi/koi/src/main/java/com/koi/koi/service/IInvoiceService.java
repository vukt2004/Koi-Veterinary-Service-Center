package com.koi.koi.service;

import com.koi.koi.dto.request.invoiceRequest;
import com.koi.koi.dto.response.invoiceResponse;

import java.util.List;

public interface IInvoiceService {
    invoiceResponse createInvoice(invoiceRequest request);
    invoiceResponse updateInvoice(String invoiceId, invoiceRequest request);
    void deleteInvoice(String invoiceId);
    invoiceResponse getInvoiceById(String invoiceId);
    List<invoiceResponse> getAllInvoices();
}
