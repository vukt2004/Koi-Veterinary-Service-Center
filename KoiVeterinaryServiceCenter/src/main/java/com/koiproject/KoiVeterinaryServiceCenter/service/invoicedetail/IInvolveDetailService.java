package com.koiproject.KoiVeterinaryServiceCenter.service.invoicedetail;

import com.koiproject.KoiVeterinaryServiceCenter.entity.InvoiceDetail;

import java.util.List;

public interface IInvolveDetailService {

    public List<InvoiceDetail> findAll();

    public InvoiceDetail findById(Long id);

    public InvoiceDetail save(InvoiceDetail invoiceDetail);

    public void delete(Long id);
}
