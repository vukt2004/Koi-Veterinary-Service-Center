package com.koi.koi.service;

import com.koi.koi.dto.request.invoicedetailRequest;
import com.koi.koi.dto.response.invoicedetailResponse;
import com.koi.koi.entity.InvoiceDetailsId;

import java.util.List;

public interface IInvoiceDetailService {
    invoicedetailResponse createInvoiceDetail(invoicedetailRequest request);
    invoicedetailResponse updateInvoiceDetail(InvoiceDetailsId invoiceDetailId, invoicedetailRequest request);
    void deleteInvoiceDetail(InvoiceDetailsId invoiceDetailId);
    invoicedetailResponse getInvoiceDetailById(InvoiceDetailsId invoiceDetailId);
    List<invoicedetailResponse> getAllInvoiceDetails();
}
