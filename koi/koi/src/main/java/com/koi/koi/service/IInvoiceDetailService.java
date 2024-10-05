package com.koi.koi.service;

import com.koi.koi.dto.request.invoicedetailRequest;
import com.koi.koi.dto.response.invoicedetailResponse;

import java.util.List;

public interface IInvoiceDetailService {
    invoicedetailResponse createInvoiceDetail(invoicedetailRequest request);
    invoicedetailResponse updateInvoiceDetail(String invoiceDetailId, invoicedetailRequest request);
    void deleteInvoiceDetail(String invoiceDetailId);
    invoicedetailResponse getInvoiceDetailById(String invoiceDetailId);
    List<invoicedetailResponse> getAllInvoiceDetails();
}
