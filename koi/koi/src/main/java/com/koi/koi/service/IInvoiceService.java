package com.koi.koi.service;

import com.koi.koi.dto.request.invoiceRequest;
import com.koi.koi.dto.response.invoiceResponse;

import java.util.List;

public interface IInvoiceService {
    invoiceResponse createInvoice(invoiceRequest request);
    invoiceResponse updateInvoice(invoiceRequest request);
    void deleteInvoice(String invoiceID);
    invoiceResponse getInvoiceById(String invoiceID);
    List<invoiceResponse> getAllInvoices();
}
